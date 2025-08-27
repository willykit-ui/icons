import * as React from "react";
import type { IconProps } from "./types";

/**
 * LinkOutlinedIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path fill="currentColor" d="M6.624 4.646a.5.5 0 0 1 .629-.063l.078.065.17.191c.79.992.612 2.467-.321 3.403l-2.424 2.434c-.996 1-2.605 1.138-3.587.151-.981-.985-.844-2.595.151-3.594l1.212-1.217a.5.5 0 0 1 .709.706L2.029 7.939c-.678.68-.677 1.656-.152 2.183.523.526 1.492.528 2.17-.152L6.47 7.536c.635-.638.674-1.535.244-2.079l-.092-.104-.065-.078a.5.5 0 0 1 .066-.63m.62-3.322c.996-1 2.604-1.137 3.587-.15.98.984.844 2.595-.151 3.594L9.468 5.985l-.355-.354-.354-.352L9.97 4.062c.678-.68.677-1.657.152-2.184-.523-.525-1.493-.527-2.17.153L5.529 4.464c-.635.638-.674 1.535-.244 2.08l.092.104.064.078a.5.5 0 0 1-.772.627c-.981-.985-.844-2.596.151-3.595zm2.224 4.66a.5.5 0 0 1-.71-.705z"/></g><defs><clipPath id="a"><path fill="currentColor" d="M0 0h12v12H0z"/></clipPath></defs>`,
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

const LinkOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

LinkOutlinedIcon.displayName = "LinkOutlinedIcon";

export default LinkOutlinedIcon;
