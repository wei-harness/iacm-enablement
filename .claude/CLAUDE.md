# CLAUDE.md

Internal sales-enablement app for Harness **AR**. React 19 + Vite + TypeScript, Okta-gated, light-theme editorial product UI. This file describes the coding rules and conventions that already exist in the repo. Follow them; don't reinvent.

## Stack at a glance

- **React 19** with the React Compiler enabled (`babel-plugin-react-compiler`). Don't add `useMemo`/`useCallback` for performance — the compiler handles memoization. Only use them when the dependency itself needs referential stability.
- **TypeScript ~6** with strict-ish settings: `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`, `erasableSyntaxOnly`, `noFallthroughCasesInSwitch`.
- **Vite 8** for dev/build. Dev server on port `3000`. Production build outputs to `dist/ccm/` and is served at base path `/ccm/` (these paths are leftover from the legacy CCM naming and still control deploy routing — see `vite.config.ts` and `vercel.json`).
- **React Router v7** (`react-router-dom`) for routing.
- **TanStack React Query v5** for all server state.
- **@okta/okta-react + okta-auth-js** for auth (PKCE + refresh tokens, see `src/auth/README.md`).
- **react-helmet-async** for per-page titles.
- **react-icons/lu** (Lucide) for icons — never another icon set without discussion.
- **SCSS Modules** (`sass-embedded`) for styling. No Tailwind, no styled-components.
- **pnpm** for package management (`pnpm-lock.yaml` is the lockfile of record).

## Scripts

```
pnpm dev               # dev server on :3000
pnpm dev:staging       # dev server, staging env
pnpm build             # tsc -b && vite build
pnpm build:staging     # staging build
pnpm build:prod        # production build
pnpm lint              # eslint .
pnpm preview           # serve the built bundle
```

Before declaring a change done, both `pnpm exec tsc -b` and `pnpm exec eslint .` must pass.

## Folder layout

```
src/
  api/            # async functions that fetch data; return typed promises
  auth/           # auth abstraction (see "Auth adapter pattern" below)
    adapters/
      okta.ts     # the only file that imports from @okta/*
    index.ts      # the public surface — signInApp / signOutApp / getUser / ...
  components/     # shared cross-feature React components
    ui/           # design-system primitives (Card, Badge, SectionHeader, StatCard)
    token-session/
  AR/             # the main feature — sales-enablement app shell + sections
    sections/     # one .tsx per nav section (Overview, SKUs, ...)
    data/         # static content arrays consumed by sections
    ar.module.scss
    ARIcon.tsx    # icon-name → Lucide component map (only icon surface)
    index.tsx     # ARPage default export, lazy-loaded by App.tsx
  hooks/          # React Query wrappers; one file per resource
  libs/           # cross-cutting clients (queryClient, queryKeys)
  pages/          # full-page surfaces outside the app shell (SignIn)
    SignIn/
      index.tsx
      SignIn.module.scss
  types/          # shared TypeScript interfaces
  utils/          # tiny shared helpers
  App.tsx         # router definition
  main.tsx        # provider tree
  index.css       # design tokens on :root + global resets
```

Rules:
- **Co-locate styles.** A component's `.module.scss` lives next to its `.tsx`. The only "global" stylesheets are `src/index.css` (tokens + resets) and `src/App.css` (legacy, unused; don't add to it).
- **Pages as folders.** Multi-file page surfaces use `pages/Foo/index.tsx + Foo.module.scss`. Single-file pages stay as `pages/Foo.tsx`.
- **Sections live in `src/AR/sections/`.** One file per nav item, named export `function FooSection()`. New sections also need a row in the `NAV_ITEMS` array and a case in `ActiveSection` inside `src/AR/index.tsx`.
- **Static section content lives in `src/AR/data/`.** Sections render; `data/*.ts` hold the arrays. Don't inline 200-line content arrays inside JSX.

## TypeScript

- **`verbatimModuleSyntax: true`** is on. **Type-only imports must use `import type`:**
  ```ts
  import type { User } from '../types/user'
  import { getCurrentUser } from '../api/user'
  ```
  Mixing values and types in the same `import` line will fail the build.
