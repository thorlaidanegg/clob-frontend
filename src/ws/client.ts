/**
 * Single WebSocket connection to /v1/stream with ref-counted channel
 * subscriptions and auto-reconnect.
 *
 * Server → client frames are expected as { type, channel?, data? }. (The backend
 * WS broadcaster should wrap raw events in this envelope; that's part of the
 * cookie-auth + feed work.) Control frames like auth_ok / subscribed have no data.
 */
import { useSyncExternalStore } from 'react'

export type WsStatus = 'connecting' | 'open' | 'closed'

export interface ServerMessage {
  type: string
  channel?: string
  data?: unknown
}

type MsgListener = (msg: ServerMessage) => void

class WsClient {
  private ws: WebSocket | null = null
  private readonly url: string
  private authFrame: object | null = null
  private readonly channels = new Map<string, number>() // channel → refcount
  private readonly listeners = new Set<MsgListener>()
  private status: WsStatus = 'closed'
  private readonly statusListeners = new Set<() => void>()
  private reconnectDelay = 500
  private running = false

  constructor() {
    const proto = location.protocol === 'https:' ? 'wss' : 'ws'
    this.url = `${proto}://${location.host}/v1/stream`
  }

  /** Optional auth frame sent on every (re)connect. With cookie auth this can stay null. */
  configureAuth(frame: object | null): void {
    this.authFrame = frame
  }

  start(): void {
    if (this.running) return
    this.running = true
    this.connect()
  }

  stop(): void {
    this.running = false
    this.ws?.close()
  }

  // ── status (external store) ──
  getStatus = (): WsStatus => this.status
  subscribeStatus = (cb: () => void): (() => void) => {
    this.statusListeners.add(cb)
    return () => this.statusListeners.delete(cb)
  }
  private setStatus(s: WsStatus): void {
    this.status = s
    this.statusListeners.forEach((l) => l())
  }

  // ── messages ──
  onMessage(cb: MsgListener): () => void {
    this.listeners.add(cb)
    return () => this.listeners.delete(cb)
  }

  send(frame: object): void {
    if (this.ws?.readyState === WebSocket.OPEN) this.ws.send(JSON.stringify(frame))
  }

  /** Ref-counted channel subscription. Returns an unsubscribe fn. */
  subscribe(channel: string): () => void {
    const n = (this.channels.get(channel) ?? 0) + 1
    this.channels.set(channel, n)
    if (n === 1) this.send({ type: 'subscribe', channel })
    return () => {
      const c = (this.channels.get(channel) ?? 1) - 1
      if (c <= 0) {
        this.channels.delete(channel)
        this.send({ type: 'unsubscribe', channel })
      } else {
        this.channels.set(channel, c)
      }
    }
  }

  private connect(): void {
    if (!this.running) return
    this.setStatus('connecting')
    const ws = new WebSocket(this.url)
    this.ws = ws

    ws.onopen = () => {
      this.reconnectDelay = 500
      if (this.authFrame) ws.send(JSON.stringify(this.authFrame))
      for (const ch of this.channels.keys()) ws.send(JSON.stringify({ type: 'subscribe', channel: ch }))
      this.setStatus('open')
    }
    ws.onmessage = (e: MessageEvent) => {
      let msg: ServerMessage
      try {
        msg = JSON.parse(typeof e.data === 'string' ? e.data : '') as ServerMessage
      } catch {
        return
      }
      this.listeners.forEach((l) => l(msg))
    }
    ws.onerror = () => ws.close()
    ws.onclose = () => {
      this.setStatus('closed')
      this.ws = null
      if (this.running) {
        const delay = this.reconnectDelay
        this.reconnectDelay = Math.min(delay * 2, 8000)
        setTimeout(() => this.connect(), delay)
      }
    }
  }
}

export const wsClient = new WsClient()

/** Subscribe a component to the live connection status. */
export function useWsStatus(): WsStatus {
  return useSyncExternalStore(wsClient.subscribeStatus, wsClient.getStatus, () => 'closed' as const)
}
