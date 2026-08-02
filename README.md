# crfrsr Design System

A foundational Design System project that provides a unified solution for crfrsr's web (React) and mobile (React Native) applications. Built with architectural decisions designed to last, featuring a dynamic color palette for Dark Mode support and distributable as NPM packages.

<!-- <div align="center">
  <img src="web.png" width="400" alt="Web Example" />
  <img src="ios.png" width="400" alt="iOS Example" />
</div> -->

## 🏗️ Architecture

The Design System is organized as a monorepo with the following structure:

```
crfrsr/
├── packages/
│   ├── core/              # Core design tokens (colors, themes, types)
│   ├── react/             # React (web) components
│   └── react-native/      # React Native (mobile) components
└── examples/
    ├── web/               # React web example application
    └── mobile/            # React Native mobile example application
```

### Package Structure

- **`@crfrsr/core`**: Core utilities including color palettes, theme definitions, and shared types. Platform-agnostic and used by both React and React Native packages.

- **`@crfrsr/ui`**: React components for web applications. Includes typography components that work seamlessly with React.

- **`@crfrsr/ui-native`**: React Native components for mobile applications. Includes typography components optimized for mobile platforms.

## 🚀 Getting Started

### Prerequisites

- Node.js 24.11.1

### Installation

1. Clone the repository, use specified node version, and install dependencies:

```bash
(nvm install)
nvm use
npm install
```

2. Build all packages:

```bash
npm run build
```

## 📦 Packages

### Core Package

The core package provides the foundation for the design system:

```typescript
import { createTheme, getColors, ColorMode } from '@crfrsr/core';

const theme = createTheme('light'); // or 'dark'
const colors = getColors('light');
```

### React Package (Web)

Install in your React web application:

```bash
npm install @crfrsr/ui
```

Usage:

```tsx
import { ThemeProvider, Text, Heading } from '@crfrsr/ui';

function App() {
  return (
    <ThemeProvider>
      <Heading level={1}>Welcome to crfrsr</Heading>
      <Text variant="lg" color="primary">
        This is a primary text
      </Text>
    </ThemeProvider>
  );
}
```

### React Native Package (Mobile)

Install in your React Native application:

```bash
npm install @crfrsr/ui-native
```

Usage:

```tsx
import { ThemeProvider, Text, Heading } from '@crfrsr/ui-native';

function App() {
  return (
    <ThemeProvider>
      <Heading level={1}>Welcome to crfrsr</Heading>
      <Text variant="lg" color="primary">
        This is a primary text
      </Text>
    </ThemeProvider>
  );
}
```

## 🎨 Typography Components

The Design System includes comprehensive typography components that standardize text rendering across platforms.

### Text Component

The `Text` component provides flexible text rendering with consistent styling:

**Props:**
- `variant`: `'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'` - Text size variant
- `weight`: `'normal' | 'medium' | 'semibold' | 'bold'` - Font weight
- `color`: `'text' | 'textSecondary' | 'textDisabled' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'` - Text color
- `align`: `'left' | 'center' | 'right' | 'justify'` - Text alignment
- `lineHeight`: `'tight' | 'normal' | 'relaxed'` - Line height variant

**Example:**
```tsx
<Text variant="lg" weight="bold" color="primary" align="center">
  Centered bold primary text
</Text>

<Text>
  Default text
</Text>
```

### Heading Component

The `Heading` component provides semantic heading elements:

**Props:**
- `level`: `1 | 2 | 3 | 4 | 5 | 6` - Heading level (h1-h6)
- `weight`: `'normal' | 'medium' | 'semibold' | 'bold'` - Font weight
- `color`: `'text' | 'textSecondary' | 'primary' | 'secondary'` - Text color
- `align`: `'left' | 'center' | 'right'` - Text alignment
- `lineHeight`: `'tight' | 'normal' | 'relaxed'` - Line height variant

**Example:**
```tsx
<Heading level={1} color="primary">
  Main Title
</Heading>
```

## 📝 Form Components

Web only (`@crfrsr/ui`). All three render plain elements and forward every native
attribute, so state is expressed the native way: `disabled` for disabled, and
`aria-invalid="true"` for the error styling — there is no `invalid` prop.

### Input Component

Single-line text input.

**Props:**
- `size`: `'sm' | 'md' | 'lg'` - Visual size (default `'md'`). Shadows the native numeric `size` attribute, which is not supported — set the width in CSS instead.
- Plus every `<input>` attribute (`type`, `value`, `placeholder`, `disabled`, `inputMode`, …).

