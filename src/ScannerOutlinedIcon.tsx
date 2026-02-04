import * as React from "react";
import type { IconProps } from "./types";

/**
 * ScannerOutlinedIcon icon component.
 * @description Supports sizes: small (12px), medium (16px, default), large (20px).
 * Automatically falls back to the closest available size if exact one is missing.
 *
 * @param fontSize - Icon size preset or custom pixel value
 * @param color - Icon color (supports CSS colors, variables, and 'currentColor')
 * @param ...props - All other SVG element props
 */

const svgChildren = {
  small: {
    content: {
      __html: `<g clipPath="url(#a)"><path d="M.55 9.701v-2.45a.45.45 0 0 1 .9 0v2.45c0 .47.38.85.85.85h2.45a.45.45 0 0 1 0 .9H2.3a1.75 1.75 0 0 1-1.75-1.75m10 0v-2.45a.45.45 0 0 1 .9 0v2.45a1.75 1.75 0 0 1-1.75 1.75H7.25a.45.45 0 0 1 0-.9H9.7c.47 0 .85-.38.85-.85m.45-4.15a.45.45 0 0 1 0 .9H1a.45.45 0 0 1 0-.9zM.55 4.75V2.3c0-.967.783-1.75 1.75-1.75h2.45a.45.45 0 0 1 0 .9H2.3a.85.85 0 0 0-.85.85v2.45a.45.45 0 0 1-.9 0m10 0V2.3a.85.85 0 0 0-.85-.85H7.25a.45.45 0 0 1 0-.9H9.7c.966 0 1.75.783 1.75 1.75v2.45a.45.45 0 0 1-.9 0" fill="currentColor"/></g><defs><clipPath id="a"><rect width="12" height="12" rx="2" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M1 12.5V9.625a.5.5 0 0 1 1 0V12.5A1.5 1.5 0 0 0 3.5 14h2.875a.5.5 0 0 1 0 1H3.5A2.5 2.5 0 0 1 1 12.5m13 0V9.625a.5.5 0 0 1 1 0V12.5a2.5 2.5 0 0 1-2.5 2.5H9.625a.5.5 0 0 1 0-1H12.5a1.5 1.5 0 0 0 1.5-1.5m.5-5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1zM1 6.375V3.5A2.5 2.5 0 0 1 3.5 1h2.875a.5.5 0 0 1 0 1H3.5A1.5 1.5 0 0 0 2 3.5v2.875a.5.5 0 0 1-1 0m13 0V3.5A1.5 1.5 0 0 0 12.5 2H9.625a.5.5 0 0 1 0-1H12.5A2.5 2.5 0 0 1 15 3.5v2.875a.5.5 0 0 1-1 0" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M1.45 15.7v-3.701a.55.55 0 1 1 1.1 0v3.7c0 .967.783 1.75 1.75 1.75H8a.55.55 0 1 1 0 1.1H4.3a2.85 2.85 0 0 1-2.85-2.85m16 0v-3.701a.55.55 0 1 1 1.1 0v3.7a2.85 2.85 0 0 1-2.85 2.85H12a.55.55 0 1 1 0-1.1h3.7a1.75 1.75 0 0 0 1.75-1.75M18 9.45a.55.55 0 1 1 0 1.099H2a.55.55 0 1 1 0-1.1zM1.45 7.998v-3.7a2.85 2.85 0 0 1 2.85-2.85H8a.55.55 0 1 1 0 1.1H4.3a1.75 1.75 0 0 0-1.75 1.75v3.7a.55.55 0 1 1-1.1 0m16 0v-3.7a1.75 1.75 0 0 0-1.75-1.75H12a.55.55 0 1 1 0-1.1h3.7a2.85 2.85 0 0 1 2.85 2.85v3.7a.55.55 0 1 1-1.1 0" fill="currentColor"/>`,
    },
    viewBox: "0 0 20 20",
  },
};

const sizeToPixel = {
  small: 12,
  medium: 16,
  large: 20,
};

type SizeKey = keyof typeof svgChildren;

function pickClosestSvg(fontSize: "small" | "medium" | "large" | number) {
  const available = Object.entries(svgChildren).filter(
    ([, data]) => data && data.content.__html,
  ) as [SizeKey, (typeof svgChildren)[SizeKey]][];

  if (available.length === 0) {
    return { content: { __html: "" }, viewBox: "0 0 16 16" };
  }

  if (typeof fontSize === "string") {
    const found = available.find(([key]) => key === fontSize);
    if (found) return found[1];
  }

  if (typeof fontSize === "number") {
    return available.reduce((best, curr) => {
      const [bestKey] = best;
      const [currKey] = curr;
      const bestDiff = Math.abs(
        sizeToPixel[bestKey as keyof typeof sizeToPixel] - fontSize,
      );
      const currDiff = Math.abs(
        sizeToPixel[currKey as keyof typeof sizeToPixel] - fontSize,
      );
      return currDiff < bestDiff ? curr : best;
    })[1];
  }

  // Fallback to medium, then first available
  const medium = available.find(([key]) => key === "medium");
  return medium ? medium[1] : available[0][1];
}

const ScannerOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const {
      fontSize = "medium",
      color = "currentColor",
      style,
      ...other
    } = props;

    const selected = pickClosestSvg(fontSize);
    const viewBox = selected.viewBox;

    const sizeValue =
      typeof fontSize === "number"
        ? fontSize
        : sizeToPixel[fontSize as keyof typeof sizeToPixel] || 16;

    const finalStyle = {
      ...style,
      color,
    } as React.CSSProperties;

    return (
      <svg
        ref={ref}
        width={sizeValue}
        height={sizeValue}
        viewBox={viewBox}
        fill="none"
        style={finalStyle}
        xmlns="http://www.w3.org/2000/svg"
        {...other}
      >
        {selected.content.__html && (
          <g dangerouslySetInnerHTML={selected.content} />
        )}
      </svg>
    );
  },
);

ScannerOutlinedIcon.displayName = "ScannerOutlinedIcon";

export default ScannerOutlinedIcon;
