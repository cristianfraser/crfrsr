import React, { createContext, useContext, ReactNode } from 'react';
import { Platform, useColorScheme } from 'react-native';
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
  const systemColorScheme = useColorScheme();
  
  // Determine the correct initial mode
  const getInitialMode = (): ColorMode => {
    return systemColorScheme ?? 'light';
  };
  
  const [mode, setMode] = React.useState<ColorMode>(getInitialMode());
  const [userHasSetMode, setUserHasSetMode] = React.useState<boolean>(false);
  
  // Sync with system color scheme changes
  // This handles cases where systemColorScheme becomes available after initial render
  // or when the system color scheme changes
  React.useEffect(() => {
    if (!userHasSetMode) {
      const targetMode: ColorMode = systemColorScheme ?? 'light';
      setMode(prevMode => {
        // Update if system color scheme is available and different from current mode
        if (systemColorScheme !== null && prevMode !== targetMode) {
          return targetMode;
        }
        return prevMode;
      });
    }
  }, [systemColorScheme, userHasSetMode]);
  
  // Wrapper for setMode that tracks user interaction
  const handleSetMode = React.useCallback((newMode: ColorMode | ((prev: ColorMode) => ColorMode)) => {
    setUserHasSetMode(true);
    setMode(newMode);
  }, []);

  const toggleMode = React.useCallback(() => {
    handleSetMode(prevMode => prevMode === 'dark' ? 'light' : 'dark');
  }, [handleSetMode]);
  
  const theme = React.useMemo(() => {
    const baseTheme = createTheme(mode);
    
    // Override font families for React Native compatibility
    // React Native doesn't support CSS font stacks like web does
    // Use empty string to let React Native use the default system font
    // The Text/Heading components will only apply fontFamily if it's a non-empty string
    return {
      ...baseTheme,
      typography: {
        ...baseTheme.typography,
        fontFamily: {
          base: '', // Empty string = use default system font in React Native
          mono: Platform.OS === 'ios' ? 'Courier' : 'monospace',
        },
      },
    };
  }, [mode]);

  const isLight = mode === 'light';
  const isDark = mode === 'dark';

  const value = React.useMemo(() => ({
    theme,
    setMode: handleSetMode,
    toggleMode,
    isLight,
    isDark,
  }), [theme, handleSetMode, toggleMode, isLight, isDark]);

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

