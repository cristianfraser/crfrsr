import * as React from 'react';
import { cn } from '../lib/cn';
import type { InputSize } from './Input';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Type scale and horizontal padding. The box height comes from `rows`. */
  size?: InputSize;
}

/**
 * Multi-line text input. Shares the Input box styling (border, focus ring,
 * disabled and aria-invalid states) and follows the same native-attribute
 * conventions.
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ size = 'md', className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'crfrsr-input',
          `crfrsr-input--${size}`,
          'crfrsr-textarea',
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
