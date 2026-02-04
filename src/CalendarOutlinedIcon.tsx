import * as React from "react";
import type { IconProps } from "./types";

/**
 * CalendarOutlinedIcon icon component.
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
      __html: `<path d="M8 .55a.45.45 0 0 1 .45.451v.55h.75c.966 0 1.75.783 1.75 1.75v6.4a1.75 1.75 0 0 1-1.75 1.75H2.8a1.75 1.75 0 0 1-1.75-1.75v-6.4c0-.967.783-1.75 1.75-1.75h.75V1a.45.45 0 0 1 .9 0v.55h3.1V1A.45.45 0 0 1 8 .551m2 5.401H2q-.025-.001-.05-.005v3.755c0 .47.38.85.85.85h6.4c.47 0 .85-.38.85-.85V5.946q-.025.004-.05.005m-6 2.25a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1m2 0a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1m2 0a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1m-4-1.5a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1m2 0a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1m2 0a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1m-5.2-4.25a.85.85 0 0 0-.85.85v1.754L2 5.051h8q.025 0 .05.004V3.3a.85.85 0 0 0-.85-.85h-.75V3a.45.45 0 0 1-.9 0v-.55h-3.1V3a.45.45 0 0 1-.9 0v-.55z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M11 1a.5.5 0 0 1 .5.5V2h.5a2.5 2.5 0 0 1 2.5 2.5v8A2.5 2.5 0 0 1 12 15H4a2.5 2.5 0 0 1-2.5-2.5v-8A2.5 2.5 0 0 1 4 2h.5v-.5a.5.5 0 0 1 1 0V2h5v-.5A.5.5 0 0 1 11 1M2.5 12.5A1.5 1.5 0 0 0 4 14h8a1.5 1.5 0 0 0 1.5-1.5V7h-11zM5.2 11a.7.7 0 1 1 0 1.401.7.7 0 0 1 0-1.401m2.801 0a.7.7 0 1 1 0 1.401A.7.7 0 0 1 8 11m2.799 0a.7.7 0 1 1 0 1.401.7.7 0 0 1 0-1.401M5.2 8.6a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4m2.801 0a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4m2.799 0a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4M4 3a1.5 1.5 0 0 0-1.5 1.5V6h11V4.5A1.5 1.5 0 0 0 12 3h-.5v.5a.5.5 0 0 1-1 0V3h-5v.5a.5.5 0 0 1-1 0V3z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M14 .95a.55.55 0 0 1 .55.549v.95h.488a3.01 3.01 0 0 1 3.012 3.014v10.072a3.014 3.014 0 0 1-3.014 3.014H4.964a3.014 3.014 0 0 1-3.014-3.014V5.463a3.01 3.01 0 0 1 3.012-3.014h.488V1.5a.55.55 0 1 1 1.1 0v.95h6.9V1.5A.55.55 0 0 1 14 .95M3.05 8.048v7.486c0 1.057.857 1.914 1.914 1.914h10.072a1.915 1.915 0 0 0 1.914-1.914V8.05zm3.55 5.2a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6m3.399 0a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6m3.4 0a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6m-6.798-2.75a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6m3.398 0a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6m3.4 0a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6m-8.437-6.95A1.913 1.913 0 0 0 3.05 5.463v1.486h13.9V5.463a1.913 1.913 0 0 0-1.912-1.914h-.488v.95a.55.55 0 1 1-1.1 0v-.95h-6.9v.95a.55.55 0 1 1-1.1 0v-.95z" fill="currentColor"/>`,
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

const CalendarOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

CalendarOutlinedIcon.displayName = "CalendarOutlinedIcon";

export default CalendarOutlinedIcon;
