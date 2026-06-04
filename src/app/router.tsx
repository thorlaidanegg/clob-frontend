import { createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router'
import { RequireAuth } from '@/auth/RequireAuth'
import { AppShell } from '@/components/AppShell'
import { LandingPage } from '@/features/landing/LandingPage'
import { LoginPage } from '@/features/auth/LoginPage'
import { MarketsPage } from '@/features/markets/MarketsPage'
import { TradePage } from '@/features/trade/TradePage'
import { PortfolioPage } from '@/features/portfolio/PortfolioPage'
import { LeaderboardPage } from '@/features/leaderboard/LeaderboardPage'
import { KeysPage } from '@/features/apikeys/KeysPage'

const rootRoute = createRootRoute({ component: () => <Outlet /> })

// Public routes (no shell, full-screen).
const landingRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: LandingPage })
const loginRoute = createRoute({ getParentRoute: () => rootRoute, path: '/login', component: LoginPage })

// Authenticated app: a pathless layout route that renders the shell behind the guard.
const appLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: 'app',
  component: () => (
    <RequireAuth>
      <AppShell />
    </RequireAuth>
  ),
})
const marketsRoute = createRoute({ getParentRoute: () => appLayout, path: '/markets', component: MarketsPage })
const tradeRoute = createRoute({ getParentRoute: () => appLayout, path: '/trade/$market', component: TradePage })
const portfolioRoute = createRoute({ getParentRoute: () => appLayout, path: '/portfolio', component: PortfolioPage })
const leaderboardRoute = createRoute({ getParentRoute: () => appLayout, path: '/leaderboard', component: LeaderboardPage })
const keysRoute = createRoute({ getParentRoute: () => appLayout, path: '/settings/keys', component: KeysPage })

const routeTree = rootRoute.addChildren([
  landingRoute,
  loginRoute,
  appLayout.addChildren([marketsRoute, tradeRoute, portfolioRoute, leaderboardRoute, keysRoute]),
])

export const router = createRouter({ routeTree, defaultPreload: 'intent' })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
