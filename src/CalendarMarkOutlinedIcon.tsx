import * as React from "react";
import type { IconProps } from "./types";

/**
 * CalendarMarkOutlinedIcon icon component.
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
      __html: `<path d="M10.05 5.945q-.025.005-.05.006H2l-.05-.006v3.593c0 .56.454 1.013 1.013 1.013h6.074c.56 0 1.013-.454 1.013-1.013zm-2 2.306a.3.3 0 1 0-.6 0 .3.3 0 0 0 .6 0m-.5-5.25v-.55h-3.1v.55a.45.45 0 0 1-.9 0v-.55h-.587c-.56 0-1.013.454-1.013 1.013v1.592q.025-.004.05-.005h8q.025.001.05.005V3.464c0-.56-.454-1.013-1.013-1.013H8.45v.55a.45.45 0 0 1-.9 0m1.4 5.25a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0m2 1.287a1.914 1.914 0 0 1-1.913 1.913H2.963A1.914 1.914 0 0 1 1.05 9.538V3.464c0-1.056.857-1.913 1.913-1.913h.587V1a.45.45 0 0 1 .9 0v.55h3.1V1a.45.45 0 0 1 .9 0v.55h.587c1.056 0 1.913.857 1.913 1.913z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M13.5 7h-11v5.5A1.5 1.5 0 0 0 4 14h8a1.5 1.5 0 0 0 1.5-1.5zM11 11a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0m-.5-7.5V3h-5v.5a.5.5 0 0 1-1 0V3H4a1.5 1.5 0 0 0-1.5 1.5V6h11V4.5A1.5 1.5 0 0 0 12 3h-.5v.5a.5.5 0 0 1-1 0M12 11a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m2.5 1.5A2.5 2.5 0 0 1 12 15H4a2.5 2.5 0 0 1-2.5-2.5v-8A2.5 2.5 0 0 1 4 2h.5v-.5a.5.5 0 0 1 1 0V2h5v-.5a.5.5 0 0 1 1 0V2h.5a2.5 2.5 0 0 1 2.5 2.5z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M16.95 8.049H3.05v7.486c0 1.057.857 1.914 1.914 1.914h10.072a1.915 1.915 0 0 0 1.914-1.914zm-3 5.7a.7.7 0 1 0-1.4 0 .7.7 0 0 0 1.4 0m-.5-9.25v-.95h-6.9v.95a.55.55 0 1 1-1.1 0v-.95h-.488A1.913 1.913 0 0 0 3.05 5.463v1.486h13.9V5.463a1.913 1.913 0 0 0-1.912-1.914h-.488v.95a.55.55 0 1 1-1.1 0m1.6 9.25a1.8 1.8 0 1 1-3.6 0 1.8 1.8 0 0 1 3.6 0m3 1.786a3.014 3.014 0 0 1-3.014 3.014H4.964a3.014 3.014 0 0 1-3.014-3.014V5.463a3.01 3.01 0 0 1 3.012-3.014h.488V1.5a.55.55 0 1 1 1.1 0v.95h6.9V1.5a.55.55 0 1 1 1.1 0v.95h.488a3.01 3.01 0 0 1 3.012 3.014z" fill="currentColor"/>`,
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

const CalendarMarkOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

CalendarMarkOutlinedIcon.displayName = "CalendarMarkOutlinedIcon";

export default CalendarMarkOutlinedIcon;
