import * as React from 'react';
import { cn } from '../lib/cn';

export interface FieldProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Label text shown above the control. */
  label: React.ReactNode;
  /** Error message shown below the control. Rendered only when truthy. */
  error?: React.ReactNode;
}

/**
 * A labelled form row: label above the control, optional error message below.
 * The control is nested inside the <label>, so it is associated implicitly —
 * no id/htmlFor plumbing needed. Pair with `aria-invalid` on the control to get
 * the matching error styling.
 */
export const Field = React.forwardRef<HTMLLabelElement, FieldProps>(
  ({ label, error, className, children, ...props }, ref) => {
    return (
      <label ref={ref} className={cn('crfrsr-field', className)} {...props}>
        <span className="crfrsr-field__label">{label}</span>
        {children}
        {error ? <span className="crfrsr-field__error">{error}</span> : null}
      </label>
    );
  }
);

Field.displayName = 'Field';
