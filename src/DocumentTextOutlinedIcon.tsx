import * as React from "react";
import type { IconProps } from "./types";

/**
 * DocumentTextOutlinedIcon icon component.
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
      __html: `<path d="M10.05 2.3a.85.85 0 0 0-.85-.849H2.8a.85.85 0 0 0-.85.85v7.4c0 .47.38.85.85.85h6.4c.47 0 .85-.38.85-.85zM6 7.05a.45.45 0 0 1 0 .901H4a.45.45 0 0 1 0-.9zm2-1.5a.45.45 0 0 1 0 .901H4a.45.45 0 0 1 0-.9zm0-1.5a.45.45 0 0 1 0 .901H4a.45.45 0 0 1 0-.9zm2.95 5.651a1.75 1.75 0 0 1-1.75 1.75H2.8a1.75 1.75 0 0 1-1.75-1.75v-7.4c0-.967.783-1.75 1.75-1.75h6.4c.966 0 1.75.783 1.75 1.75z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M13 3.5A1.5 1.5 0 0 0 11.5 2h-7A1.5 1.5 0 0 0 3 3.5v9A1.5 1.5 0 0 0 4.5 14h7a1.5 1.5 0 0 0 1.5-1.5zM8.602 10a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1zm1.8-2.502a.5.5 0 0 1 0 1h-4.8a.5.5 0 0 1 0-1zm0-2.498a.5.5 0 0 1 0 1h-4.8a.5.5 0 0 1 0-1zM14 12.5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 12.5v-9A2.5 2.5 0 0 1 4.5 1h7A2.5 2.5 0 0 1 14 3.5z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M16.45 4.299a1.75 1.75 0 0 0-1.75-1.75H5.3a1.75 1.75 0 0 0-1.75 1.75v11.4c0 .967.783 1.75 1.75 1.75h9.4a1.75 1.75 0 0 0 1.75-1.75zm-5.25 7.65a.55.55 0 1 1 0 1.1H6.6a.55.55 0 1 1 0-1.1zm2.2-2.503a.55.55 0 0 1 0 1.1H6.6a.55.55 0 1 1 0-1.1zm0-2.497a.55.55 0 1 1 0 1.1H6.6a.55.55 0 1 1 0-1.1zm4.15 8.75a2.85 2.85 0 0 1-2.85 2.85H5.3a2.85 2.85 0 0 1-2.85-2.85V4.3A2.85 2.85 0 0 1 5.3 1.45h9.4a2.85 2.85 0 0 1 2.85 2.85z" fill="currentColor"/>`,
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

const DocumentTextOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

DocumentTextOutlinedIcon.displayName = "DocumentTextOutlinedIcon";

export default DocumentTextOutlinedIcon;
