import * as React from "react";
import type { IconProps } from "./types";

/**
 * ScreenOutlinedIcon icon component.
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
      __html: `<path fill="currentColor" d="M10.5 6c0-.957 0-1.624-.068-2.128-.066-.49-.187-.748-.372-.933-.184-.184-.443-.305-.932-.37C8.624 2.5 7.957 2.5 7 2.5H5c-.957 0-1.624 0-2.128.068-.49.066-.748.187-.933.371-.184.185-.305.444-.37.933C1.5 4.376 1.5 5.043 1.5 6s0 1.624.068 2.128c.066.49.187.748.371.933.185.184.444.305.933.37C3.376 9.5 4.043 9.5 5 9.5h2l1.234-.009c.35-.009.642-.026.894-.06.49-.065.748-.186.932-.37.185-.185.306-.444.372-.933.067-.504.068-1.171.068-2.128m-3 2a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1zm4-2c0 .928 0 1.675-.078 2.26-.08.6-.253 1.106-.654 1.508-.402.4-.907.573-1.507.654-.586.079-1.333.078-2.261.078H5c-.928 0-1.675 0-2.26-.078-.6-.08-1.106-.253-1.508-.654C.832 9.366.66 8.86.578 8.26.5 7.675.5 6.928.5 6s0-1.675.078-2.26c.08-.6.253-1.106.654-1.508.402-.4.907-.573 1.507-.654C3.325 1.5 4.072 1.5 5 1.5h2c.928 0 1.675 0 2.26.078.6.08 1.106.253 1.508.654.4.402.573.907.654 1.507.079.586.078 1.333.078 2.261"/>`,
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

const ScreenOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

ScreenOutlinedIcon.displayName = "ScreenOutlinedIcon";

export default ScreenOutlinedIcon;
