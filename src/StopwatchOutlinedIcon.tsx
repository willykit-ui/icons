import * as React from "react";
import type { IconProps } from "./types";

/**
 * StopwatchOutlinedIcon icon component.
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
      __html: `<path d="M9.8 6.751a3.8 3.8 0 1 0-7.6 0 3.8 3.8 0 0 0 7.6 0m-4.25-1.75a.45.45 0 0 1 .9 0v1.563l1.106.767a.45.45 0 1 1-.512.74l-1.3-.9-.194-.134zM7.5.551a.45.45 0 0 1 0 .9h-3a.45.45 0 0 1 0-.9zm3.2 6.2a4.7 4.7 0 1 1-9.4 0 4.7 4.7 0 0 1 9.4 0" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M13.25 8.75a5.25 5.25 0 1 0-10.5 0 5.25 5.25 0 0 0 10.5 0M7.5 6.197a.5.5 0 1 1 1 0v2.287l1.694 1.13a.5.5 0 0 1-.554.832L7.5 9.021zM10 1a.5.5 0 0 1 0 1H6a.5.5 0 0 1 0-1zm4.25 7.75a6.25 6.25 0 1 1-12.5 0 6.25 6.25 0 0 1 12.5 0" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M16.45 10.999a6.45 6.45 0 1 0-12.9 0 6.45 6.45 0 0 0 12.9 0m-7-3a.55.55 0 1 1 1.1 0v3.172l2.355 1.57a.55.55 0 0 1-.61.915l-2.6-1.733-.245-.163zM13 1.449a.55.55 0 1 1 0 1.1H7a.55.55 0 1 1 0-1.1zM17.55 11a7.55 7.55 0 1 1-15.1 0 7.55 7.55 0 0 1 15.1 0" fill="currentColor"/>`,
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

const StopwatchOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

StopwatchOutlinedIcon.displayName = "StopwatchOutlinedIcon";

export default StopwatchOutlinedIcon;
