# SeedAlive frontend

React + TypeScript PWA. The designs are phone frames (390px), so the shell is
mobile-first and centres itself once the viewport is wider.

```sh
npm run dev        # dev server
npm run build      # typecheck + production build
npm run typecheck  # types only
npm run tokens     # regenerate the theme from design/tokens.json
```

## Structure

Feature-first. A feature owns its routes, components, data access and types,
and exposes a single public surface through its `index.ts`. Nothing imports
across a feature boundary into a subfolder — that is what turns a feature tree
back into a ball of mud.

```
src/
  app/                 composition root — nothing domain-specific lives here
    providers/         theme, auth, and whatever else wraps the tree
    router/            route table, lazy imports, fallbacks
    components/        app shell (tab bar, layout)
  features/
    <feature>/
      routes/          route-level components (default export, lazy-loaded)
      components/      components private to this feature
      api/             data access; only this feature calls it
      types.ts
      index.ts         the feature's public surface
  shared/
    components/        design-system primitives (Text, Button, Screen)
    hoc/               cross-cutting wrappers
    hooks/             shared contexts and hooks
    styles/            app.css (entry), theme.css + tokens.ts (generated), base.css
```

Aliases `@app/*`, `@features/*` and `@shared/*` are configured in both
`tsconfig.app.json` and `vite.config.ts` — change them in both.

## Higher-order components

`src/shared/hoc` holds the cross-cutting wrappers. They compose right-to-left,
so the leftmost ends up outermost:

```tsx
const privateRoute = compose<object>(
  withErrorBoundary(RouteError),   // outermost: also catches a failed chunk
  withSuspense(<RouteSkeleton />), // then: shows the skeleton while it loads
  withAuthGuard({ redirectTo: '/onboarding' })  // innermost: runs once loaded
);
```

That order is deliberate. The boundary has to sit outside Suspense to catch a
chunk that fails to download, and the auth check has to sit inside it so a
redirect is not mistaken for an error.

`named()` keeps the stack readable — `withAuthGuard(AccountRoute)` rather than
three anonymous `Wrapped`s.

## Features

Every screen is built from the Figma exports in `design/mobile/screens`.

| Feature | Route | Built |
|---|---|---|
| Onboarding | `/onboarding/*` | splash, language, welcome, 3-slide tour, sign-up, verify, interests, notifications |
| Home | `/` | daily deck, live banner, mini player, explore grid, message and photo rails, events, search sheet |
| Notifications | `/notifications` | grouped list with unread marks and filter tabs |
| Bible | `/bible`, `/bible/versions` | reader, chapter sheet, text-size sheet, version downloads |
| Live service | `/live` | player, quick actions, stream and audio options |
| Devotional | `/devotional` | seven-page story reader |
| Media | `/media` | featured album and album grid |
| Community | `/community` | church feed card and grouped directory |
| Shop | `/shop` | plan picker and feature comparison |
| Hymns | `/hymns` | searchable, filterable hymn list |
| Listen again | `/listen-again` | latest recording and dated archive |
| Account | `/sign-in`, `/account` | sign-in and profile with live theme toggle |
| UI kit | `/ui` | every primitive, for checking against Figma |

## Primitives

`src/shared/components`, all built against the Components board in Figma and
measured rather than eyeballed — see `design/README.md` for how.

| Component | Variants | Notes |
|---|---|---|
| `Text` | 15 type styles | Drives size/weight/family from `--text-*` |
| `Button` | primary, outline, soft, link, danger | `--radius-lg`, not a pill |
| `IconButton` | soft, outline, dark | 44px square, `--radius-md` |
| `Input` | default, error | Label, leading icon, `aria-invalid` + `role="alert"` |
| `Chip` | idle, selected | Pill; `aria-pressed` |
| `Badge` | accent, neutral, muted, danger, live | Pill, except `live` |
| `Switch` | on, off | `role="switch"`; accent track is sanctioned here |
| `Avatar` | sm, md, lg, xl | Image, or initials fallback |
| `ListRow` | with/without divider | `<button>` only when interactive |
| `Card` | surface, dark, accent, tonal | `--radius-lg` |
| `Screen` | flush | Safe-area insets, 390px design width |

`/ui` renders every one of them on a page for comparison against Figma. It is
not linked from the app.

Two deliberate deviations from the token set, both measured:

- `Badge` `live` uses literal `#FF0000`, not `--color-danger` (`#B42318`).
  That is what the design specifies, and no token carries it.
- `Card` `dark` uses `--grey-800` rather than a semantic token, because the
  card stays dark in both themes and no semantic pair holds `#27272A` in both.

## Styling

Tailwind v4, with no `tailwind.config.js` — the theme is CSS-first. `app.css`
is the only stylesheet the app loads:

```css
@import 'tailwindcss';
@import './theme.css';   /* generated from design/tokens.json */
@import './base.css';
```

`theme.css` is generated; do not edit it by hand. It opens with a `@theme`
block that clears Tailwind's stock palette and type scale, then declares the
design's own tokens in Tailwind's namespaces, so only design tokens can be
spelled as a utility:

| Token | Utility |
|---|---|
| `--color-ink`, `--color-accent-soft`, … | `text-ink`, `bg-accent-soft`, `border-line` |
| `--color-grey-800` | `bg-grey-800` |
| `--radius-lg` | `rounded-lg` |
| `--text-heading-h2-20` (+ its weight) | `text-heading-h2-20` |
| `--font-sans` / `--font-serif` | `font-sans` / `font-serif` |
| `--spacing: 4px` | `p-4` is 16px, `gap-2` is 8px |

The design's 4/8/12/16/20/24/32/48 spacing scale is exactly Tailwind's 4px
step, so spacing needs no bespoke names. `bg-red-500` and `text-xl` do not
exist here; they were removed with the namespace resets.

Light values live in the `@theme` block; the dark values, the `[data-theme]`
override `ThemeProvider` writes, and the `[data-tone]` patches follow it as
plain rules. Utilities compile to `var(--color-*)`, so all three keep working
and theme switching stays a single attribute write with no re-render.

Two custom utilities carry what a utility cannot express — `brand-mark` (the
logo drawn as a mask) and `stage-backdrop` (the onboarding gradient).

`Text` maps its `variant` and `color` props through the generated
`textSizeClass` / `textColorClass` tables, so the class names are literals the
Tailwind scanner can see.

Where a primitive owns a layout property, it exposes a prop rather than taking
the class through `className` — `Card` has `gap`, `padding` and `direction`.
Two utilities for the same property would otherwise be resolved by stylesheet
order rather than by intent.

## Performance

- Every route is a separate chunk; the initial load is the shell plus Home.
- No runtime CSS-in-JS and no class-merging library. Styles are Tailwind
  utilities over custom properties, so theming costs nothing at render time.
- The service worker precaches the shell and serves `/api/` network-first with
  a 5s timeout, so scripture and devotional content survive a bad connection.
