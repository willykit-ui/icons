import * as React from "react";
import type { IconProps } from "./types";

/**
 * DownloadDownOutlinedIcon icon component.
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
      __html: `<path d="M9.75 10a.5.5 0 0 1 0 1h-7.5a.5.5 0 0 1 0-1zM5.5 1.5a.5.5 0 0 1 1 0v4.84l1.032-.97a.5.5 0 0 1 .686.727L6.343 7.864a.5.5 0 0 1-.686 0L3.782 6.097a.5.5 0 1 1 .686-.728l1.032.972z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<g clipPath="url(#a)"><path d="M14.5 13.95a.55.55 0 1 1 0 1.099h-13a.55.55 0 1 1 0-1.1zM7.45 1.498a.55.55 0 1 1 1.1 0v8.583l2.245-2.454a.55.55 0 1 1 .811.742l-3.2 3.5a.55.55 0 0 1-.812 0l-3.2-3.5a.55.55 0 0 1 .812-.742l2.244 2.454z" fill="currentColor"/></g><defs><clipPath id="a"><path d="M0 0h16v16H0z" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M18 16.9a.6.6 0 1 1 0 1.2H2a.6.6 0 1 1 0-1.2zM9.292 2.5a.6.6 0 1 1 1.2 0v10.512l2.86-2.967a.6.6 0 0 1 .864.833l-3.892 4.038a.6.6 0 0 1-.864 0l-3.892-4.038a.6.6 0 0 1 .864-.833l2.86 2.968z" fill="currentColor"/>`,
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

const DownloadDownOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

DownloadDownOutlinedIcon.displayName = "DownloadDownOutlinedIcon";

export default DownloadDownOutlinedIcon;
