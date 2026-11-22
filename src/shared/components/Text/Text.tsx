import type { ReactNode } from 'react';
import { textColorClass, textFontClass, textSizeClass } from '@shared/styles/tokens';
import type { ColorToken, TextStyle } from '@shared/styles/tokens';

type TextElement = 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'label' | 'strong';

const ALIGN = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
} as const;

const FONT = {
  sans: 'font-sans',
  serif: 'font-serif',
} as const;

const CLAMP = {
  1: 'line-clamp-1',
  2: 'line-clamp-2',
  3: 'line-clamp-3',
  4: 'line-clamp-4',
  5: 'line-clamp-5',
  6: 'line-clamp-6',
} as const;

export interface TextProps {
  // Which type style to use, such as heading-screen-24.
  variant?: TextStyle | undefined;
  as?: TextElement | undefined;
  color?: ColorToken | undefined;
  align?: keyof typeof ALIGN | undefined;
  // Overrides the style's font, for serif headings the scale has no token for.
  font?: keyof typeof FONT | undefined;
  // Cut the text off after this many lines.
  clamp?: keyof typeof CLAMP | undefined;
  className?: string | undefined;
  children: ReactNode;
}

// Renders text in one of the design's type styles.
export function Text({
  variant = 'body-default-15',
  as: Tag = 'p',
  color,
  align,
  font,
  clamp,
  className,
  children,
}: TextProps) {
  const classes = [
    textSizeClass[variant],
    font ? FONT[font] : textFontClass[variant],
    color ? textColorClass[color] : undefined,
    align ? ALIGN[align] : undefined,
    clamp ? CLAMP[clamp] : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <Tag className={classes}>{children}</Tag>;
}
