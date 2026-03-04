import * as React from "react";
import type { IconProps } from "./types";

/**
 * FlipHorizontallyOutlinedIcon icon component.
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
      __html: `<path fillRule="evenodd" d="M9 11H3l3-4zm-4.001-1H7L6 8.666z" clipRule="evenodd" fill="currentColor"/><path d="M2.625 5.5a.5.5 0 0 1 0 1H1.5a.5.5 0 0 1 0-1zm4.5 0a.5.5 0 0 1 0 1h-2.25a.5.5 0 0 1 0-1zm3.375 0a.5.5 0 0 1 0 1H9.375a.5.5 0 0 1 0-1z" fill="currentColor"/><path fillRule="evenodd" d="M6 5 3 1h6zm0-1.666L7.001 2H5z" clipRule="evenodd" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path fillRule="evenodd" d="M12 14H4l4-4zm-5.586-1h3.172L8 11.414z" clipRule="evenodd" fill="currentColor"/><path d="M3.875 7.5a.5.5 0 0 1 0 1H2.5a.5.5 0 0 1 0-1zm5.5 0a.5.5 0 0 1 0 1h-2.75a.5.5 0 0 1 0-1zm4.125 0a.5.5 0 0 1 0 1h-1.375a.5.5 0 0 1 0-1z" fill="currentColor"/><path fillRule="evenodd" d="M8 6 4 2h8zm0-1.414L9.586 3H6.414z" clipRule="evenodd" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path fillRule="evenodd" d="M15 18H5l5-6zm-7.864-1h5.728L10 13.563z" clipRule="evenodd" fill="currentColor"/><path d="M3.75 9.5a.5.5 0 0 1 0 1H2.5a.5.5 0 0 1 0-1zm5 0a.5.5 0 0 1 0 1h-2.5a.5.5 0 0 1 0-1zm5 0a.5.5 0 0 1 0 1h-2.5a.5.5 0 0 1 0-1zm3.75 0a.5.5 0 0 1 0 1h-1.25a.5.5 0 0 1 0-1z" fill="currentColor"/><path fillRule="evenodd" d="M10 8 5 2h10zm0-1.563L12.864 3H7.136z" clipRule="evenodd" fill="currentColor"/>`,
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

const FlipHorizontallyOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

FlipHorizontallyOutlinedIcon.displayName = "FlipHorizontallyOutlinedIcon";

export default FlipHorizontallyOutlinedIcon;
