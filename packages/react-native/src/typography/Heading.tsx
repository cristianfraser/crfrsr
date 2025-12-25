import React from 'react';
import { Text, TextStyle } from 'react-native';
import { useTheme } from '../ThemeProvider';

export interface HeadingProps {
  children: React.ReactNode;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'text' | 'textSecondary' | 'primary' | 'secondary';
  align?: 'left' | 'center' | 'right';
  lineHeight?: 'tight' | 'normal' | 'relaxed';
  style?: TextStyle | TextStyle[];
}

const variantMap = {
  1: '4xl',
  2: '3xl',
  3: '2xl',
  4: 'xl',
  5: 'lg',
  6: 'base',
} as const;

export function Heading({
  children,
  level,
  weight = 'bold',
  color = 'text',
  align = 'left',
  lineHeight = 'tight',
  style,
}: HeadingProps) {
  const { theme } = useTheme();
  const variant = variantMap[level];

  // Convert rem to pixels (1rem = 16px)
  const fontSizeInRem = parseFloat(theme.typography.fontSize[variant].replace('rem', ''));
  const fontSizeInPx = fontSizeInRem * 16;

  // Only set fontFamily if it's a non-empty string (React Native-compatible)
  // Empty string means use the default system font
  const fontFamily = theme.typography.fontFamily.base?.trim();
  const headingStyle: TextStyle = {
    ...(fontFamily && fontFamily !== '' ? { fontFamily } : {}),
    fontSize: fontSizeInPx,
    fontWeight: theme.typography.fontWeight[weight].toString() as TextStyle['fontWeight'],
    lineHeight: fontSizeInPx * theme.typography.lineHeight[lineHeight],
    color: theme.colors[color],
    textAlign: align,
  };

  return (
    <Text style={[headingStyle, style]}>
      {children}
    </Text>
  );
}

