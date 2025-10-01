import type { SVGProps } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
  children?: never;
  fontSize?: "small" | "medium" | "large" | number;
  color?: string;
}
