import * as React from "react";
import type { IconProps } from "./types";

/**
 * SealingOutlinedIcon icon component.
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
      __html: `<path d="M7.652 1.55a2.04 2.04 0 0 1 1.736.97l1.688 2.747a1.4 1.4 0 0 1 0 1.468L9.573 9.18a2.67 2.67 0 0 1-2.275 1.272H2.984A2.435 2.435 0 0 1 .55 8.017V3.985a2.435 2.435 0 0 1 2.434-2.434zM2.35 8.002v-4a.45.45 0 0 1 .9 0v4a.45.45 0 0 1-.9 0m5.8-2a.55.55 0 1 0-1.1.001.55.55 0 0 0 1.1-.001m.9 0a1.45 1.45 0 1 1-2.9 0 1.45 1.45 0 0 1 2.9 0m-7.6 2.016c0 .847.687 1.534 1.534 1.534h4.314c.615 0 1.186-.32 1.509-.844l1.503-2.442a.51.51 0 0 0 0-.528L8.62 2.992a1.14 1.14 0 0 0-.969-.54H2.984c-.847 0-1.534.686-1.534 1.533z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M10.148 2.3c.89 0 1.718.463 2.184 1.221l2.195 3.569a1.74 1.74 0 0 1 0 1.821l-1.954 3.176A3.39 3.39 0 0 1 9.687 13.7H4.079A3.08 3.08 0 0 1 1 10.621V5.38A3.08 3.08 0 0 1 4.08 2.3zM3 10.502v-5a.5.5 0 1 1 1 0v5a.5.5 0 0 1-1 0m7.8-2.55a.85.85 0 1 0-1.7 0 .85.85 0 0 0 1.7 0m1 0a1.85 1.85 0 1 1-3.7 0 1.85 1.85 0 0 1 3.7 0M2 10.621c0 1.148.93 2.08 2.08 2.08h5.607c.83 0 1.6-.43 2.035-1.138l1.953-3.175a.74.74 0 0 0 0-.774l-2.196-3.57a1.56 1.56 0 0 0-1.33-.743h-6.07A2.08 2.08 0 0 0 2 5.38z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M12.58 2.65a3.95 3.95 0 0 1 3.412 1.96l2.35 4.028a2.7 2.7 0 0 1 0 2.724l-2.35 4.029a3.95 3.95 0 0 1-3.412 1.96H4.9A3.95 3.95 0 0 1 .95 13.4V6.826A4.177 4.177 0 0 1 5.127 2.65zM3.45 13.5v-7a.55.55 0 0 1 1.1 0v7a.55.55 0 1 1-1.1 0m10.4-3.5a1.15 1.15 0 1 0-2.299 0 1.15 1.15 0 0 0 2.299 0m1.1 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0m-12.9 3.4a2.85 2.85 0 0 0 2.85 2.85h7.68a2.85 2.85 0 0 0 2.462-1.414l2.35-4.028c.29-.5.29-1.116 0-1.616l-2.35-4.028A2.85 2.85 0 0 0 12.58 3.75H5.127A3.077 3.077 0 0 0 2.05 6.827z" fill="currentColor"/>`,
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

const SealingOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

SealingOutlinedIcon.displayName = "SealingOutlinedIcon";

export default SealingOutlinedIcon;
