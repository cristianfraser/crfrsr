# Plan: Extract base components from `pokedex` into the `crfrsr` design system

Self-contained implementation plan. Repos involved:

- **Library**: `/Users/crfrsr/Projects/crfrsr` — npm-workspaces monorepo, packages `@crfrsr/design-system-core`, `@crfrsr/design-system-react`, `@crfrsr/design-system-react-native`, plus `examples/web` and `examples/mobile`. Git: branch `main`, one commit (`init`), **has uncommitted modifications** (README, package.jsons, both ThemeProviders, .gitignore) and an untracked `examples/mobile/src/App.js`.
- **Consumer**: `/Users/crfrsr/Projects/pokedex` — Vite + React 18 + Tailwind 3 app in `frontend/`, yarn 4. Git: branch `master`, clean.

## Goal

`crfrsr` becomes a **styling-agnostic component + style-config library** consumed by pokedex and, later, other apps with different visual styling. Extract from pokedex: **Button, Combobox, Pill**. Pokedex-specific styling (pokemon type colors, pokemon fonts, tiny font sizes, animations) **stays in pokedex**. The **base components and a shared `reset.css`** are identical across all consumer apps.

## Settled architecture decisions (do not re-litigate)

1. **Plain CSS + CSS custom properties.** The library ships hand-written CSS driven entirely by `--crfrsr-*` custom properties. **No Tailwind anywhere in the library** — no utility classes in component markup, no Tailwind preset, no `tailwind-merge`.
2. **Tailwind stays in pokedex only.** Consumers may pass Tailwind (or any) classes into components via `className` props; every extracted component must accept and forward `className`.
3. **One Button.** Pokedex currently has two (`components/Button.tsx` custom + `components/ui/button.tsx` shadcn). They merge into a single library Button; all call sites migrate.
4. Library components use plain class names (`crfrsr-btn`, `crfrsr-pill`, `crfrsr-combobox__*`) combined with `clsx`. No `class-variance-authority`, no `tailwind-merge`.
5. `framer-motion` does **not** enter the library. `AnimatedTypePills` stays in pokedex.
6. `reset.css` is authored in the library, modeled closely on **Tailwind v3 preflight** so pokedex doesn't visually shift when it swaps preflight for the library reset.

## Current-state inventory (verified)

### crfrsr library

- `packages/core/src/colors.ts` — `ColorPalette` (light/dark): primary/secondary (+light/dark variants), success/warning/error/info, background, surface, text, textSecondary, textDisabled, border, divider.
- `packages/core/src/theme.ts` — `Theme` = mode + colors + typography (fontFamily base/mono, fontSize xs–4xl, fontWeight, lineHeight) + spacing (xs–2xl).
- `packages/react/src/ThemeProvider.tsx` — React context; sets **five** CSS vars on `:root` (`--theme-background`, `--theme-surface`, `--theme-border`, `--theme-font-family`, `--theme-text-color`) plus body inline styles. Exposes `useTheme()`, `setMode`, `toggleMode`.
- `packages/react/src/typography/` — `Text`, `Heading` (inline styles from theme object).
- Build: plain `tsc` per package (ES2020 modules, `declaration: true`, `outDir: dist`). `packages/react/package.json` has `"main"/"module": "dist/index.js"`, `"types": "dist/index.d.ts"`, **`"sideEffects": false`**, `"files": ["dist", ...]`, no `exports` map. React >=18 peer dep. Depends on core `^1.0.0`.
- Tooling already scripted at root: `build`, `publish:all`, `yalc:publish/push/watch`, `pack:all`.
- **No Button/Combobox/Pill. No shipped CSS files. No reset.css.** (`examples/web/src/index.css` has an unshipped mini-reset — superseded by this plan.)

### pokedex frontend (`frontend/src`)

