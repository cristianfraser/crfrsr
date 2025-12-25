import React from 'react';
import { Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native';
import { useTheme } from '../ThemeProvider';

export interface TextProps extends Omit<RNTextProps, 'style'> {
  variant?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'text' | 'textSecondary' | 'textDisabled' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  align?: 'left' | 'center' | 'right' | 'justify';
  lineHeight?: 'tight' | 'normal' | 'relaxed';
  style?: TextStyle | TextStyle[];
}

export function Text({
  children,
  variant = 'base',
  weight = 'normal',
  color = 'text',
  align = 'left',
  lineHeight = 'normal',
  style,
  ...props
}: TextProps) {
  const { theme } = useTheme();

  // Convert rem to pixels (1rem = 16px)
  const fontSizeInRem = parseFloat(theme.typography.fontSize[variant].replace('rem', ''));
  const fontSizeInPx = fontSizeInRem * 16;

  // Only set fontFamily if it's a non-empty string (React Native-compatible)
  // Empty string means use the default system font
  const fontFamily = theme.typography.fontFamily.base?.trim();
  const textStyle: TextStyle = {
    ...(fontFamily && fontFamily !== '' ? { fontFamily } : {}),
    fontSize: fontSizeInPx,
    fontWeight: theme.typography.fontWeight[weight].toString() as TextStyle['fontWeight'],
    lineHeight: fontSizeInPx * theme.typography.lineHeight[lineHeight],
    color: theme.colors[color],
    textAlign: align,
  };

  return (
    <RNText style={[textStyle, style]} {...props}>
      {children}
    </RNText>
  );
}

