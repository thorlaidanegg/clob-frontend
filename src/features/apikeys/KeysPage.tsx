import { useState } from 'react'
import { Copy } from 'lucide-react'
import { useApiKeys, useCreateApiKey, useRevokeApiKey } from '@/api/apikeys'
import { formatTime } from '@/lib/format'

export function KeysPage() {
  const { data: keys } = useApiKeys()
  const create = useCreateApiKey()
  const revoke = useRevokeApiKey()
  const [name, setName] = useState('')
  const [revealed, setRevealed] = useState<string | null>(null)

  function onCreate(e: React.FormEvent) {
    e.preventDefault()
    create.mutate(name || 'bot key', {
      onSuccess: (res) => {
        setRevealed(res.fullKey)
        setName('')
      },
    })
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-1 text-xl font-semibold tracking-tight">API keys</h1>
      <p className="mb-5 text-sm text-muted">
        Use a key to trade programmatically — run a market-maker or strategy bot against the engine.
      </p>

      <form onSubmit={onCreate} className="mb-4 flex gap-2">
        <input
          placeholder="Key label (e.g. my-mm-bot)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 rounded-md border border-edge bg-panel-2 px-3 py-2 text-sm outline-none"
        />
        <button
          type="submit"
          disabled={create.isPending}
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-black hover:opacity-90 disabled:opacity-50"
        >
          Create key
        </button>
      </form>

      {revealed && (
        <div className="mb-4 rounded-lg border border-accent/40 bg-up-soft/30 p-3">
          <p className="mb-2 text-xs text-muted">
            Copy this now — it&apos;s shown once and never again.
          </p>
          <div className="flex items-center gap-2">
            <code className="flex-1 truncate rounded bg-panel-2 px-2 py-1 font-mono text-sm">
              {revealed}
            </code>
            <button
              onClick={() => void navigator.clipboard.writeText(revealed)}
              className="rounded border border-edge p-1.5 text-muted hover:text-zinc-100"
              aria-label="Copy key"
            >
              <Copy className="size-4" />
            </button>
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-lg border border-edge">
        <table className="w-full text-sm">
          <thead className="bg-panel text-xs uppercase text-muted">
            <tr>
              <th className="px-4 py-2 text-left font-medium">Label</th>
              <th className="px-4 py-2 text-left font-medium">Prefix</th>
              <th className="px-4 py-2 text-left font-medium">Last used</th>
              <th className="px-4 py-2" />
            </tr>
          </thead>
          <tbody className="divide-y divide-edge">
            {keys?.map((k) => (
              <tr key={k.id}>
                <td className="px-4 py-2.5">{k.name || '—'}</td>
                <td className="px-4 py-2.5 font-mono text-muted">{k.keyPrefix}</td>
                <td className="px-4 py-2.5 text-muted">{formatTime(k.lastUsedAt)}</td>
                <td className="px-4 py-2.5 text-right">
                  <button
                    onClick={() => revoke.mutate(k.id)}
                    className="text-down hover:underline"
                  >
                    Revoke
                  </button>
                </td>
              </tr>
            ))}
            {keys && keys.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-muted">
                  No keys yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
