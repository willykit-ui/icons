import * as React from "react";
import type { IconProps } from "./types";

/**
 * CornerOutlinedIcon icon component.
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
      __html: `<path fillRule="evenodd" d="M1.5 1a.5.5 0 0 1 .5.5v3.022a6 6 0 0 1 3.742 1.736A6 6 0 0 1 7.478 10H10.5a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5m.5 9h4.475A5 5 0 0 0 2 5.525z" clipRule="evenodd" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path fillRule="evenodd" d="M2.5 2a.5.5 0 0 1 .5.5v3.018a8 8 0 0 1 5.157 2.325A8 8 0 0 1 10.482 13H13.5a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5M3 13h6.48a7 7 0 0 0-2.03-4.45A7 7 0 0 0 3 6.52z" clipRule="evenodd" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path fillRule="evenodd" d="M2.5 2a.5.5 0 0 1 .5.5v6.015a9 9 0 0 1 7.815 5.54c.388.938.614 1.934.67 2.945H17.5a.5.5 0 0 1 0 1h-15a.5.5 0 0 1-.5-.5v-15a.5.5 0 0 1 .5-.5M3 17h7.482a8 8 0 0 0-2.325-5.157A8 8 0 0 0 3 9.518z" clipRule="evenodd" fill="currentColor"/>`,
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

const CornerOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

CornerOutlinedIcon.displayName = "CornerOutlinedIcon";

export default CornerOutlinedIcon;
