import * as React from "react";
import type { IconProps } from "./types";

/**
 * CopyOutlinedIcon icon component.
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
      __html: `<path d="M10.05 4.54c0-.602-.487-1.089-1.088-1.089H5.038c-.6 0-1.088.487-1.088 1.088v4.924c0 .6.487 1.088 1.088 1.088h3.924c.6 0 1.088-.487 1.088-1.088zm-2-2c0-.602-.487-1.089-1.088-1.089H3.038c-.6 0-1.088.487-1.088 1.088v4.924c0 .6.487 1.088 1.088 1.088h.012V4.539c0-1.098.89-1.988 1.988-1.988H8.05zm.9.01h.012a1.99 1.99 0 0 1 1.988 1.99v4.923c0 1.098-.89 1.988-1.988 1.988H5.038A1.99 1.99 0 0 1 3.05 9.463V9.45h-.012A1.99 1.99 0 0 1 1.05 7.463V2.539c0-1.098.89-1.988 1.988-1.988h3.924c1.098 0 1.988.89 1.988 1.988z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M13 5.5A1.5 1.5 0 0 0 11.5 4h-5A1.5 1.5 0 0 0 5 5.5v7A1.5 1.5 0 0 0 6.5 14h5a1.5 1.5 0 0 0 1.5-1.5zm1 7a2.5 2.5 0 0 1-2.5 2.5h-5A2.5 2.5 0 0 1 4 12.5v-.55A2.5 2.5 0 0 1 2 9.5v-6A2.5 2.5 0 0 1 4.5 1h5c1.225 0 2.241.88 2.456 2.043A2.5 2.5 0 0 1 14 5.5zm-11-3c0 .653.418 1.206 1 1.412V5.5A2.5 2.5 0 0 1 6.5 3h4.413A1.5 1.5 0 0 0 9.5 2h-5A1.5 1.5 0 0 0 3 3.5z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M16.45 7.299a1.75 1.75 0 0 0-1.75-1.75H8.3a1.75 1.75 0 0 0-1.75 1.75v8.4c0 .967.784 1.75 1.75 1.75h6.4a1.75 1.75 0 0 0 1.75-1.75zm-3-3a1.75 1.75 0 0 0-1.75-1.75H5.3a1.75 1.75 0 0 0-1.75 1.75v8.4c0 .967.784 1.75 1.75 1.75h.15V7.3A2.85 2.85 0 0 1 8.3 4.45h5.15zm1.1.15h.15a2.85 2.85 0 0 1 2.85 2.85v8.4a2.85 2.85 0 0 1-2.85 2.85H8.3a2.85 2.85 0 0 1-2.85-2.85v-.151H5.3A2.85 2.85 0 0 1 2.45 12.7V4.3A2.85 2.85 0 0 1 5.3 1.45h6.4a2.85 2.85 0 0 1 2.85 2.85z" fill="currentColor"/>`,
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

const CopyOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

CopyOutlinedIcon.displayName = "CopyOutlinedIcon";

export default CopyOutlinedIcon;
