import { useEffect, useRef } from 'react'
import {
  AreaSeries,
  CandlestickSeries,
  ColorType,
  createChart,
  type IChartApi,
  type ISeriesApi,
  type UTCTimestamp,
} from 'lightweight-charts'
import { toNum } from '@/lib/format'
import type { Trade } from '@/lib/types'

export type ChartKind = 'candle' | 'line'

interface Candle {
  time: UTCTimestamp
  open: number
  high: number
  low: number
  close: number
}

/** Aggregate the trade tape into OHLC candles bucketed by `intervalSec`. The tape
 * is newest-first; we reverse to chronological order. */
function tradesToCandles(trades: Trade[], intervalSec: number): Candle[] {
  const byTime = new Map<number, Candle>()
  for (let i = trades.length - 1; i >= 0; i--) {
    const t = trades[i]
    const ms = new Date(t.createdAt).getTime()
    if (Number.isNaN(ms)) continue
    const bucket = Math.floor(ms / 1000 / intervalSec) * intervalSec
    const price = toNum(t.price)
    const c = byTime.get(bucket)
    if (!c) {
      byTime.set(bucket, { time: bucket as UTCTimestamp, open: price, high: price, low: price, close: price })
    } else {
      c.high = Math.max(c.high, price)
      c.low = Math.min(c.low, price)
      c.close = price
    }
  }
  return [...byTime.values()].sort((a, b) => a.time - b.time)
}

const UP = '#16c784'
const DOWN = '#ea3943'

export function PriceChart({
  trades,
  kind,
  intervalSec = 15,
}: {
  trades: Trade[]
  kind: ChartKind
  intervalSec?: number
}) {
  const elRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const seriesRef = useRef<ISeriesApi<'Candlestick'> | ISeriesApi<'Area'> | null>(null)

  // Create the chart once.
  useEffect(() => {
    if (!elRef.current) return
    const chart = createChart(elRef.current, {
      autoSize: true,
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#8b909a',
        fontFamily: 'ui-monospace, monospace',
        fontSize: 11,
      },
      grid: { vertLines: { color: '#161922' }, horzLines: { color: '#161922' } },
      timeScale: { timeVisible: true, secondsVisible: false, borderColor: '#1e222a' },
      rightPriceScale: { borderColor: '#1e222a' },
      crosshair: { mode: 1 },
    })
    chartRef.current = chart
    return () => {
      chart.remove()
      chartRef.current = null
      seriesRef.current = null
    }
  }, [])

  // (Re)create the series when the chart kind changes.
  useEffect(() => {
    const chart = chartRef.current
    if (!chart) return
    if (seriesRef.current) {
      chart.removeSeries(seriesRef.current)
      seriesRef.current = null
    }
    seriesRef.current =
      kind === 'candle'
        ? chart.addSeries(CandlestickSeries, {
            upColor: UP,
            downColor: DOWN,
            borderVisible: false,
            wickUpColor: UP,
            wickDownColor: DOWN,
          })
        : chart.addSeries(AreaSeries, {
            lineColor: UP,
            topColor: 'rgba(22,199,132,0.25)',
            bottomColor: 'rgba(22,199,132,0)',
            lineWidth: 2,
          })
  }, [kind])

  // Push data whenever the tape (or kind) changes.
  useEffect(() => {
    const series = seriesRef.current
    if (!series) return
    const candles = tradesToCandles(trades, intervalSec)
    if (kind === 'candle') {
      ;(series as ISeriesApi<'Candlestick'>).setData(candles)
    } else {
      ;(series as ISeriesApi<'Area'>).setData(candles.map((c) => ({ time: c.time, value: c.close })))
    }
    chartRef.current?.timeScale().fitContent()
  }, [trades, kind, intervalSec])

  return <div ref={elRef} className="absolute inset-0" />
}
