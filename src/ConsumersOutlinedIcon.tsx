import * as React from "react";
import type { IconProps } from "./types";

/**
 * ConsumersOutlinedIcon icon component.
 *
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
      __html: `<g clipPath="url(#a)"><path fill="currentColor" d="M2.5 10a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0m8 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0m-5-6.5a2 2 0 1 0-4 0 2 2 0 0 0 4 0m5-1.5a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0m1 0a1.5 1.5 0 0 1-2.596 1.022l-2.406.4.002.078c0 .636-.2 1.224-.537 1.709l3.391 3.438a1.5 1.5 0 1 1-.707.706l-.002-.001-3.383-3.428a3 3 0 0 1-1.394.553L3.05 8.93a1.5 1.5 0 1 1-.913-.423l.694-2.084A3 3 0 1 1 6.305 2.44l2.198-.366L8.5 2a1.5 1.5 0 1 1 3 0"/></g><defs><clipPath id="a"><path fill="currentColor" d="M0 0h12v12H0z"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
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

const ConsumersOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

ConsumersOutlinedIcon.displayName = "ConsumersOutlinedIcon";

export default ConsumersOutlinedIcon;
