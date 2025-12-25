import React, { CSSProperties } from 'react';
import { useTheme } from '../ThemeProvider';

export interface TextProps {
  children: React.ReactNode;
  variant?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'text' | 'textSecondary' | 'textDisabled' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  align?: 'left' | 'center' | 'right' | 'justify';
  lineHeight?: 'tight' | 'normal' | 'relaxed';
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  style?: CSSProperties;
  className?: string;
}

export function Text({
  children,
  variant,
  weight,
  color,
  align,
  lineHeight,
  as: Component = 'p',
  style,
  className,
}: TextProps) {
  const { theme } = useTheme();

  const textStyle: CSSProperties = {
    // fontFamily is set globally, no need to set it here
    // Only set fontSize if variant is explicitly provided
    ...(variant && { fontSize: theme.typography.fontSize[variant] }),
    // Only set fontWeight if weight is explicitly provided
    ...(weight && { fontWeight: theme.typography.fontWeight[weight] }),
    // Only set lineHeight if explicitly provided
    ...(lineHeight && { lineHeight: theme.typography.lineHeight[lineHeight] }),
    // Only set color if explicitly provided (defaults to body text color)
    ...(color && { color: theme.colors[color] }),
    // Only set textAlign if explicitly provided
    ...(align && { textAlign: align }),
    margin: 0,
    ...style,
  };

  return (
    <Component style={textStyle} className={className}>
      {children}
    </Component>
  );
}

