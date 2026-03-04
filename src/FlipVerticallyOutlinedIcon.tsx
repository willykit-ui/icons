import * as React from "react";
import type { IconProps } from "./types";

/**
 * FlipVerticallyOutlinedIcon icon component.
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
      __html: `<path d="M6 8.926a.45.45 0 0 1 .45.45v1.125a.45.45 0 0 1-.9 0V9.376a.45.45 0 0 1 .45-.45" fill="currentColor"/><path fillRule="evenodd" d="m5 6.001-4 3v-6zm-3.1 1.2L3.5 6 1.9 4.8zm9.1 1.8-4-3 4-3zm-2.5-3 1.6 1.2v-2.4z" clipRule="evenodd" fill="currentColor"/><path d="M6 4.426a.45.45 0 0 1 .45.45v2.25a.45.45 0 0 1-.9 0v-2.25a.45.45 0 0 1 .45-.45M6 1.05a.45.45 0 0 1 .45.451v1.125a.45.45 0 0 1-.9 0V1.501a.45.45 0 0 1 .45-.45" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M8 11.625a.5.5 0 0 1 .5.5V13.5a.5.5 0 0 1-1 0v-1.375a.5.5 0 0 1 .5-.5" fill="currentColor"/><path fillRule="evenodd" d="m6 8-4 4V4zM3 9.586 4.586 8 3 6.414zM14 12l-4-4 4-4zm-2.586-4L13 9.586V6.414z" clipRule="evenodd" fill="currentColor"/><path d="M8 6.125a.5.5 0 0 1 .5.5v2.75a.5.5 0 0 1-1 0v-2.75a.5.5 0 0 1 .5-.5M8 2a.5.5 0 0 1 .5.5v1.375a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 8 2" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M10 15.7a.55.55 0 0 1 .55.549v1.25a.55.55 0 1 1-1.1 0v-1.25a.55.55 0 0 1 .55-.55" fill="currentColor"/><path fillRule="evenodd" d="m8 9.999-6 5v-10zM3.1 12.65 6.282 10 3.1 7.347zM18 14.999l-6-5 6-5zm-4.282-5 3.182 2.652V7.348z" clipRule="evenodd" fill="currentColor"/><path d="M10 10.7a.55.55 0 0 1 .55.549v2.5a.55.55 0 1 1-1.1 0v-2.5a.55.55 0 0 1 .55-.55M10 5.7a.55.55 0 0 1 .55.549v2.5a.55.55 0 1 1-1.1 0v-2.5a.55.55 0 0 1 .55-.55m0-3.749a.55.55 0 0 1 .55.549v1.25a.55.55 0 1 1-1.1 0v-1.25a.55.55 0 0 1 .55-.55" fill="currentColor"/>`,
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

const FlipVerticallyOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

FlipVerticallyOutlinedIcon.displayName = "FlipVerticallyOutlinedIcon";

export default FlipVerticallyOutlinedIcon;
