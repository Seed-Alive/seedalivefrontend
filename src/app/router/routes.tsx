import { lazy } from 'react';
import type { ComponentType } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { compose, withErrorBoundary, withSuspense, withAuthGuard } from '@shared/hoc';
import { RootLayout } from '@app/components/RootLayout';
import { RouteError, RouteSkeleton } from './fallbacks';

// Each screen downloads as its own file, so the first load stays small.
const pages = {
  onboarding: lazy(() => import('@features/onboarding/routes/OnboardingRoute')),
  home: lazy(() => import('@features/home/routes/HomeRoute')),
  bible: lazy(() => import('@features/bible/routes/BibleRoute')),
  bibleVersions: lazy(() => import('@features/bible/routes/VersionsRoute')),
  media: lazy(() => import('@features/media/routes/MediaRoute')),
  liveService: lazy(() => import('@features/live-service/routes/LiveServiceRoute')),
  devotional: lazy(() => import('@features/devotional/routes/DevotionalRoute')),
  hymns: lazy(() => import('@features/hymns/routes/HymnsRoute')),
  listenAgain: lazy(() => import('@features/listen-again/routes/ListenAgainRoute')),
  community: lazy(() => import('@features/community/routes/CommunityRoute')),
  shop: lazy(() => import('@features/shop/routes/ShopRoute')),
  account: lazy(() => import('@features/account/routes/AccountRoute')),
  signIn: lazy(() => import('@features/account/routes/SignInRoute')),
  notifications: lazy(() => import('@features/home/routes/NotificationsRoute')),
  uiKit: lazy(() => import('@features/ui-kit/routes/UiKitRoute')),
};

// Adds crash handling and a loading placeholder to a public screen.
const publicRoute = compose<object>(
  withErrorBoundary<object>(RouteError),
  withSuspense<object>(<RouteSkeleton />)
);

// The same, plus a sign-in check.
const privateRoute = compose<object>(
  withErrorBoundary<object>(RouteError),
  withSuspense<object>(<RouteSkeleton />),
  withAuthGuard<object>({ redirectTo: '/sign-in', pending: <RouteSkeleton /> })
);

const page = (C: ComponentType<object>, guard: boolean) =>
  (guard ? privateRoute : publicRoute)(C);

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', Component: page(pages.home, false) },
      { path: '/onboarding/*', Component: page(pages.onboarding, false) },
      { path: '/bible/versions', Component: page(pages.bibleVersions, false) },
      { path: '/bible/*', Component: page(pages.bible, false) },
      { path: '/media/*', Component: page(pages.media, false) },
      { path: '/live/*', Component: page(pages.liveService, false) },
      { path: '/devotional/*', Component: page(pages.devotional, false) },
      { path: '/hymns/*', Component: page(pages.hymns, false) },
      { path: '/listen-again/*', Component: page(pages.listenAgain, false) },
      { path: '/community/*', Component: page(pages.community, false) },
      { path: '/shop/*', Component: page(pages.shop, false) },
      { path: '/sign-in', Component: page(pages.signIn, false) },
      { path: '/account/*', Component: page(pages.account, true) },
      { path: '/notifications', Component: page(pages.notifications, false) },
      { path: '/ui', Component: page(pages.uiKit, false) },
    ],
  },
]);
