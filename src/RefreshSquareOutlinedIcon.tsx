import * as React from "react";
import type { IconProps } from "./types";

/**
 * RefreshSquareOutlinedIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path d="M11.05 3.001A2.05 2.05 0 0 0 9 .951H3a2.05 2.05 0 0 0-2.05 2.05v6A2.05 2.05 0 0 0 3 11.051h6A2.05 2.05 0 0 0 11.05 9zM3.91 4.018a2.905 2.905 0 0 1 3.63-.44V3.2a.45.45 0 1 1 .898 0v1.36a.45.45 0 0 1-.45.449H6.663a.45.45 0 0 1-.09-.892 2.01 2.01 0 0 0-2.02.53 2.153 2.153 0 0 0 0 2.99 2.01 2.01 0 0 0 2.893 0 2.14 2.14 0 0 0 .588-1.76.45.45 0 1 1 .893-.108 3.04 3.04 0 0 1-.837 2.498 2.91 2.91 0 0 1-4.18 0 3.05 3.05 0 0 1 0-4.248M11.95 9A2.95 2.95 0 0 1 9 11.951H3a2.95 2.95 0 0 1-2.95-2.95v-6A2.95 2.95 0 0 1 3 .051h6A2.95 2.95 0 0 1 11.95 3z" fill="currentColor"/></g><defs><clipPath id="a"><rect width="12" height="12" rx="2" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<g clipPath="url(#a)"><path d="M14.5 4A2.5 2.5 0 0 0 12 1.5H4A2.5 2.5 0 0 0 1.5 4v8A2.5 2.5 0 0 0 4 14.5h8a2.5 2.5 0 0 0 2.5-2.5zm-4.376.3a.5.5 0 0 1 1 0v1.802a.5.5 0 0 1-.5.5h-1.75a.5.5 0 0 1 0-1h.353a2.73 2.73 0 0 0-3.203.547 2.97 2.97 0 0 0 0 4.108 2.734 2.734 0 0 0 3.95 0 2.95 2.95 0 0 0 .803-2.418.5.5 0 1 1 .993-.12 3.95 3.95 0 0 1-1.079 3.234 3.733 3.733 0 0 1-5.383 0 3.967 3.967 0 0 1 0-5.5 3.73 3.73 0 0 1 4.816-.481zM15.5 12a3.5 3.5 0 0 1-3.5 3.5H4A3.5 3.5 0 0 1 .5 12V4A3.5 3.5 0 0 1 4 .5h8A3.5 3.5 0 0 1 15.5 4z" fill="currentColor"/></g><defs><clipPath id="a"><rect width="16" height="16" rx="2" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<g clipPath="url(#a)"><path d="M17.95 4.999A2.95 2.95 0 0 0 15 2.049H5a2.95 2.95 0 0 0-2.95 2.95v10A2.95 2.95 0 0 0 5 17.949h10A2.95 2.95 0 0 0 17.95 15zm-5.158.4a.55.55 0 1 1 1.1 0v2.27a.55.55 0 0 1-.55.55h-2.228a.55.55 0 0 1 0-1.1h.766a3.59 3.59 0 0 0-4.456.557 3.79 3.79 0 0 0 0 5.284 3.594 3.594 0 0 0 5.154 0c.83-.846 1.18-2 1.044-3.11a.55.55 0 0 1 1.092-.134 4.88 4.88 0 0 1-1.35 4.015 4.694 4.694 0 0 1-6.725 0 4.89 4.89 0 0 1 0-6.825 4.69 4.69 0 0 1 6.153-.497zM19.05 15A4.05 4.05 0 0 1 15 19.05H5A4.05 4.05 0 0 1 .95 15V5A4.05 4.05 0 0 1 5 .949h10A4.05 4.05 0 0 1 19.05 5z" fill="currentColor"/></g><defs><clipPath id="a"><rect width="20" height="20" rx="2" fill="currentColor"/></clipPath></defs>`,
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

const RefreshSquareOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

RefreshSquareOutlinedIcon.displayName = "RefreshSquareOutlinedIcon";

export default RefreshSquareOutlinedIcon;
