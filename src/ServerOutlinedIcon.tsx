import * as React from "react";
import type { IconProps } from "./types";

/**
 * ServerOutlinedIcon icon component.
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
      __html: `<path fill="currentColor" d="M10.5 8.647c0-.246-.06-.476-.165-.672-.222-.418-.632-.681-1.085-.681h-6.5c-.453 0-.863.263-1.085.68a1.4 1.4 0 0 0-.165.673C1.5 9.422 2.086 10 2.75 10h6.5c.664 0 1.25-.578 1.25-1.353M4.75 9v-.5a.5.5 0 0 1 1 0V9a.5.5 0 0 1-1 0M6 9v-.5a.5.5 0 0 1 1 0V9a.5.5 0 0 1-1 0m1.25 0v-.5a.5.5 0 0 1 1 0V9a.5.5 0 0 1-1 0M8.5 9v-.5a.5.5 0 0 1 1 0V9a.5.5 0 0 1-1 0M3.75 2c-.193 0-.326.045-.43.126-.108.084-.236.246-.34.572l-.914 3.707c.215-.071.445-.111.684-.111h6.5c.24 0 .468.04.683.111L9.02 2.698c-.105-.326-.232-.488-.34-.572C8.577 2.045 8.444 2 8.25 2zm7.75 6.647C11.5 9.92 10.519 11 9.25 11h-6.5C1.481 11 .5 9.92.5 8.647c0-.388.09-.756.252-1.082L2.015 2.44l.004-.015.004-.016c.146-.46.366-.825.681-1.071A1.66 1.66 0 0 1 3.75 1h4.5c.359 0 .726.087 1.046.337.315.246.535.61.68 1.071l.005.016.004.015 1.263 5.126c.161.326.252.694.252 1.082"/>`,
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

const ServerOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

ServerOutlinedIcon.displayName = "ServerOutlinedIcon";

export default ServerOutlinedIcon;
