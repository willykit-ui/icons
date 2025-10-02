import * as React from "react";

export interface IconProps extends React.SVGAttributes<SVGElement> {
  /**
   * Size of the icon. Can be a preset size or custom pixel value.
   * @default 'medium'
   */
  children?: never;
  fontSize?: "small" | "medium" | "large" | number;

  /**
   * Color of the icon. Supports CSS colors, CSS variables, and 'currentColor'.
   * @default 'currentColor'
   */
  color?: string;
}
