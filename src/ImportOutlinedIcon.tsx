import * as React from "react";
import type { IconProps } from "./types";

/**
 * ImportOutlinedIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path d="M.55 9.701v-3.3c0-.966.783-1.75 1.75-1.75H3a.45.45 0 1 1 0 .9h-.7a.85.85 0 0 0-.85.85v3.3c0 .47.38.85.85.85h7.4c.47 0 .85-.38.85-.85v-3.3a.85.85 0 0 0-.85-.85H9a.45.45 0 0 1 0-.9h.7c.967 0 1.75.784 1.75 1.75v3.3a1.75 1.75 0 0 1-1.75 1.75H2.3a1.75 1.75 0 0 1-1.75-1.75m5-8.7a.45.45 0 0 1 .9 0v4.786l.71-.824a.45.45 0 1 1 .68.587l-1.5 1.744a.45.45 0 0 1-.68 0L4.16 5.55a.45.45 0 0 1 .68-.587l.71.824z" fill="currentColor"/></g><defs><clipPath id="a"><rect width="12" height="12" rx="2" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M1 12.5V8.8a2.5 2.5 0 0 1 2.5-2.5h1a.5.5 0 0 1 0 1h-1A1.5 1.5 0 0 0 2 8.8v3.7A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V8.8a1.5 1.5 0 0 0-1.5-1.5h-1a.5.5 0 0 1 0-1h1A2.5 2.5 0 0 1 15 8.8v3.7a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5m6.5-11a.5.5 0 0 1 1 0v6.651l1.121-1.303a.5.5 0 0 1 .758.652l-2 2.326a.5.5 0 0 1-.758 0l-2-2.326a.5.5 0 0 1 .758-.652L7.5 8.15z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M1.45 15.799v-5.1A2.75 2.75 0 0 1 4.2 7.95h1.3a.55.55 0 1 1 0 1.1H4.2a1.65 1.65 0 0 0-1.65 1.65v5.1c0 .911.739 1.65 1.65 1.65h11.6a1.65 1.65 0 0 0 1.65-1.65v-5.1a1.65 1.65 0 0 0-1.65-1.65h-1.3a.55.55 0 1 1 0-1.1h1.3a2.75 2.75 0 0 1 2.75 2.75v5.1a2.75 2.75 0 0 1-2.75 2.75H4.2a2.75 2.75 0 0 1-2.75-2.75m8-13.8a.55.55 0 1 1 1.1 0v8.469l1.426-1.727a.55.55 0 0 1 .848.7l-2.4 2.909a.55.55 0 0 1-.848 0l-2.4-2.909a.55.55 0 0 1 .848-.7l1.426 1.727z" fill="currentColor"/>`,
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

const ImportOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

ImportOutlinedIcon.displayName = "ImportOutlinedIcon";

export default ImportOutlinedIcon;
