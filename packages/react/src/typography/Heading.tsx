import React, { CSSProperties } from 'react';
import { useTheme } from '../ThemeProvider';

export interface HeadingProps {
  children: React.ReactNode;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'text' | 'textSecondary' | 'primary' | 'secondary';
  align?: 'left' | 'center' | 'right';
  lineHeight?: 'tight' | 'normal' | 'relaxed';
  style?: CSSProperties;
  className?: string;
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
  weight,
  color,
  align,
  lineHeight,
  style,
  className,
}: HeadingProps) {
  const { theme } = useTheme();
  const variant = variantMap[level];
  const Component = `h${level}` as keyof JSX.IntrinsicElements;

  const headingStyle: CSSProperties = {
    // fontFamily is set globally, no need to set it here
    // fontSize is set based on level (heading semantic sizing)
    fontSize: theme.typography.fontSize[variant],
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
    <Component style={headingStyle} className={className}>
      {children}
    </Component>
  );
}

