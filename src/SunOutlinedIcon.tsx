import * as React from "react";
import type { IconProps } from "./types";

/**
 * SunOutlinedIcon icon component.
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
      __html: `<path d="M6 9.547a.45.45 0 0 1 .45.45v1a.45.45 0 0 1-.9 0v-1a.45.45 0 0 1 .45-.45m2.459-1.088a.45.45 0 0 1 .637 0l1.111 1.111a.45.45 0 0 1-.637.637L8.46 9.096a.45.45 0 0 1 0-.637m-5.557-.002a.45.45 0 0 1 .637.637l-1.111 1.111a.45.45 0 0 1-.637-.637z" fill="currentColor"/><path fillRule="evenodd" d="M6 3.05a2.95 2.95 0 1 1 0 5.901 2.95 2.95 0 0 1 0-5.9m0 .901a2.05 2.05 0 1 0 0 4.1 2.05 2.05 0 0 0 0-4.1" clipRule="evenodd" fill="currentColor"/><path d="M2 5.547a.45.45 0 0 1 0 .9H1a.45.45 0 0 1 0-.9zm9 0a.45.45 0 0 1 0 .9h-1a.45.45 0 0 1 0-.9zm-9.222-3.74a.45.45 0 0 1 .637-.029l1.111 1.016a.45.45 0 0 1-.607.665L1.807 2.442a.45.45 0 0 1-.029-.635m7.807-.031a.45.45 0 0 1 .607.665L9.081 3.457a.45.45 0 0 1-.607-.664zM6 .547a.45.45 0 0 1 .45.45v1a.45.45 0 0 1-.9 0v-1A.45.45 0 0 1 6 .547" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M8 12.832a.5.5 0 0 1 .5.5v1.333a.5.5 0 1 1-1 0v-1.333a.5.5 0 0 1 .5-.5m3.35-1.482a.5.5 0 0 1 .707 0l1.481 1.482a.5.5 0 0 1-.707.707l-1.481-1.481a.5.5 0 0 1 0-.707m-7.408-.001a.501.501 0 0 1 .708.707l-1.482 1.481a.5.5 0 0 1-.707-.707z" fill="currentColor"/><path fillRule="evenodd" d="M8 4.168a3.834 3.834 0 1 1-.001 7.668 3.834 3.834 0 0 1 0-7.668m0 1a2.833 2.833 0 1 0 0 5.667 2.833 2.833 0 0 0 0-5.667" clipRule="evenodd" fill="currentColor"/><path d="M2.666 7.5a.5.5 0 0 1 0 1H1.333a.5.5 0 0 1 0-1zm12 0a.5.5 0 0 1 0 1h-1.333a.5.5 0 1 1 0-1zM2.446 2.477a.5.5 0 0 1 .706-.032L4.633 3.8a.5.5 0 0 1-.675.738L2.477 3.183a.5.5 0 0 1-.031-.706m10.401-.033a.5.5 0 0 1 .675.739l-1.48 1.354a.5.5 0 0 1-.675-.738zM8 .832a.5.5 0 0 1 .5.5v1.333a.5.5 0 0 1-1 0V1.332a.5.5 0 0 1 .5-.5" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M10 16.117a.55.55 0 0 1 .55.55v1.667a.55.55 0 0 1-1.1 0v-1.667a.55.55 0 0 1 .55-.55m4.24-1.875a.55.55 0 0 1 .778 0l1.852 1.853a.55.55 0 1 1-.778.777l-1.852-1.851a.55.55 0 0 1 0-.779m-9.26-.002a.55.55 0 0 1 .779.777l-1.853 1.852a.55.55 0 0 1-.777-.778z" fill="currentColor"/><path fillRule="evenodd" d="M10 5.285a4.717 4.717 0 1 1 0 9.434 4.717 4.717 0 0 1 0-9.434m0 1.1a3.618 3.618 0 1 0 0 7.235 3.618 3.618 0 0 0 0-7.235" clipRule="evenodd" fill="currentColor"/><path d="M3.333 9.45a.55.55 0 1 1 0 1.099H1.666a.55.55 0 0 1 0-1.1zm15 0a.55.55 0 1 1 0 1.099h-1.667a.55.55 0 0 1 0-1.1zM3.112 3.147a.55.55 0 0 1 .777-.035L5.74 4.806a.55.55 0 1 1-.74.811L3.147 3.925a.55.55 0 0 1-.035-.778m12.998-.035a.55.55 0 1 1 .742.813L15 5.617a.55.55 0 1 1-.741-.811zM10 1.117a.55.55 0 0 1 .55.55v1.667a.55.55 0 0 1-1.1 0V1.667a.55.55 0 0 1 .55-.55" fill="currentColor"/>`,
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

const SunOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

SunOutlinedIcon.displayName = "SunOutlinedIcon";

export default SunOutlinedIcon;