Use it for textual types (`text`, `search`, `number`, `date`, `month`, …).
Checkboxes, radios and file inputs keep their native rendering — do not put
`Input` around them. The control keeps its intrinsic width, so it sits inline in
a toolbar; inside a `Field` it stretches to the full row.

**Example:**
```tsx
<Input type="search" placeholder="Search accounts" aria-label="Search accounts" />

<Input size="sm" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />

<Input value={email} onChange={onChange} aria-invalid={!valid || undefined} />
```

### Textarea Component

Multi-line input. Shares the `Input` box styling and conventions; resizes
vertically.

**Props:**
- `size`: `'sm' | 'md' | 'lg'` - Type scale and horizontal padding (default `'md'`). The box height comes from `rows`.
- Plus every `<textarea>` attribute (`rows`, `value`, `placeholder`, `disabled`, …).

**Example:**
```tsx
<Textarea rows={8} value={pasted} onChange={(e) => setPasted(e.target.value)} />
```

### Field Component

A labelled form row: label above the control, optional error message below. The
control is nested inside the `<label>`, so it is associated implicitly — no
`id`/`htmlFor` plumbing.

**Props:**
- `label`: `ReactNode` - Label text shown above the control
- `error`: `ReactNode` - Error message shown below the control; rendered only when truthy

**Example:**
```tsx
<Field label="Monthly amount" error={invalid ? 'Enter a value between 0 and 100' : undefined}>
  <Input type="number" value={value} onChange={onChange} aria-invalid={invalid || undefined} />
</Field>
```

## 🌓 Dark Mode Support

The Design System includes built-in support for Dark Mode through a dynamic color palette:

```tsx
import { ThemeProvider } from '@crfrsr/ui';

function App() {
  const { setMode } = useTheme();
  return (
    <button onClick={() => setMode('dark')}>Set dark mode</button>
  );
}
```

All components automatically adapt to the current theme mode, ensuring consistent styling across light and dark themes.

## 📱 Example Applications

### Web Example

Run the React web example:

```bash
cd examples/web
npm install
npm run dev
```

The example demonstrates all typography components and theme switching capabilities.

### Mobile Example

**Prerequisites:**
- Expo CLI (can use via `npx expo` - no global install needed)
- For iOS Simulator: Xcode (macOS only) - required for running on iOS simulator
- For physical iPhone: Expo Go app installed on iPhone, iPhone and Mac on the same WiFi network (Xcode not required for Expo Go)
- For Android Emulator: Android Studio - required for running on Android emulator
- For physical Android: Expo Go app installed on Android device, device and computer on the same WiFi network

Run the React Native mobile example:

```bash
cd examples/mobile
npm install
1. npm start        # Start Expo development server
2. npm run ios      # For iOS Simulator (macOS only, requires Xcode)
3. npm run android  # For Android Emulator (requires Android Studio)
```

**Alternative for Physical Devices:** You can scan the QR code displayed by `npm start` with the Expo Go app on your physical device (iOS or Android). No Xcode or Android Studio needed - just ensure your device and computer are on the same WiFi network.

The example demonstrates all typography components optimized for mobile platforms.

## 🏭 Publishing to NPM

All three packages live under the **`@crfrsr` npm scope**:

