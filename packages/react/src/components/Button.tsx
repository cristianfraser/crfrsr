import * as React from 'react';
import { cn } from '../lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

/**
 * Single Button for the design system. Consolidates the two buttons that used to
 * live in consumer apps (a custom primary/secondary button and a shadcn button).
 * Styled entirely through the --crfrsr-* CSS variables; pass `className` to layer
 * app-specific styles (e.g. Tailwind utilities) on top.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', type = 'button', className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          'crfrsr-btn',
          `crfrsr-btn--${variant}`,
          `crfrsr-btn--${size}`,
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
