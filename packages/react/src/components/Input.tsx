import * as React from 'react';
import { cn } from '../lib/cn';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Visual size. Shadows the native numeric `size` attribute, which is not
   * supported — constrain the width with CSS instead.
   */
  size?: InputSize;
}

/**
 * Single-line text input. Renders a bare <input>, so native attributes stay the
 * way to express state: `disabled` for disabled, `aria-invalid="true"` for the
 * error style. Meant for textual types (text, search, number, date, month, …);
 * checkboxes, radios and file inputs keep their native rendering.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ size = 'md', className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn('crfrsr-input', `crfrsr-input--${size}`, className)}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