- [`@crfrsr/core`](https://www.npmjs.com/package/@crfrsr/core)
- [`@crfrsr/ui`](https://www.npmjs.com/package/@crfrsr/ui)
- [`@crfrsr/ui-native`](https://www.npmjs.com/package/@crfrsr/ui-native)

### One-time setup

1. Create a free npm account at <https://www.npmjs.com/signup> (use the username `crfrsr` if you want `@crfrsr` as a personal scope, or create an organization named `crfrsr` at <https://www.npmjs.com/org/create>).
2. Log in locally:

   ```bash
   npm login
   ```

3. Confirm you can publish to the scope:

   ```bash
   npm whoami
   npm access list packages @crfrsr   # optional sanity check
   ```

Each `package.json` already declares `"publishConfig": { "access": "public" }`, so scoped packages will publish as public (the default for scoped packages is private, which requires a paid plan).

### Publishing a new version

Bump versions first. The packages are interdependent (`react` and `react-native` depend on `core`), so bump them together to keep things in sync:

```bash
# Patch bump every package to e.g. 1.0.1
npm version --workspaces --include-workspace-root patch
```

> If you bump `core`, also update the `^x.y.z` range in `react` and `react-native`'s `dependencies` to match.

Then publish them all in dependency order with a single command:

```bash
npm run publish:all
```

This runs `npm run build` first, then publishes `core`, `react`, and `react-native` in that order. Each package's `prepublishOnly` script also runs a clean + build as a final guard.

To publish a single package manually:

```bash
npm publish --workspace=@crfrsr/ui
```

## 🔗 Using locally in a sibling project (without publishing)

The recommended workflow uses [**yalc**](https://github.com/wclr/yalc) — it's a local proxy registry that copies the built package into your sibling project. It works much more reliably than `npm link` for React / React Native (no duplicate-React errors, plays nicely with Metro/Webpack/Vite).

Assumes your sibling project is laid out like this:

```
Projects/
├── crfrsr/                 # this repo
└── my-other-app/           # the sibling project that will consume the design system
```

### Step 1 — In **this** repo, publish the packages to your local yalc store

```bash
# from the crfrsr/ root
npm install              # installs yalc + nodemon as devDependencies
npm run yalc:publish     # builds all packages and publishes them to ~/.yalc
```

### Step 2 — In the **sibling** project, add the packages

```bash
cd ../my-other-app

# For a React web app:
npx yalc add @crfrsr/core
npx yalc add @crfrsr/ui

# OR for a React Native app:
npx yalc add @crfrsr/core
npx yalc add @crfrsr/ui-native

npm install
```

> Why add `core` explicitly? `react` and `react-native` declare `@crfrsr/core` as a regular `dependencies` entry. When the package is consumed via yalc, that dependency still needs to resolve — adding `core` via yalc points it at your local build instead of npm.

### Step 3 — Iterate

Whenever you change source code in `crfrsr/`, push the rebuilt output to every sibling project that has yalc-added the package:

```bash
# from crfrsr/ root
npm run yalc:push   # build + push to all subscribers
```

For a tighter loop, run the watcher and any change is auto-pushed:

```bash
npm run yalc:watch
```

### Cleaning up

In the sibling project, when you're ready to switch back to the published npm version:

```bash
npx yalc remove --all
npm install
```

### Alternative 1 — `npm link` (built-in, no extra tools)

`npm link` works but is fragile with React peer deps. If you want to try it:

```bash
# from crfrsr/ root, register each package as a global symlink
cd packages/core         && npm link && cd -
cd packages/react        && npm link && cd -
cd packages/react-native && npm link && cd -

# from the sibling project, consume them
cd ../my-other-app
npm link @crfrsr/core @crfrsr/ui
```

If you hit "Invalid hook call" or "two copies of React" errors, switch to yalc — that's exactly the class of problem it solves.

### Alternative 2 — `npm pack` tarballs (zero-tool)

For one-off testing without any tooling:

```bash
# from crfrsr/ root
npm run pack:all   # produces .pack/*.tgz files

# from the sibling project
npm install ../crfrsr/.pack/crfrsr-design-system-core-1.0.0.tgz \
            ../crfrsr/.pack/crfrsr-design-system-react-1.0.0.tgz
```

This installs the exact same artifact npm would publish — useful as a final smoke test before `npm publish`.

## 🛠️ Development

### Building

Build all packages:

```bash
npm run build
```

Build a specific package:

```bash
cd packages/core
npm run build
```

### Cleaning

Clean all build artifacts:

```bash
npm run clean
```

## 📋 Design Decisions

### Monorepo Structure

- **Why**: Enables code sharing between packages while maintaining clear boundaries
- **Benefit**: Single source of truth for design tokens, easier maintenance

### Separate React and React Native Packages

- **Why**: Platform-specific optimizations and API differences
- **Benefit**: Optimal performance and developer experience for each platform
- **Caveat**: Have to maintain two different versions for each component, but this allows for platform-specific quirks and bugs to be fixed more easily.

### Core Package Separation

- **Why**: Shared logic (colors, themes) should be platform-agnostic
- **Benefit**: Consistency across platforms, single source of truth for design tokens

### Dynamic Theme System

- **Why**: Future-proofing for Dark Mode.
- **Benefit**: Easy theme switching between light and dark modes.

## 🔮 Future Enhancements

- Additional UI components (Cards, Select, checkbox/radio, etc.)
- Animation system
- Accessibility improvements
- Storybook documentation
- Automated visual regression testing
- Theme customization API

## 📄 License

This project is licensed under the MIT License.

## Chat logs

There's a `chat.md` file containing Cursor chats, and a `chat-promts.md` file containing only the prompts.

