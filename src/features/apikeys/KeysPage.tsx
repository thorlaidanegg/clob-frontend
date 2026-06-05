import { useState } from 'react'
import { AlertTriangle, BookOpen, KeyRound, Plug, Terminal, Trash2 } from 'lucide-react'
import { useApiKeys, useCreateApiKey, useRevokeApiKey } from '@/api/apikeys'
import { CopyButton } from '@/components/CopyButton'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatTime } from '@/lib/format'
import { cn } from '@/lib/utils'

// Same-origin in dev (Vite proxies /v1) and in prod (served behind the gateway).
const ORIGIN = typeof window !== 'undefined' ? window.location.origin : 'https://your-host'
const WS_ORIGIN = ORIGIN.replace(/^http/, 'ws')

const GRANTED_SCOPES = ['orders:read', 'orders:write', 'portfolio:read']

export function KeysPage() {
  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Developer</h1>
        <p className="mt-1 text-sm text-muted">
          Trade programmatically over REST and WebSocket, or connect an AI agent over MCP. API keys
          are optional — the web UI works without one.
        </p>
      </header>

      <ApiKeysSection />
      <QuickstartSection />
      <McpSection />
    </div>
  )
}

// ── API keys ─────────────────────────────────────────────────────────────────

function ApiKeysSection() {
  const { data: keys, isLoading } = useApiKeys()
  const create = useCreateApiKey()
  const revoke = useRevokeApiKey()
  const [name, setName] = useState('')
  const [revealed, setRevealed] = useState<string | null>(null)

  function onCreate(e: React.FormEvent) {
    e.preventDefault()
    create.mutate(name.trim() || 'bot key', {
      onSuccess: (res) => {
        setRevealed(res.fullKey)
        setName('')
      },
    })
  }

  return (
    <Section
      icon={KeyRound}
      title="API keys"
      subtitle="Each key carries standard scopes and a 300 req/min limit."
    >
      <form onSubmit={onCreate} className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label className="mb-1 block text-[11px] uppercase tracking-wider text-muted">
            Key label
          </label>
          <Input
            placeholder="my-mm-bot"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={create.isPending}>
          {create.isPending ? 'Generating…' : 'Generate key'}
        </Button>
      </form>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted">
        <span>Grants:</span>
        {GRANTED_SCOPES.map((s) => (
          <Badge key={s} variant="muted" className="font-mono">
            {s}
          </Badge>
        ))}
      </div>

      {revealed && (
        <div className="mt-4 rounded-lg border border-accent/40 bg-accent/5 p-4">
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-accent">
            <AlertTriangle className="size-4" />
            Copy this now — it&apos;s shown once and never stored in plaintext.
          </div>
          <div className="flex items-center gap-2">
            <code className="min-w-0 flex-1 truncate rounded bg-bg px-3 py-2 font-mono text-sm">
              {revealed}
            </code>
            <CopyButton value={revealed} label="Copy key" />
          </div>
        </div>
      )}

      <div className="mt-4 overflow-x-auto rounded-lg border border-edge">
        <table className="w-full min-w-160 text-sm">
          <thead className="bg-panel text-[11px] uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-2.5 text-left font-medium">Label</th>
              <th className="px-4 py-2.5 text-left font-medium">Prefix</th>
              <th className="px-4 py-2.5 text-left font-medium">Scopes</th>
              <th className="px-4 py-2.5 text-right font-medium">Rate</th>
              <th className="px-4 py-2.5 text-left font-medium">Last used</th>
              <th className="px-4 py-2.5 text-left font-medium">Created</th>
              <th className="px-4 py-2.5" />
            </tr>
          </thead>
          <tbody className="divide-y divide-edge">
            {isLoading && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-muted">
                  Loading…
                </td>
              </tr>
            )}
            {keys?.map((k) => (
              <tr key={k.id} className={cn(k.revoked && 'opacity-50')}>
                <td className="px-4 py-2.5 font-medium">{k.name || '—'}</td>
                <td className="px-4 py-2.5 font-mono text-muted">{k.keyPrefix}…</td>
                <td className="px-4 py-2.5">
                  <div className="flex flex-wrap gap-1">
                    {k.scopes.map((s) => (
                      <Badge key={s} variant="muted" className="font-mono">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-2.5 text-right font-mono text-muted">{k.rateLimit}</td>
                <td className="px-4 py-2.5 text-muted">{formatTime(k.lastUsedAt)}</td>
                <td className="px-4 py-2.5 text-muted">{formatTime(k.createdAt)}</td>
                <td className="px-4 py-2.5 text-right">
                  {k.revoked ? (
                    <Badge variant="danger">Revoked</Badge>
                  ) : (
                    <button
                      onClick={() => revoke.mutate(k.id)}
                      disabled={revoke.isPending}
                      className="inline-flex items-center gap-1 text-down hover:underline disabled:opacity-40"
                    >
                      <Trash2 className="size-3.5" /> Revoke
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {keys && keys.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-muted">
                  No keys yet — generate one to start automating.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Section>
  )
}

// ── Quickstart / docs ────────────────────────────────────────────────────────

type Lang = 'curl' | 'js' | 'python'

const PLACE_ORDER: Record<Lang, string> = {
  curl: `curl -X POST "${ORIGIN}/v1/orders" \\
  -H "Authorization: Bearer $CLOB_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "marketID": "BTC-USD",
    "side": "bid",
    "orderType": "limit",
    "price": "64000.00",
    "qty": "0.01",
    "tif": "GTC"
  }'`,
  js: `const res = await fetch("${ORIGIN}/v1/orders", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${process.env.CLOB_API_KEY}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    marketID: "BTC-USD",
    side: "bid",
    orderType: "limit",
    price: "64000.00",
    qty: "0.01",
    tif: "GTC",
  }),
})
console.log(await res.json())`,
  python: `import os, requests

res = requests.post(
    "${ORIGIN}/v1/orders",
    headers={"Authorization": f"Bearer {os.environ['CLOB_API_KEY']}"},
    json={
        "marketID": "BTC-USD",
        "side": "bid",
        "orderType": "limit",
        "price": "64000.00",
        "qty": "0.01",
        "tif": "GTC",
    },
)
print(res.json())`,
}

const WS_SNIPPET = `const ws = new WebSocket("${WS_ORIGIN}/v1/stream")

ws.onopen = () => {
  ws.send(JSON.stringify({ type: "auth", apiKey: process.env.CLOB_API_KEY }))
  ws.send(JSON.stringify({ type: "subscribe", channel: "depth:BTC-USD" }))
  ws.send(JSON.stringify({ type: "subscribe", channel: "trades:BTC-USD" }))
}

// Frames arrive as { channel, type, data }
ws.onmessage = (e) => console.log(JSON.parse(e.data))`

const ENDPOINTS: { method: string; path: string; desc: string }[] = [
  { method: 'GET', path: '/v1/markets', desc: 'List tradable markets' },
  { method: 'GET', path: '/v1/markets/{id}/depth', desc: 'Order-book snapshot' },
  { method: 'POST', path: '/v1/orders', desc: 'Place an order' },
  { method: 'DELETE', path: '/v1/orders/{id}', desc: 'Cancel an order' },
  { method: 'GET', path: '/v1/orders', desc: 'List your open orders' },
  { method: 'GET', path: '/v1/portfolio', desc: 'Balances & positions' },
  { method: 'WS', path: '/v1/stream', desc: 'Realtime depth / trades / orders' },
]

const LANGS: { key: Lang; label: string }[] = [
  { key: 'curl', label: 'cURL' },
  { key: 'js', label: 'JavaScript' },
  { key: 'python', label: 'Python' },
]

function QuickstartSection() {
  const [lang, setLang] = useState<Lang>('curl')

  return (
    <Section icon={Terminal} title="Quickstart" subtitle="Authenticate with a Bearer key, then trade.">
      <div className="mb-4 flex items-center justify-between gap-3 rounded-md border border-edge bg-bg px-3 py-2">
        <div className="min-w-0">
          <span className="text-[11px] uppercase tracking-wider text-muted">Base URL</span>
          <div className="truncate font-mono text-sm">{ORIGIN}</div>
        </div>
        <CopyButton value={ORIGIN} label="Copy" />
      </div>

      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">Place an order</p>
      <div className="mb-2 flex gap-1">
        {LANGS.map((l) => (
          <button
            key={l.key}
            onClick={() => setLang(l.key)}
            className={cn(
              'rounded-md px-3 py-1 text-xs font-medium transition-colors',
              lang === l.key ? 'bg-panel-2 text-zinc-50' : 'text-muted hover:text-zinc-200',
            )}
          >
            {l.label}
          </button>
        ))}
      </div>
      <CodeBlock code={PLACE_ORDER[lang]} />

      <p className="mb-2 mt-6 text-xs font-medium uppercase tracking-wider text-muted">
        Stream the order book
      </p>
      <CodeBlock code={WS_SNIPPET} />

      <p className="mb-3 mt-6 text-xs font-medium uppercase tracking-wider text-muted">
        Endpoint reference
      </p>
      <div className="overflow-x-auto rounded-lg border border-edge">
        <table className="w-full min-w-120 text-sm">
          <tbody className="divide-y divide-edge">
            {ENDPOINTS.map((e) => (
              <tr key={e.method + e.path}>
                <td className="w-16 px-4 py-2">
                  <Badge variant={e.method === 'DELETE' ? 'danger' : e.method === 'WS' ? 'accent' : 'default'} className="font-mono">
                    {e.method}
                  </Badge>
                </td>
                <td className="px-4 py-2 font-mono text-zinc-200">{e.path}</td>
                <td className="px-4 py-2 text-right text-muted">{e.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  )
}

// ── MCP ──────────────────────────────────────────────────────────────────────

function McpSection() {
  const config = `{
  "mcpServers": {
    "clob": {
      "command": "npx",
      "args": ["-y", "@thorlaidanegg/clob-mcp"],
      "env": {
        "CLOB_BASE_URL": "${ORIGIN}",
        "CLOB_API_KEY": "clob_live_••••••••"
      }
    }
  }
}`

  return (
    <Section
      icon={Plug}
      title="Model Context Protocol (MCP)"
      subtitle="Let Claude, Cursor, or any MCP client place orders and read your book."
      experimental
    >
      <p className="mb-3 text-sm text-muted">
        Drop this into your client&apos;s MCP config (e.g. <code className="font-mono text-zinc-300">claude_desktop_config.json</code>),
        swap in a generated key, and the agent gets tools for markets, order placement, and
        portfolio — all scoped to your paper account.
      </p>
      <CodeBlock code={config} />
      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href="https://modelcontextprotocol.io"
          target="_blank"
          rel="noreferrer"
        >
          <Button variant="outline" size="sm">
            <BookOpen className="size-4" /> MCP docs
          </Button>
        </a>
      </div>
    </Section>
  )
}

// ── Shared layout bits ───────────────────────────────────────────────────────

function Section({
  icon: Icon,
  title,
  subtitle,
  experimental,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  subtitle: string
  experimental?: boolean
  children: React.ReactNode
}) {
  return (
    <section className="mb-8 rounded-xl border border-edge bg-panel p-6">
      <div className="mb-5 flex items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-accent/15">
          <Icon className="size-5 text-accent" />
        </div>
        <div>
          <h2 className="flex items-center gap-2 text-base font-bold">
            {title}
            {experimental && <Badge variant="accent">Experimental</Badge>}
          </h2>
          <p className="text-xs text-muted">{subtitle}</p>
        </div>
      </div>
      {children}
    </section>
  )
}

function CodeBlock({ code }: { code: string }) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-edge bg-bg">
      <div className="absolute right-2 top-2 z-10">
        <CopyButton value={code} className="bg-panel" />
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed text-zinc-200">
        <code>{code}</code>
      </pre>
    </div>
  )
}
