import React, { createContext, useContext, ReactNode } from 'react';
import { Theme, createTheme, ColorMode } from '@crfrsr/design-system-core';

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
}

export function ThemeProvider({ 
  children, 
}: ThemeProviderProps) {
  const [mode, setMode] = React.useState<ColorMode>('light');
  
  const theme = React.useMemo(() => {
    return createTheme(mode);
  }, [mode]);

  // Set global CSS variables from theme
  React.useEffect(() => {
    document.documentElement.style.setProperty('--theme-background', theme.colors.background);
    document.documentElement.style.setProperty('--theme-surface', theme.colors.surface);
    document.documentElement.style.setProperty('--theme-border', theme.colors.border);
    document.documentElement.style.setProperty('--theme-font-family', theme.typography.fontFamily.base);
    document.documentElement.style.setProperty('--theme-text-color', theme.colors.text);
    document.body.style.fontFamily = theme.typography.fontFamily.base;
    document.body.style.color = theme.colors.text;
    document.body.style.backgroundColor = theme.colors.background;
  }, [
    theme.colors.background,
    theme.colors.surface,
    theme.colors.border,
    theme.typography.fontFamily.base,
    theme.colors.text,
  ]);

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

