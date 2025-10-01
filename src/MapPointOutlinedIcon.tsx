import * as React from "react";
import type { IconProps } from "./types";

/**
 * MapPointOutlinedIcon icon component.
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
      __html: `<path fill="currentColor" d="M9.498 5.073c0-1.98-1.575-3.571-3.5-3.571-1.924 0-3.5 1.59-3.5 3.571 0 .849.336 1.875.898 2.858.56.978 1.317 1.863 2.1 2.437.168.124.246.179.316.212a.4.4 0 0 0 .187.037.4.4 0 0 0 .187-.037c.069-.033.147-.088.316-.212.782-.574 1.538-1.46 2.098-2.437.562-.983.898-2.01.898-2.858M7 4.998a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3.498.075c0 1.083-.417 2.283-1.03 3.355-.616 1.076-1.46 2.074-2.374 2.746-.145.107-.303.225-.473.306a1.4 1.4 0 0 1-.622.137c-.233 0-.43-.044-.622-.137-.17-.082-.328-.2-.474-.306-.914-.672-1.758-1.67-2.375-2.746-.613-1.072-1.03-2.272-1.03-3.355 0-2.516 2.007-4.571 4.5-4.571 2.494 0 4.5 2.055 4.5 4.571M8 4.998a2 2 0 1 1-4 0 2 2 0 0 1 4 0"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path fill="currentColor" d="M12.831 6.765c0-2.73-2.173-4.93-4.834-4.93-2.66.001-4.833 2.2-4.833 4.93 0 1.214.497 2.672 1.306 4.039.806 1.362 1.89 2.577 2.997 3.321.352.236.4.255.531.255s.18-.019.531-.255c1.107-.744 2.19-1.959 2.996-3.321.809-1.367 1.306-2.824 1.306-4.04m-3.331-.1a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0m4.331.1c0 1.456-.583 3.092-1.444 4.549-.864 1.46-2.043 2.797-3.3 3.641-.321.217-.61.425-1.089.425-.478 0-.767-.208-1.09-.425-1.256-.844-2.434-2.181-3.299-3.642-.862-1.456-1.445-3.092-1.445-4.548 0-3.266 2.603-5.929 5.833-5.93s5.834 2.664 5.834 5.93m-3.331-.1a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>`,
    },
    viewBox: "0 0 16 16",
  },

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

const MapPointOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

MapPointOutlinedIcon.displayName = "MapPointOutlinedIcon";

export default MapPointOutlinedIcon;
