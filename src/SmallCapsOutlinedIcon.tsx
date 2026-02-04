import * as React from "react";
import type { IconProps } from "./types";

/**
 * SmallCapsOutlinedIcon icon component.
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
      __html: `<path d="M17.35 10.571v-.37q-.008-.01-.024-.02a.8.8 0 0 0-.412-.102H14.08v7.272h1.065a.65.65 0 0 1 0 1.3h-3.43a.65.65 0 0 1 0-1.3h1.065v-7.272h-1.635a.65.65 0 0 1 0-1.3h5.77c.408 0 .807.106 1.124.314.312.204.612.561.612 1.048v.43a.65.65 0 0 1-1.3 0m-2.286-6.285V3.26c0-.223-.27-.609-.876-.609H9.506v11.843h1.064a.65.65 0 1 1 0 1.3H6a.65.65 0 0 1 0-1.3h2.207V2.65h-4.68c-.606 0-.877.386-.877.609v1.027a.65.65 0 0 1-1.3 0V3.26c0-1.165 1.099-1.91 2.176-1.91h10.662c1.077 0 2.176.745 2.176 1.91v1.027a.65.65 0 0 1-1.3 0" fill="currentColor"/>`,
    },
    viewBox: "0 0 20 20",
  },

  medium: { content: { __html: "" }, viewBox: "0 0 16 16" },

  large: { content: { __html: "" }, viewBox: "0 0 16 16" },
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

const SmallCapsOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

SmallCapsOutlinedIcon.displayName = "SmallCapsOutlinedIcon";

export default SmallCapsOutlinedIcon;
