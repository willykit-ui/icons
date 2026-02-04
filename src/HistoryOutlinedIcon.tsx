import * as React from "react";
import type { IconProps } from "./types";

/**
 * HistoryOutlinedIcon icon component.
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
      __html: `<g clipPath="url(#a)"><rect width="12" height="12" rx="2" fill="currentColor"/><path d="M2.188 2.072C4.314.009 7.72.049 9.836 2.165c2.135 2.135 2.157 5.585.035 7.707s-5.572 2.1-7.707-.035a5.49 5.49 0 0 1-1.563-4.63.45.45 0 0 1 .891.123A4.59 4.59 0 0 0 2.801 9.2c1.79 1.79 4.67 1.8 6.434.036S10.99 4.59 9.2 2.8c-1.77-1.768-4.605-1.798-6.374-.094l.333.002a.45.45 0 0 1-.004.9l-1.414-.007a.45.45 0 0 1-.448-.448l-.007-1.414a.45.45 0 0 1 .9-.005zm3.362 1.93a.45.45 0 0 1 .9 0v1.814l1.118 1.118a.45.45 0 0 1-.636.637L5.55 6.189z" fill="currentColor"/></g><defs><clipPath id="a"><rect width="12" height="12" rx="2" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<g clipPath="url(#a)"><rect width="16" height="16" rx="2" fill="currentColor"/><path d="M3.027 4.027c2.724-2.724 7.156-2.697 9.9.046 2.742 2.743 2.77 7.176.045 9.9s-7.156 2.697-9.9-.046A7.04 7.04 0 0 1 1.066 7.98a.5.5 0 1 1 .99.136A6.05 6.05 0 0 0 3.78 13.22c2.359 2.359 6.158 2.373 8.485.046s2.313-6.126-.046-8.486C9.86 2.421 6.061 2.407 3.734 4.734l-.067.067.64.004a.5.5 0 1 1-.006 1l-1.838-.01a.5.5 0 0 1-.498-.497l-.008-1.839a.5.5 0 0 1 1-.005l.002.64zM7.5 6.336a.5.5 0 0 1 1 0v2.459l1.52 1.52a.5.5 0 0 1-.707.708L7.5 9.21z" fill="currentColor"/></g><defs><clipPath id="a"><rect width="16" height="16" rx="2" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<rect width="20" height="20" rx="2" fill="currentColor"/><path d="M3.926 3.925c3.327-3.327 8.74-3.294 12.092.057 3.35 3.35 3.383 8.765.056 12.092s-8.74 3.294-12.092-.057A8.6 8.6 0 0 1 1.53 8.754a.55.55 0 0 1 1.09.15 7.5 7.5 0 0 0 2.142 6.335c2.928 2.928 7.645 2.946 10.535.056s2.872-7.606-.057-10.535-7.645-2.946-10.535-.056l-.193.192.944.005A.55.55 0 0 1 5.45 6l-2.263-.01a.55.55 0 0 1-.548-.547L2.628 3.18a.55.55 0 0 1 1.1-.006l.004.944zM9.45 6.891a.55.55 0 0 1 1.1 0v2.884l1.783 1.783a.55.55 0 1 1-.777.777L9.45 10.23z" fill="currentColor"/>`,
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

const HistoryOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

HistoryOutlinedIcon.displayName = "HistoryOutlinedIcon";

export default HistoryOutlinedIcon;