| File | What it is | Fate |
|---|---|---|
| `components/Button.tsx` | Custom button; visual styles live in `.btn`, `.btn-primary`, `.btn-secondary` in `index.css` (@layer components). Variants `primary/secondary`, sizes `sm/md/lg`. Default export. | Delete → library Button |
| `components/ui/button.tsx` | Stock shadcn button (cva + Radix Slot). Used **only** by `PokemonCombobox.tsx` and `MovesCombobox.tsx` (as triggers). | Delete → library Button |
| `components/Combobox.tsx` | Generic `<T>` combobox: virtualized list (`@tanstack/react-virtual`), infinite scroll (`hasNextPage`/`onLoadMore`), search reset on close (200 ms, matches popover close animation), full-page overlay while open, mobile touch/scroll-guard handling, clear button. Built on `ui/command` + `ui/popover`. Pulls `isMobile` from `contexts/StyleContext`. | Delete → library Combobox |
| `components/ui/command.tsx` | shadcn cmdk wrappers: `Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator`. `CommandDialog` (unused by Combobox) is the only reason `ui/dialog.tsx` is imported. Uses `lucide-react` Search icon. | Delete after migration |
| `components/ui/popover.tsx` | shadcn Radix popover wrapper. Used only by `Combobox.tsx`. Animations via `tailwindcss-animate` data-state classes. | Delete after migration |
| `components/ui/dialog.tsx` | Only imported by `ui/command.tsx`'s `CommandDialog`. | Delete after migration (verify no other imports first) |
| `components/ui/tooltip.tsx` | Used by `App.tsx` (`TooltipProvider`) and `pages/Pokemon.tsx`. | **Stays in pokedex** (out of scope) |
| `components/TypePill.tsx` | Pokemon type pill: `typeColors`/`typeColorsDark`/`typeLetters` from `constants/types.ts`, pokemon glyph font (`pokemon-font-2`), JS hover color swap, sizes `default/small/icon`, tiny Tailwind text sizes (`text-3xs/4xs/5xs`). | Becomes thin wrapper over library `Pill`; all pokemon-specific data/fonts stay in pokedex |
| `components/AnimatedTypePills.tsx` | framer-motion wrapper around TypePill. | Stays in pokedex unchanged |
| `components/PokemonCombobox.tsx`, `components/MovesCombobox.tsx` | App wrappers; import `Button` from `ui/button`, `CommandItem` from `ui/command`, pass `popoverWidth="w-[200px]"` / `"w-[137.5px]"` (Tailwind classes). | Stay; imports/props migrate to library API |
| `contexts/StyleContext.tsx` | `isMobile` = `window.innerWidth < 768` + resize listener (via `utils/helpers.ts`). Also used by BattleInfoPokemon, TeamPokemon, pages/Pokemon. | Stays (other consumers); library Combobox stops depending on it |
| `components/ThemeProviderWrapper.tsx` | **Broken**: uses CommonJS `require('@crfrsr/design-system-react')` in a Vite ESM app → always throws → always renders the no-provider fallback. The design system is currently dormant at runtime. | Replace with direct ESM import |
| `index.css` | Tailwind directives + preflight; pokemon `@font-face`; app utilities; shadcn HSL vars (`:root` + `.dark`); `.btn*` classes; nav-link; @reach/dialog modal styles. | Keep, minus `.btn*`; add `--crfrsr-*` override block |
| `tailwind.config.js` | shadcn color mapping, custom `fontSize` `2xs`–`6xs`, `tailwindcss-animate`. | Keep; disable preflight |
| `frontend/package.json` | `@crfrsr/design-system-{core,react}` as **`optionalDependencies`** via `file:../../crfrsr/packages/{core,react}`. | Promote to real deps |

Call sites of the custom `Button`: `pages/Home.tsx`, `pages/Pokemon.tsx`, `pages/PokemonDetail.tsx`. Call sites of shadcn `Button`: `PokemonCombobox.tsx`, `MovesCombobox.tsx`.

---

## Phase 0 — Housekeeping (crfrsr)

1. Review and commit the pending working-tree changes in crfrsr as their own commit before any new work (`git add -A && git commit`). Don't mix them into extraction commits.

## Phase 1 — Tokens + CSS foundation (crfrsr)

### 1a. Extend core tokens (`packages/core/src`)

Add to `ColorPalette` (both light and dark values; pick sensible neutrals consistent with the existing palette):

- `textOnPrimary` (button label on primary bg; white in both modes is fine)
- `surfaceHover` (hover/active background for ghost buttons, combobox items — plays the role of shadcn `accent`)
- `focusRing` (focus outline color — shadcn `ring`)
- `overlay` (scrim color for popover/modal layers, e.g. `rgb(0 0 0 / 0.5)`)

Add to `Theme`:

- `radius: { sm: string; md: string; lg: string; full: string }` (defaults `0.25rem / 0.375rem / 0.5rem / 9999px`)
- `shadow: { sm: string; md: string }` (popover/button shadows)

### 1b. CSS custom-property contract

Single naming scheme: `--crfrsr-<group>-<name>`, e.g.:

```
--crfrsr-color-primary, --crfrsr-color-primary-dark, --crfrsr-color-text-on-primary,
--crfrsr-color-secondary, --crfrsr-color-background, --crfrsr-color-surface,
--crfrsr-color-surface-hover, --crfrsr-color-text, --crfrsr-color-text-secondary,
--crfrsr-color-text-disabled, --crfrsr-color-border, --crfrsr-color-focus-ring,
--crfrsr-color-overlay,
--crfrsr-font-family-base, --crfrsr-font-size-xs ... -4xl,
--crfrsr-radius-sm/-md/-lg/-full, --crfrsr-spacing-xs ... -2xl,
--crfrsr-shadow-sm/-md
```

Two coordinated sources, one source of truth (the core `Theme` object):

- **`tokens.css`** (shipped): static defaults — `:root { ... }` with light values, `.crfrsr-dark { ... }` overrides with dark values. Generate it from the core theme with a small build script (`packages/core/scripts/generate-tokens-css.mjs`, run during core's `build`, output copied into `packages/react/dist/styles/` at react build time) so CSS can never drift from the JS theme. If wiring cross-package generation gets awkward, generating directly in `packages/react`'s build from the imported core theme is equally acceptable.
- **`ThemeProvider`**: extend the existing effect to set the **full** `--crfrsr-*` set on `document.documentElement` from the live theme (it currently sets five `--theme-*` vars). Keep writing the old `--theme-*` names too for backward compatibility with `examples/web`, or migrate the example and drop them — either is fine, but pick one.

### 1c. `reset.css`

Author `packages/react/src/styles/reset.css` as a faithful transcription of **Tailwind v3 preflight**, with theme lookups replaced by vars — notably the universal `border-width: 0; border-style: solid; border-color: var(--crfrsr-color-border)` rule (pokedex currently relies on `* { @apply border-border }`), `box-sizing: border-box`, margin-zeroing, font inheritance on form controls, and the body defaults expressed via vars (`font-family: var(--crfrsr-font-family-base)` etc.).

### 1d. Packaging changes (`packages/react`)

- Build step: `tsc` + copy `src/styles/*.css` → `dist/styles/` (simple `cp` in the build script is fine).
- Add an `exports` map:

```json
"exports": {
  ".": { "types": "./dist/index.d.ts", "default": "./dist/index.js" },
  "./reset.css": "./dist/styles/reset.css",
  "./tokens.css": "./dist/styles/tokens.css",
  "./styles.css": "./dist/styles/styles.css"
}
```

- Change `"sideEffects": false` → `"sideEffects": ["**/*.css"]`.
- `styles.css` = all component CSS concatenated (or `@import`s of per-component files that also ship individually). Consumers import: `reset.css`, `tokens.css`, `styles.css`.

## Phase 2 — Components (`packages/react/src/components/`)

General rules for all three: named exports; `React.forwardRef`; accept/forward `className` (merge with `clsx`) and rest props; styles only via `crfrsr-*` classes + vars; new runtime deps added to `packages/react` `dependencies`: `clsx`, `@radix-ui/react-popover`, `cmdk`, `@tanstack/react-virtual`. **Do not add**: `lucide-react` (inline the one Search SVG), `@radix-ui/react-slot`/`asChild` (no current consumer needs it), `class-variance-authority`, `tailwind-merge`, `framer-motion`.

### 2a. Button

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'   // default 'primary'
  size?: 'sm' | 'md' | 'lg' | 'icon'                        // default 'md'
}
```

Classes `crfrsr-btn crfrsr-btn--{variant} crfrsr-btn--{size}`. CSS reproduces the union of pokedex's two buttons: inline-flex centered, gap, `font-weight: 500`, `border-radius: var(--crfrsr-radius-lg)`, color transition, visible focus ring (`outline`/`box-shadow` from `--crfrsr-color-focus-ring`), `:disabled` opacity 0.5 + `cursor: not-allowed` + hover suppressed. Size paddings from the old custom button (sm `px-3 py-1.5 text-sm`, md `px-4 py-2 text-base`, lg `px-6 py-3 text-lg`) translated to spacing/font-size vars; `icon` = square (~2.25rem). Variant mapping for migration: old custom `primary/secondary` → same names; old shadcn `default→primary`, `secondary→secondary`, `outline→outline`, `ghost→ghost` (shadcn `destructive`/`link` unused in pokedex — omit).

### 2b. Pill

```tsx
interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: 'default' | 'small' | 'icon'   // default 'default'
  color?: string        // background-color
  hoverColor?: string   // background-color on hover (also implies hoverable cursor behavior)
  glyph?: React.ReactNode      // optional leading glyph slot (pokedex passes its letter in the pokemon font)
  uppercase?: boolean          // default true; pokedex passes false for 'icon' size
  children?: React.ReactNode   // the label; omitted for 'icon' size
}
```

Implementation: set `style={{ '--crfrsr-pill-bg': color, '--crfrsr-pill-bg-hover': hoverColor ?? color }}`; CSS handles `:hover` — this **replaces the JS `onMouseEnter` color-swapping** in pokedex's TypePill (plain `onMouseEnter`/`onMouseLeave` still forward via rest props for the tooltip behavior). Base CSS: white bold text, `border-radius: var(--crfrsr-radius-sm)`, inline-block, `cursor: default`, transition when hoverable. Size classes carry the padding/line-height differences (`default`: normal; `small`/`icon`: `line-height: 12px`, tighter padding). Font sizes intentionally **not** hardcoded to pokedex's micro sizes — expose `--crfrsr-pill-font-size` per size with sane defaults; pokedex overrides via its Tailwind `text-3xs` etc. through `className`.

### 2c. Combobox (+ internal primitives)

Port `pokedex/frontend/src/components/Combobox.tsx` near-verbatim (same generic `<T>` API, virtualization, infinite scroll, overlay, touch handling, 200 ms close-reset timing) with these deltas:

1. **`isMobile`**: replace `useStyle()` with a library-internal `useIsMobile(breakpoint = 768)` hook (same logic as pokedex's `utils/helpers.ts`: `window.innerWidth < 768`, resize listener, SSR-safe false). Export the hook from the package index — pokedex's other `useStyle` consumers are unaffected (StyleContext stays in pokedex).
2. **`popoverWidth`**: change semantics from Tailwind class to a CSS width value (`popoverWidth?: string` e.g. `'200px'`, default `'137.5px'`, applied via inline style). Add `popoverClassName?: string` passthrough for anything else.
3. **`inputClassName`**: keep as passthrough, but drop the Tailwind default (`'h-4 text-3xs'`) — default to `undefined`; pokedex passes its classes explicitly.
4. **Primitives**: recreate the needed subset with plain-CSS classes:
   - `ComboboxPopover` on `@radix-ui/react-popover` — replicate shadcn's open/close fade+zoom+slide animations with CSS `@keyframes` targeting Radix's `[data-state]`/`[data-side]` attributes, **duration 200 ms** (the search-reset timer depends on it).
   - `Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem` on `cmdk` — port the shadcn styling to `crfrsr-command__*` classes with vars. **Skip `CommandDialog`** entirely (kills the dialog dependency). Replace the `lucide-react` Search icon with an inline SVG.
   - **Export `CommandItem`** (as `CommandItem` or aliased `ComboboxItem`) — `PokemonCombobox`/`MovesCombobox` import it directly.
5. Dead commented-out code in the original (the `handleClickOutside` block, commented vendor-prefix lines) — do not port.

### 2d. Package index + example app

- `packages/react/src/index.ts`: export `Button`, `Pill`, `Combobox`, `CommandItem`, `useIsMobile` alongside existing exports.
- Extend `examples/web/src/App.tsx` to render: all Button variants × sizes (+ disabled), Pills (with/without glyph/hover, all sizes), and a Combobox over a ~500-item mock list exercising search + selection + clear. Import the three CSS files. This is the visual smoke test for both themes (toggle already exists).

## Phase 3 — Adopt in pokedex (`frontend/`)

1. **Dependencies** (`frontend/package.json`): move `@crfrsr/design-system-core` and `@crfrsr/design-system-react` from `optionalDependencies` to `dependencies` (keep `file:../../crfrsr/packages/*` for local dev). Delete the `postinstall` optional-dep check script. ⚠️ **Deploy note**: `file:` paths won't resolve on Netlify/CI checkouts of pokedex alone — before the next deploy, publish the packages to npm (root `npm run publish:all`; scopes/publishConfig already set up) and point pokedex at the published versions. Flag this to the user rather than silently choosing.
2. **CSS wiring** (`src/main.tsx` + `index.css` + `tailwind.config.js`):
   - Import in order, before `index.css`: `reset.css`, `tokens.css`, `styles.css` from `@crfrsr/design-system-react`.
   - `tailwind.config.js`: add `corePlugins: { preflight: false }` (library reset is now the one reset).
   - `index.css`: delete `@layer base * { @apply border-border }` (covered by reset), delete `.btn`, `.btn-primary`, `.btn-secondary`; keep the shadcn HSL vars (`ui/tooltip` and remaining shadcn-style bits still read them); add a `--crfrsr-*` override block styling the library to pokedex's look: `--crfrsr-font-family-base: 'PKMN RBYGSC', sans-serif`, `--crfrsr-color-primary: #0284c7` (+ `-dark: #0369a1` for hover, matching old `primary-600/700`), `--crfrsr-color-secondary` mapped to the old gray-200/300 secondary button, `--crfrsr-radius-lg: 0.5rem`, etc. **All pokedex-specific values live here, in pokedex.**
3. **ThemeProvider**: replace `ThemeProviderWrapper`'s `require()` hack with a direct `import { ThemeProvider } from '@crfrsr/design-system-react'` (keep `skipBodyFontFamily`); delete the wrapper or reduce it to the direct import.
4. **Button migration**: delete `components/Button.tsx` and `components/ui/button.tsx`. Update imports (default → named `{ Button }`): `pages/Home.tsx`, `pages/Pokemon.tsx`, `pages/PokemonDetail.tsx` (props map 1:1), `components/PokemonCombobox.tsx`, `components/MovesCombobox.tsx` (map shadcn `variant="outline"`→`outline`, `default`→`primary`, etc.; keep their existing Tailwind `className`s — allowed by design).
5. **Pill migration**: rewrite `components/TypePill.tsx` as a wrapper over library `Pill`: computes `color`/`hoverColor` from `constants/types.ts`, passes `glyph={<span className="pokemon-font-2 normal-case">{typeLetter}</span>}` (non-`small` sizes), label for non-`icon` sizes, `uppercase={size !== 'icon'}`, and its Tailwind micro text sizes via `className`. External TypePill API unchanged → `AnimatedTypePills`, `TeamPokemon`, `BattleInfoPokemon`, `MovesCombobox`, pages need no edits.
6. **Combobox migration**: delete `components/Combobox.tsx`, `components/ui/command.tsx`, `components/ui/popover.tsx`, and `components/ui/dialog.tsx` (grep first to confirm dialog/popover have no other importers). In `PokemonCombobox.tsx`/`MovesCombobox.tsx`: import `Combobox`/`CommandItem` from the library; `popoverWidth="w-[200px]"` → `popoverWidth="200px"`, `"w-[137.5px]"` → `"137.5px"`; pass the previous input classes explicitly via `inputClassName`.
7. Remove now-unused deps from `frontend/package.json` if nothing else uses them (grep before removing each): `class-variance-authority`, `@radix-ui/react-slot`, `cmdk`, `@radix-ui/react-popover`, `@tanstack/react-virtual`, possibly `lucide-react`. (`clsx`/`tailwind-merge` stay — `lib/utils.ts` `cn()` is used app-wide; `@radix-ui/react-dialog`/`react-tooltip`, `@reach/dialog`, `framer-motion` stay.)

## Phase 4 — Verification

1. crfrsr: `npm run build` clean; run `examples/web` dev server; check all three components in light + dark.
2. pokedex: `yarn dev`; typecheck/build (`yarn build`) and `yarn lint` pass.
3. Visual pass on every page — the **preflight swap is the highest-risk change**; compare against pre-change screenshots if possible:
   - Home (buttons, demo team pills), Pokemon list (buttons, pills, tooltips), PokemonDetail (buttons, pills), Team (TeamPokemon grid, both comboboxes: open, search, virtual-scroll a long list, infinite-scroll pokemon list, select, clear button, popover close animation).
   - Mobile viewport (<768px): combobox opens on single tap, does **not** open mid-scroll, overlay blocks background.
   - Fonts still PKMN RBYGSC everywhere; `.dark` unused in pokedex today — light mode only is fine.
4. Iterate with `npm run yalc:push` or reinstalled `file:` deps as the loop.

## Commit strategy

Separate commits per phase (crfrsr: housekeeping / tokens+css / components / example; pokedex: one migration commit, or split adoption vs. call-site swaps). Keep the working tree clean between phases.

## Known risks / gotchas

- **Preflight → reset.css swap** may subtly change pokedex rendering (esp. default border color/style, form-control font inheritance, image display). Mitigation: transcribe preflight faithfully; visual pass per page.
- The Combobox's 200 ms search-reset timer must match the new popover close-animation duration.
- `exports` map addition blocks deep imports into `dist/` — fine, nothing deep-imports today.
- `sideEffects` must include CSS or Vite may tree-shake the styles away.
- pokedex is yarn 4 with `file:` deps — after changing crfrsr, `yarn install` (or yalc) is needed for pokedex to pick up new builds; stale `dist/` is a classic confusion source. crfrsr `dist/` is committed/present — always rebuild before testing.
- npm publish is required before the next pokedex deploy (see Phase 3.1) — surface this, don't decide unilaterally.
