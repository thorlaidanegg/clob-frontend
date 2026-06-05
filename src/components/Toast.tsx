import { useSyncExternalStore } from 'react'
import { CheckCircle2, Info, X, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

type ToastKind = 'success' | 'error' | 'info'
export interface Toast {
  id: number
  kind: ToastKind
  message: string
}

// Module-level store so any code (hooks, api callbacks) can fire a toast without
// prop-drilling or context. Components read it via useSyncExternalStore.
let toasts: Toast[] = []
let nextId = 1
const subs = new Set<() => void>()
const emit = () => subs.forEach((s) => s())

function push(kind: ToastKind, message: string, ttl = 3500) {
  const id = nextId++
  toasts = [...toasts, { id, kind, message }]
  emit()
  setTimeout(() => dismiss(id), ttl)
}
function dismiss(id: number) {
  toasts = toasts.filter((t) => t.id !== id)
  emit()
}

export const toast = {
  success: (m: string) => push('success', m),
  error: (m: string) => push('error', m, 5000),
  info: (m: string) => push('info', m),
}

const ICONS = { success: CheckCircle2, error: XCircle, info: Info }
const TONE = {
  success: 'border-up/40 text-up',
  error: 'border-down/40 text-down',
  info: 'border-edge-strong text-zinc-200',
}

/** Toaster renders the active toasts. Mount once near the app root. */
export function Toaster() {
  const items = useSyncExternalStore(
    (cb) => {
      subs.add(cb)
      return () => subs.delete(cb)
    },
    () => toasts,
    () => toasts,
  )

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex w-80 flex-col gap-2">
      {items.map((t) => {
        const Icon = ICONS[t.kind]
        return (
          <div
            key={t.id}
            className={cn(
              'pointer-events-auto flex items-start gap-2 rounded-lg border bg-panel px-3 py-2.5 text-sm shadow-lg',
              TONE[t.kind],
            )}
          >
            <Icon className="mt-0.5 size-4 shrink-0" />
            <span className="min-w-0 flex-1 text-zinc-100">{t.message}</span>
            <button onClick={() => dismiss(t.id)} className="shrink-0 text-muted hover:text-zinc-200">
              <X className="size-3.5" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
