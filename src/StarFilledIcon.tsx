import * as React from "react";
import type { IconProps } from "./types";

/**
 * StarFilledIcon icon component.
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
      __html: `<path d="M5.576 1.283a.5.5 0 0 1 .848 0L7.903 3.66a.5.5 0 0 0 .304.222l2.718.671a.5.5 0 0 1 .263.808L9.383 7.5a.5.5 0 0 0-.116.359l.202 2.792a.5.5 0 0 1-.687.499l-2.594-1.055a.5.5 0 0 0-.376 0L3.218 11.15a.5.5 0 0 1-.687-.5l.202-2.791a.5.5 0 0 0-.116-.359L.812 5.361a.5.5 0 0 1 .263-.808l2.717-.67a.5.5 0 0 0 .305-.223z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M7.575 1.484a.5.5 0 0 1 .85 0l2.148 3.456a.5.5 0 0 0 .305.22l3.95.976a.5.5 0 0 1 .262.808l-2.622 3.111a.5.5 0 0 0-.116.359l.293 4.057a.5.5 0 0 1-.688.5l-3.769-1.533a.5.5 0 0 0-.376 0L4.043 14.97a.5.5 0 0 1-.688-.499l.293-4.057a.5.5 0 0 0-.116-.359L.91 6.944a.5.5 0 0 1 .262-.808l3.95-.975a.5.5 0 0 0 .305-.221z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M9.575 1.683a.5.5 0 0 1 .85 0l2.818 4.533a.5.5 0 0 0 .305.222l5.182 1.28a.5.5 0 0 1 .262.807l-3.44 4.081a.5.5 0 0 0-.116.358l.384 5.325a.5.5 0 0 1-.687.499l-4.944-2.011a.5.5 0 0 0-.377 0l-4.945 2.01a.5.5 0 0 1-.687-.498l.385-5.325a.5.5 0 0 0-.118-.358L1.008 8.525a.5.5 0 0 1 .262-.808l5.182-1.279a.5.5 0 0 0 .305-.222z" fill="currentColor"/>`,
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

const StarFilledIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

StarFilledIcon.displayName = "StarFilledIcon";

export default StarFilledIcon;
