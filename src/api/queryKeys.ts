/** Central query-key factory so invalidation stays consistent. */
export const qk = {
  auth: { me: ['auth', 'me'] as const },
  markets: {
    all: ['markets'] as const,
    detail: (id: string) => ['markets', id] as const,
    depth: (id: string) => ['markets', id, 'depth'] as const,
    trades: (id: string) => ['markets', id, 'trades'] as const,
    stats: (id: string) => ['markets', id, 'stats'] as const,
  },
  orders: {
    open: ['orders', 'open'] as const,
    detail: (id: string) => ['orders', id] as const,
  },
  portfolio: ['portfolio'] as const,
  leaderboard: ['leaderboard'] as const,
  apikeys: ['apikeys'] as const,
}
