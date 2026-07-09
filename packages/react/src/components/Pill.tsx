import * as React from 'react';
import { cn } from '../lib/cn';

export type PillSize = 'default' | 'small' | 'icon';

export interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: PillSize;
  /** Background color. Consumers pass a category color; CSS handles the rest. */
  color?: string;
  /** Background color on hover. When set, the pill becomes hoverable (CSS-driven,
   *  no JS color swap needed). */
  hoverColor?: string;
  /** Optional leading glyph slot (rendered before the label). */
  glyph?: React.ReactNode;
  /** Uppercase the label (default true). Glyph is never transformed. */
  uppercase?: boolean;
}

/**
 * Generic pill / tag / badge. App-specific data (category colors, glyphs, exact
 * font sizes) is supplied by the consumer via props and `className`; the library
 * only owns the shape, sizing scale, and hover behavior.
 */
export const Pill = React.forwardRef<HTMLSpanElement, PillProps>(
  (
    { size = 'default', color, hoverColor, glyph, uppercase = true, className, style, children, ...props },
    ref
  ) => {
    const pillVars: React.CSSProperties = {
      ...(color != null ? ({ '--crfrsr-pill-bg': color } as React.CSSProperties) : {}),
      ...(hoverColor != null
        ? ({ '--crfrsr-pill-bg-hover': hoverColor } as React.CSSProperties)
        : {}),
    };

    return (
      <span
        ref={ref}
        className={cn(
          'crfrsr-pill',
          `crfrsr-pill--${size}`,
          uppercase && 'crfrsr-pill--uppercase',
          hoverColor != null && 'crfrsr-pill--hoverable',
          className
        )}
        style={{ ...pillVars, ...style }}
        {...props}
      >
        {glyph != null && <span className="crfrsr-pill__glyph">{glyph}</span>}
        {children != null && <span className="crfrsr-pill__label">{children}</span>}
      </span>
    );
  }
);

Pill.displayName = 'Pill';
