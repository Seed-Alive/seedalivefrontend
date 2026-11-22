/* Made by tools/gen-tokens.mjs from design/tokens.json. Do not edit. */

export const colorTokens = [
  "primary",
  "primary-hover",
  "on-primary",
  "bg",
  "surface",
  "surface-2",
  "line",
  "ink",
  "text-2",
  "muted",
  "secondary",
  "secondary-strong",
  "secondary-soft",
  "secondary-ink",
  "on-secondary",
  "hero",
  "accent",
  "accent-soft",
  "accent-ink",
  "on-accent",
  "warm",
  "gold",
  "gold-soft",
  "gold-ink",
  "danger",
  "danger-soft",
  "info-soft",
  "info-ink"
] as const;
export type ColorToken = (typeof colorTokens)[number];

export const textStyles = [
  "display-56",
  "heading-h1-30",
  "heading-screen-24",
  "heading-h2-20",
  "heading-h3-18",
  "heading-card-16",
  "body-large-16",
  "body-default-15",
  "body-small-14",
  "label-default-15",
  "label-small-13",
  "label-button-16",
  "caption-12",
  "overline-12",
  "scripture-18"
] as const;
export type TextStyle = (typeof textStyles)[number];

export const space = [4,8,12,16,20,24,32,48] as const;
export type Space = (typeof space)[number];

export const radii = [
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "full"
] as const;
export type Radius = (typeof radii)[number];

// The Tailwind classes for one type style: size, weight and family together.
export const textClass: Record<TextStyle, string> = {
  "display-56": "text-display-56 font-sans",
  "heading-h1-30": "text-heading-h1-30 font-sans",
  "heading-screen-24": "text-heading-screen-24 font-sans",
  "heading-h2-20": "text-heading-h2-20 font-sans",
  "heading-h3-18": "text-heading-h3-18 font-sans",
  "heading-card-16": "text-heading-card-16 font-sans",
  "body-large-16": "text-body-large-16 font-sans",
  "body-default-15": "text-body-default-15 font-sans",
  "body-small-14": "text-body-small-14 font-sans",
  "label-default-15": "text-label-default-15 font-sans",
  "label-small-13": "text-label-small-13 font-sans",
  "label-button-16": "text-label-button-16 font-sans",
  "caption-12": "text-caption-12 font-sans",
  "overline-12": "text-overline-12 font-sans",
  "scripture-18": "text-scripture-18 font-serif",
};

// Size and weight only, for when the family is set separately.
export const textSizeClass: Record<TextStyle, string> = {
  "display-56": "text-display-56",
  "heading-h1-30": "text-heading-h1-30",
  "heading-screen-24": "text-heading-screen-24",
  "heading-h2-20": "text-heading-h2-20",
  "heading-h3-18": "text-heading-h3-18",
  "heading-card-16": "text-heading-card-16",
  "body-large-16": "text-body-large-16",
  "body-default-15": "text-body-default-15",
  "body-small-14": "text-body-small-14",
  "label-default-15": "text-label-default-15",
  "label-small-13": "text-label-small-13",
  "label-button-16": "text-label-button-16",
  "caption-12": "text-caption-12",
  "overline-12": "text-overline-12",
  "scripture-18": "text-scripture-18",
};

// The family a type style is drawn in.
export const textFontClass: Record<TextStyle, string> = {
  "display-56": "font-sans",
  "heading-h1-30": "font-sans",
  "heading-screen-24": "font-sans",
  "heading-h2-20": "font-sans",
  "heading-h3-18": "font-sans",
  "heading-card-16": "font-sans",
  "body-large-16": "font-sans",
  "body-default-15": "font-sans",
  "body-small-14": "font-sans",
  "label-default-15": "font-sans",
  "label-small-13": "font-sans",
  "label-button-16": "font-sans",
  "caption-12": "font-sans",
  "overline-12": "font-sans",
  "scripture-18": "font-serif",
};

// The Tailwind class that paints text in one colour token.
export const textColorClass: Record<ColorToken, string> = {
  "primary": "text-primary",
  "primary-hover": "text-primary-hover",
  "on-primary": "text-on-primary",
  "bg": "text-bg",
  "surface": "text-surface",
  "surface-2": "text-surface-2",
  "line": "text-line",
  "ink": "text-ink",
  "text-2": "text-text-2",
  "muted": "text-muted",
  "secondary": "text-secondary",
  "secondary-strong": "text-secondary-strong",
  "secondary-soft": "text-secondary-soft",
  "secondary-ink": "text-secondary-ink",
  "on-secondary": "text-on-secondary",
  "hero": "text-hero",
  "accent": "text-accent",
  "accent-soft": "text-accent-soft",
  "accent-ink": "text-accent-ink",
  "on-accent": "text-on-accent",
  "warm": "text-warm",
  "gold": "text-gold",
  "gold-soft": "text-gold-soft",
  "gold-ink": "text-gold-ink",
  "danger": "text-danger",
  "danger-soft": "text-danger-soft",
  "info-soft": "text-info-soft",
  "info-ink": "text-info-ink",
};

// Writes a colour as a CSS variable, such as var(--color-accent).
export const color = (token: ColorToken) => `var(--color-${token})`;
export const radius = (r: Radius) => `var(--radius-${r})`;
export const spacing = (s: Space) => `var(--space-${s})`;
