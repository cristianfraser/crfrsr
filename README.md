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

- **`@crfrsr/design-system-core`**: Core utilities including color palettes, theme definitions, and shared types. Platform-agnostic and used by both React and React Native packages.

- **`@crfrsr/design-system-react`**: React components for web applications. Includes typography components that work seamlessly with React.

- **`@crfrsr/design-system-react-native`**: React Native components for mobile applications. Includes typography components optimized for mobile platforms.

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
import { createTheme, getColors, ColorMode } from '@crfrsr/design-system-core';

const theme = createTheme('light'); // or 'dark'
const colors = getColors('light');
```

### React Package (Web)

Install in your React web application:

```bash
npm install @crfrsr/design-system-react
```

Usage:

```tsx
import { ThemeProvider, Text, Heading } from '@crfrsr/design-system-react';

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
npm install @crfrsr/design-system-react-native
```

Usage:

```tsx
import { ThemeProvider, Text, Heading } from '@crfrsr/design-system-react-native';

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

## 🌓 Dark Mode Support

The Design System includes built-in support for Dark Mode through a dynamic color palette:

```tsx
import { ThemeProvider } from '@crfrsr/design-system-react';

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

Each package can be published independently to NPM:

```bash
cd packages/core
npm publish

cd ../react
npm publish

cd ../react-native
npm publish
```

Make sure to update version numbers in `package.json` before publishing.

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

- Additional UI components (Buttons, Cards, Inputs, etc.)
- Animation system
- Accessibility improvements
- Storybook documentation
- Automated visual regression testing
- Theme customization API

## 📄 License

This project is licensed under the MIT License.

## Chat logs

There's a `chat.md` file containing Cursor chats, and a `chat-promts.md` file containing only the prompts.

