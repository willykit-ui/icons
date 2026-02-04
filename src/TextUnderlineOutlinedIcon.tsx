import * as React from "react";
import type { IconProps } from "./types";

/**
 * TextUnderlineOutlinedIcon icon component.
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
      __html: `<path d="M10 10.5a.5.5 0 0 1 0 1H2a.5.5 0 0 1 0-1zM1.5 5V1a.5.5 0 0 1 1 0v4c0 1.935 1.565 3.5 3.5 3.5S9.5 6.935 9.5 5V1a.5.5 0 0 1 1 0v4c0 2.488-2.012 4.5-4.5 4.5A4.497 4.497 0 0 1 1.5 5" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M13.5 13.9a.6.6 0 1 1 0 1.2h-11a.6.6 0 1 1 0-1.2zM1.9 7V1.5a.6.6 0 1 1 1.2 0V7c0 2.71 2.19 4.9 4.9 4.9s4.9-2.19 4.9-4.9V1.5a.6.6 0 1 1 1.2 0V7c0 3.372-2.728 6.1-6.1 6.1A6.095 6.095 0 0 1 1.9 7" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M16.5 17.35a.65.65 0 0 1 0 1.3H3a.65.65 0 0 1 0-1.3zM2.6 8.75V2a.65.65 0 0 1 1.3 0v6.75c0 3.373 2.727 6.1 6.1 6.1s6.1-2.727 6.1-6.1V2a.65.65 0 0 1 1.3 0v6.75c0 4.09-3.31 7.4-7.4 7.4s-7.4-3.31-7.4-7.4" fill="currentColor"/>`,
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

const TextUnderlineOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

TextUnderlineOutlinedIcon.displayName = "TextUnderlineOutlinedIcon";

export default TextUnderlineOutlinedIcon;
