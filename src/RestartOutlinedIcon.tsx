import * as React from "react";
import type { IconProps } from "./types";

/**
 * RestartOutlinedIcon icon component.
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
      __html: `<path fill="currentColor" d="M8.483 2.25a.5.5 0 0 1 1 0v2.036a.5.5 0 0 1-.5.5H6.994a.5.5 0 0 1 0-1h.66a3.186 3.186 0 0 0-3.948.51 3.404 3.404 0 0 0 0 4.73 3.19 3.19 0 0 0 4.588 0 3.38 3.38 0 0 0 .948-2.597l-.017-.187-.002-.101a.5.5 0 0 1 .971-.119l.023.1.023.24a4.38 4.38 0 0 1-1.23 3.363 4.19 4.19 0 0 1-6.02 0 4.404 4.404 0 0 1 0-6.127 4.19 4.19 0 0 1 5.493-.458z"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path fill="currentColor" d="M11.478 2a.5.5 0 1 1 1 0v2.715a.5.5 0 0 1-.5.5H9.325a.5.5 0 0 1 0-1h1.408a4.414 4.414 0 0 0-5.912.396c-1.763 1.805-1.763 4.736 0 6.54a4.42 4.42 0 0 0 6.356 0 4.68 4.68 0 0 0 1.311-3.59l-.024-.258-.002-.102a.5.5 0 0 1 .972-.119l.022.1.03.31a5.68 5.68 0 0 1-1.594 4.359 5.42 5.42 0 0 1-7.787 0c-2.142-2.193-2.142-5.745 0-7.938a5.417 5.417 0 0 1 7.371-.386z"/>`,
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

const RestartOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

RestartOutlinedIcon.displayName = "RestartOutlinedIcon";

export default RestartOutlinedIcon;
