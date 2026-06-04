/**
 * Domain + API types, mirrored from clob-server/api/openapi.yaml.
 *
 * Wire convention: prices and quantities are **decimal strings** ("100.00").
 * A few market-config fields (tickSize, lotSize, fee rates) are **raw integers**
 * at the market's precision — convert with lib/format before display.
 */

export type Side = 'bid' | 'ask'
export type OrderType = 'limit' | 'market' | 'stop' | 'stop_limit' | 'iceberg'
export type TIF = 'GTC' | 'IOC' | 'FOK' | 'GTD' | 'DAY'
export type OrderStatus =
  | 'new'
  | 'rested'
  | 'partial'
  | 'filled'
  | 'canceled'
  | 'rejected'
  | 'expired'
export type MarketState = 'open' | 'halted' | 'pre_open' | 'closed'
export type FeeModel = 'flat' | 'tiered'
export type KeyTier = 'standard' | 'admin' | 'readonly'

// ── Orders ──────────────────────────────────────────────────────────────────

export interface Order {
  orderID: string
  userID: string
  marketID: string
  side: Side
  orderType: OrderType
  price: string
  stopPrice?: string
  origQty: string
  remainQty: string
  filledQty: string
  displayQty?: string
  status: OrderStatus
  tif: TIF
  createdAt: string
  updatedAt: string
}

export interface PlaceOrderRequest {
  marketID: string
  side: Side
  orderType?: OrderType
  price?: string
  stopPrice?: string
  qty: string
  displayQty?: string
  tif?: TIF
  expireAt?: string
  stpMode?: string
}

export interface PlaceOrderResponse {
  orderID: string
  seqNum: number
  status: string
  reason?: string
}

// ── Markets ─────────────────────────────────────────────────────────────────

export interface Market {
  marketID: string
  baseAsset: string
  quoteAsset: string
  pricePrecision: number
  qtyPrecision: number
  tickSize: number // raw BIGINT at pricePrecision
  lotSize: number // raw BIGINT at qtyPrecision
  minOrderQty: number
  maxOrderQty: number
  maxOrderValue: number
  maxDepth: number
  features: number
  stpMode: string
  makerFeeRate: number // raw BIGINT at precision 4; negative = rebate
  takerFeeRate: number
  feeCurrency: string
  feeModel: FeeModel
  state: MarketState
  createdBy: string
}

export interface DepthLevel {
  price: string
  totalQty: string
  displayQty: string
  orderCount: number
}

export interface BookSnapshot {
  bids: DepthLevel[]
  asks: DepthLevel[]
}

export interface Trade {
  tradeID: string
  marketID: string
  makerOrderID: string
  takerOrderID: string
  makerUserID: string
  takerUserID: string
  makerSide: Side
  price: string
  qty: string
  makerFee: string
  takerFee: string
  feeCurrency: string
  createdAt: string
}

export interface MarketStats {
  marketID: string
  state: MarketState
  orderSeq: number
  eventSeq: number
  openOrders: number
  stopOrders: number
  bidLevels: number
  askLevels: number
  nodePoolUsed: number
  nodePoolCapacity: number
  levelPoolUsed: number
  levelPoolCapacity: number
}

// ── Portfolio ───────────────────────────────────────────────────────────────

export interface Position {
  marketID: string
  quantity: string
  avgEntryPrice: string
  realisedPnl: string
  unrealisedPnl: string
  lastPrice: string
}

export interface Portfolio {
  walletAvailable: string
  walletReserved: string
  positions: Position[]
}

// ── Leaderboard ─────────────────────────────────────────────────────────────

export interface LeaderboardEntry {
  rank: number
  userID: string
  email: string
  score: number
}

// ── API keys ────────────────────────────────────────────────────────────────

export interface CreateAPIKeyResponse {
  fullKey: string
  keyPrefix: string
}

export interface APIKey {
  id: string
  keyPrefix: string
  name: string
  scopes: string[]
  tier: KeyTier
  rateLimit: number
  lastUsedAt: string | null
  expiresAt: string | null
  revoked: boolean
  createdAt: string
}

// ── Auth (cookie-JWT; endpoints to be added to the backend) ──────────────────

export interface AuthUser {
  userID: string
  email: string
  isAdmin: boolean
}

export interface Credentials {
  email: string
  password: string
}

// ── WebSocket messages (ws://host/v1/stream) ─────────────────────────────────

export type WsChannel =
  | `depth:${string}`
  | `trades:${string}`
  | `orders:${string}`
  | `portfolio:${string}`
  | 'markets'

/** Outbound client → server frames. */
export type WsOutbound =
  | { type: 'auth'; apiKey: string }
  | { type: 'subscribe'; channel: WsChannel }
  | { type: 'unsubscribe'; channel: WsChannel }
  | ({ type: 'place_order' } & PlaceOrderRequest)
  | { type: 'cancel_order'; orderID: string }

/** Inbound server → client frames (a superset; discriminate on `type`). */
export interface WsInbound {
  type: string
  [k: string]: unknown
}
