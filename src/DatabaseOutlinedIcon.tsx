import * as React from "react";
import type { IconProps } from "./types";

/**
 * DatabaseOutlinedIcon icon component.
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
      __html: `<path fill="currentColor" d="M9.5 7.596a4 4 0 0 1-.448.265C8.245 8.265 7.165 8.5 6 8.5s-2.245-.235-3.052-.639a4 4 0 0 1-.448-.265V9c0 .26.225.631.896.967.64.32 1.56.533 2.604.533s1.964-.213 2.604-.533C9.275 9.63 9.5 9.26 9.5 9zm0-3a4 4 0 0 1-.448.265C8.245 5.265 7.165 5.5 6 5.5s-2.245-.235-3.052-.639a4 4 0 0 1-.448-.265V6c0 .26.225.631.896.967.64.32 1.56.533 2.604.533s1.964-.213 2.604-.533C9.275 6.63 9.5 6.26 9.5 6zM9.5 3c0-.26-.225-.631-.896-.967C7.964 1.713 7.044 1.5 6 1.5s-1.964.213-2.604.533C2.725 2.37 2.5 2.74 2.5 3s.225.631.896.967c.64.32 1.56.533 2.604.533s1.964-.213 2.604-.533C9.275 3.63 9.5 3.26 9.5 3m1 6c0 .844-.671 1.473-1.448 1.861-.807.404-1.887.639-3.052.639s-2.245-.235-3.052-.639C2.171 10.473 1.5 9.844 1.5 9V3c0-.844.671-1.473 1.448-1.861C3.755.735 4.835.5 6 .5s2.245.235 3.052.639C9.829 1.527 10.5 2.156 10.5 3z"/>`,
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

const DatabaseOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

DatabaseOutlinedIcon.displayName = "DatabaseOutlinedIcon";

export default DatabaseOutlinedIcon;
