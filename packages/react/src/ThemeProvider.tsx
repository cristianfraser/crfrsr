import React, { createContext, useContext, ReactNode } from 'react';
import {
  Theme,
  ThemeOverrides,
  createTheme,
  ColorMode,
  themeToCssVariables,
} from '@crfrsr/design-system-core';

interface ThemeContextValue {
  theme: Theme;
  setMode: React.Dispatch<React.SetStateAction<ColorMode>>;
  toggleMode: () => void;
  isLight: boolean;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export interface ThemeProviderProps {
  children: ReactNode;
  initialMode?: ColorMode;
  /**
   * Per-app theme customization, merged over the library defaults. Define it at
   * module level (or memoize it) so its identity is stable across renders.
   */
  theme?: ThemeOverrides;
  skipBodyFontFamily?: boolean;
}

export function ThemeProvider({
  children,
  initialMode = 'light',
  theme: themeOverrides,
  skipBodyFontFamily = false,
}: ThemeProviderProps) {
  const [mode, setMode] = React.useState<ColorMode>(initialMode);

  const theme = React.useMemo(() => {
    return createTheme(mode, themeOverrides);
  }, [mode, themeOverrides]);

  // Set global CSS variables from theme. useLayoutEffect so the app's palette
  // lands before first paint — with useEffect the initial frame would flash the
  // static tokens.css defaults.
  React.useLayoutEffect(() => {
    const root = document.documentElement;

    // Full --crfrsr-* contract consumed by the shipped component CSS
    const vars = themeToCssVariables(theme);
    for (const [name, value] of Object.entries(vars)) {
      root.style.setProperty(name, value);
    }

    // Marker class so the static tokens.css `.crfrsr-dark` block can also apply
    root.classList.toggle('crfrsr-dark', mode === 'dark');

    // Legacy --theme-* variables kept for backward compatibility (examples/web)
    root.style.setProperty('--theme-background', theme.colors.background);
    root.style.setProperty('--theme-surface', theme.colors.surface);
    root.style.setProperty('--theme-border', theme.colors.border);
    root.style.setProperty('--theme-font-family', theme.typography.fontFamily.base);
    root.style.setProperty('--theme-text-color', theme.colors.text);

    if (!skipBodyFontFamily) {
      document.body.style.fontFamily = theme.typography.fontFamily.base;
    }
    document.body.style.color = theme.colors.text;
    document.body.style.backgroundColor = theme.colors.background;
  }, [mode, theme, skipBodyFontFamily]);

  const toggleMode = React.useCallback(() => {
    setMode(prevMode => prevMode === 'dark' ? 'light' : 'dark');
  }, []);

  const isLight = mode === 'light';
  const isDark = mode === 'dark';

  const value = React.useMemo(() => ({
    theme,
    setMode,
    toggleMode,
    isLight,
    isDark,
  }), [theme, setMode, toggleMode, isLight, isDark]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

