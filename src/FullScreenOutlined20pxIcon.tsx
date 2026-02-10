import * as React from "react";
import type { IconProps } from "./types";

/**
 * FullScreenOutlined20pxIcon icon component.
 * @description Supports sizes: small (12px), medium (16px, default), large (20px).
 * Automatically falls back to the closest available size if exact one is missing.
 *
 * @param fontSize - Icon size preset or custom pixel value
 * @param color - Icon color (supports CSS colors, variables, and 'currentColor')
 * @param ...props - All other SVG element props
 */

const svgChildren = {
  small: { content: { __html: "" }, viewBox: "0 0 16 16" },

  medium: { content: { __html: "" }, viewBox: "0 0 16 16" },

  large: {
    content: {
      __html: `<path d="M7.146 12.147a.5.5 0 0 1 .708.707l-3.73 3.729H6.25a.5.5 0 0 1 0 1H2.917a.5.5 0 0 1-.5-.5V13.75a.5.5 0 0 1 1 0v2.126zm5-.001a.5.5 0 0 1 .706 0l3.731 3.729v-1.992a.5.5 0 0 1 1 0v3.199a.5.5 0 0 1-.5.5h-3.334a.5.5 0 0 1 0-1h2.127l-3.73-3.73a.5.5 0 0 1 0-.707m4.937-9.728a.5.5 0 0 1 .5.5V6.25a.5.5 0 0 1-1 0V4.124l-3.73 3.73a.5.5 0 0 1-.707-.708l3.73-3.729H13.75a.5.5 0 0 1 0-1zM6.251 2.416a.5.5 0 0 1 0 1H4.124l3.73 3.73a.5.5 0 0 1-.707.707l-3.73-3.73V6.25a.5.5 0 1 1-1 0V2.916a.5.5 0 0 1 .5-.5z" fill="currentColor"/>`,
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

const FullScreenOutlined20pxIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

FullScreenOutlined20pxIcon.displayName = "FullScreenOutlined20pxIcon";

export default FullScreenOutlined20pxIcon;
