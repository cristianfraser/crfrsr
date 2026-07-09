/**
 * Color palette definitions for crfrsr Design System
 * Supports light and dark mode themes
 */

export type ColorMode = 'light' | 'dark';

export interface ColorPalette {
  // Primary colors
  primary: string;
  primaryLight: string;
  primaryDark: string;
  textOnPrimary: string; // label color on top of a primary background

  // Secondary colors
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;

  // Semantic colors
  success: string;
  warning: string;
  error: string;
  info: string;

  // Neutral colors
  background: string;
  surface: string;
  surfaceHover: string; // hover/active background for ghost buttons, list items
  text: string;
  textSecondary: string;
  textDisabled: string;
  border: string;
  divider: string;

  // Interaction / layering
  focusRing: string; // focus outline color
  overlay: string;   // scrim behind popovers / modals
}

export const lightColors: ColorPalette = {
  primary: '#0066FF',
  primaryLight: '#3385FF',
  primaryDark: '#0052CC',
  textOnPrimary: '#FFFFFF',

  secondary: '#6C757D',
  secondaryLight: '#8E959C',
  secondaryDark: '#545B62',

  success: '#28A745',
  warning: '#FFC107',
  error: '#DC3545',
  info: '#17A2B8',

  background: '#FFFFFF',
  surface: '#F8F9FA',
  surfaceHover: '#F1F3F5',
  text: '#212529',
  textSecondary: '#6C757D',
  textDisabled: '#ADB5BD',
  border: '#DEE2E6',
  divider: '#E9ECEF',

  focusRing: '#0066FF',
  overlay: 'rgb(0 0 0 / 0.5)',
};

export const darkColors: ColorPalette = {
  primary: '#4D9AFF',
  primaryLight: '#66ADFF',
  primaryDark: '#3385FF',
  textOnPrimary: '#FFFFFF',

  secondary: '#ADB5BD',
  secondaryLight: '#CED4DA',
  secondaryDark: '#8E959C',

  success: '#48D597',
  warning: '#FFD54F',
  error: '#FF6B6B',
  info: '#4DD0E1',

  background: '#121212',
  surface: '#1E1E1E',
  surfaceHover: '#2A2A2A',
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  textDisabled: '#6C6C6C',
  border: '#2E2E2E',
  divider: '#3A3A3A',

  focusRing: '#4D9AFF',
  overlay: 'rgb(0 0 0 / 0.7)',
};

export function getColors(mode: ColorMode = 'light'): ColorPalette {
  return mode === 'dark' ? darkColors : lightColors;
}