- **`noUnusedLocals` + `noUnusedParameters`** are on, **and the ESLint `@typescript-eslint/no-unused-vars` rule does NOT allow `_`-prefixed names.** If a destructured discriminator isn't used, restructure to avoid binding it rather than naming it `_foo`.
- **`erasableSyntaxOnly`** is on. No enums, no parameter-property constructors, no namespaces — these compile to runtime code that's banned. Use `as const` objects, plain functions, and union types instead.
- Prefer `interface` for object shapes consumed by component props; `type` for unions, mapped types, and helpers.
- Avoid `any`. Where a third-party return type is genuinely opaque, narrow at the boundary (see `src/api/user.ts` where Okta claims are cast field-by-field, not blanket-as'd).

## React conventions

- **React 19 + Compiler.** Treat components and hooks as if memoization is automatic. Add `useMemo` / `useCallback` only when the *consumer* needs referential stability (e.g. dependency-tracked effects).
- **Components: function declarations** for default page/section components.
  ```tsx
  export function OverviewSection() { ... }
  export default function ARPage() { ... }
  ```
- **Hooks: arrow consts.**
  ```ts
  export const useUserProfile = (enabled = true) => useQuery({ ... })
  ```
- **No classes.** No HOCs. Use hooks and composition.
- **Lazy + Suspense at route boundaries** (`App.tsx` lazy-loads `ARPage`). New large surfaces should follow the same pattern with `<Suspense fallback={null}>`.
- **`<Helmet>`** at the top of every routable page or major section to set `document.title`. Title format is `Page Name | AR Sales Enablement` or `... | Harness`.

## Styling

- **SCSS Modules only.** New styles live in a co-located `*.module.scss`. Never global CSS except in `src/index.css`.
- **Design tokens are CSS custom properties on `:root`** (see `src/index.css`). Component styles consume them as `var(--space-md)`, `var(--color-finops)`, `var(--text-body-sm)`, etc.
- **AR-scoped aliases.** Inside `.arRoot` (the top of `ar.module.scss`), the root tokens are aliased to semantic names: `--accent`, `--bg-card`, `--border`, `--r-md`, `--font-head`, `--font-body`, etc. Inside the AR app shell, use the aliases. Outside (e.g. `src/components/ui/`), use the root tokens directly so the component is portable.
- **No raw hex codes in component styles.** If a value isn't in `:root` yet, add it there first, then consume the token. The only exception is `color-mix(in srgb, var(--color-X) N%, transparent|white)` tints, which are the system's preferred derivation.
- **Conditional classes use template strings:**
  ```tsx
  className={`${styles.btn} ${active ? styles.btnActive : ''}`}
  ```
  No `classnames` / `clsx` dependency; don't add one.
- **Dynamic per-instance CSS values use inline custom properties:**
  ```tsx
  style={{ '--active-color': sku.color } as React.CSSProperties}
  ```
  This is the project pattern for per-SKU and per-persona color theming.
- **Respect `prefers-reduced-motion`.** The AR root has a global `@media (prefers-reduced-motion: reduce)` override in `ar.module.scss`. New animations must continue to honor it.

## React Query

- **All server state goes through React Query.** No `useState` + `useEffect` for fetching.
- **Query keys are centralized** in `src/libs/query-client.ts` under `queryKeys`. Add a new key there, keyed by resource. Never inline a query key array at the call site.
  ```ts
  // libs/query-client.ts
  export const queryKeys = {
    users: { current: () => ['users', 'current'] as const },
  }
  ```
- **`queryClient` defaults** are `retry: false`, `refetchOnWindowFocus: false`. Override per-hook when there's a real reason; don't change the global defaults casually.
- **Hooks pattern:** one file per resource in `src/hooks/`, named `useFoo.ts`, with exported `useFooProfile` / `useCreateFoo` / etc. See `src/hooks/useAuth.ts` for the template.

## Auth (Okta adapter pattern)

The adapter pattern is load-bearing — treat it as architecture, not boilerplate.

- **`src/auth/adapters/okta.ts`** is the only file in `src/` that imports from `@okta/*`.
- **`src/auth/index.ts`** is the public surface. Components and hooks call `signInApp`, `signOutApp`, `getUser`, `setAuthToken`, `refreshAuthToken`, `getValidToken`, etc. — never raw Okta primitives.
- **`src/api/user.ts`** consumes the adapter (`getUserOkta`) and returns typed app domain objects (`User`).
- If a new auth provider needs to be added, the work is: write a new adapter under `src/auth/adapters/`, then update `src/auth/index.ts` to re-export from it. No call site should change.

Don't import from `@okta/okta-react` or `@okta/okta-auth-js` outside `src/auth/`. If a token is needed in an API call, use `getValidToken()`.

## Imports

- **Relative paths**, not the `@` alias. The Vite config defines `'@': path.resolve(__dirname, './')` but the alias points at the repo root, not `src/`, so it's rarely useful and isn't currently used in `src/`. Match the existing pattern: `import { foo } from '../api/user'`.
- **Order:** external packages → app code → types → styles. No formal rule beyond convention; matching `src/AR/index.tsx` is sufficient.
- **Default vs named:** components that are routed/lazy-loaded use `export default`. Everything else uses named exports. Hooks, utilities, API functions, types are always named.

## ESLint

The config (`eslint.config.js`) composes:

- `@eslint/js` recommended
- `typescript-eslint` recommended
- `eslint-plugin-react-hooks` (flat recommended)
- `eslint-plugin-react-refresh` (vite preset)

Rules to remember:
- `react-hooks/rules-of-hooks` and `react-hooks/exhaustive-deps` — don't disable; fix the dep array.
- `react-refresh/only-export-components` — files under `src/` that export components should not also export non-component values that would break HMR.
- `@typescript-eslint/no-unused-vars` — strict; no `_` prefix exemption.

Running `pnpm lint` runs `eslint .`. If it fails, fix the underlying issue rather than disabling a rule.

## Routing

`src/App.tsx` defines all routes. The current shape:
- `/` and `/login/callback` → `<SignInPage>` (legacy `/authorization-code/callback` also handled).
- `/ar` and `/ar-sales-enablement` → auth-gated `<ARPage>` (lazy).
- `*` → redirect to `/`.

`RequireAuth` reads from `useOktaAuth()`. Don't write a parallel auth gate; reuse this one.

## Production hardening

- `console.log` is no-oped in production (`main.tsx`). Don't rely on logs in prod; if something must surface, throw a real error or send it to an actual logger.
- `vercel.json` controls deploy routing.
- The build outputs to `dist/ccm/` in prod (legacy base path) and is served from `https://<host>/ccm/`. Asset URLs must be relative or `import`-resolved, never hard-coded `/foo.png`.

## File creation rules

- **Do not create new `.md` files** unless the user explicitly asks. `src/auth/README.md` and this file already exist for their respective purposes; extend them rather than spawning siblings.
- **Do not add new top-level config files** (`.prettierrc`, `commitlint.config.js`, etc.) without discussion. The repo intentionally stays config-light.
- **Comments:** default to none. Add one only when the *why* is non-obvious — a hidden invariant, a workaround for a specific bug, a constraint a future reader couldn't infer from the code.

## Small house style

- **No semicolons in `.ts`/`.tsx`** under `src/` (matches every existing source file). Some imported files (`vite.config.ts`, the SignIn page) still use semicolons from the legacy template; new code should drop them.
- **Single quotes** for string literals; backticks only for template strings.
- **2-space indent** everywhere.
- **No em dashes in user-facing copy.** Use commas, colons, semicolons, periods, or parentheses. Code comments may use them sparingly.
- **Trailing commas** in multi-line arrays/objects/imports (matches existing files).
- **Arrow functions** for one-off callbacks and exported consts; **function declarations** for components and named utilities you'd want to see in a stack trace.

## When in doubt

1. Mirror the closest existing file.
2. If conventions conflict, the convention in the file you're modifying wins.
3. If still unclear, ask before introducing a new pattern.
