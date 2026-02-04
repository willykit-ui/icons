import * as React from "react";
import type { IconProps } from "./types";

/**
 * PinFilledIcon icon component.
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
      __html: `<path d="M8.059 6.059A.2.2 0 0 1 8 5.917V2.2c0-.11.09-.2.2-.2h.1a.2.2 0 0 0 .2-.2v-.6a.2.2 0 0 0-.2-.2H3.7a.2.2 0 0 0-.2.2v.6c0 .11.09.2.2.2h.1c.11 0 .2.09.2.2v3.717a.2.2 0 0 1-.059.142l-.882.882A.2.2 0 0 0 3 7.083V7.8c0 .11.09.2.2.2h2.1c.11 0 .2.09.2.2v2.6c0 .11.09.2.2.2h.6a.2.2 0 0 0 .2-.2V8.2c0-.11.09-.2.2-.2h2.1a.2.2 0 0 0 .2-.2v-.717a.2.2 0 0 0-.059-.142z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M10.452 8.053a.18.18 0 0 1-.053-.128V3.38c0-.1.081-.18.18-.18h.24c.1 0 .18-.08.18-.18v-.84c0-.1-.08-.18-.18-.18H5.18c-.1 0-.18.08-.18.18v.84c0 .1.081.18.18.18h.24c.1 0 .18.08.18.18v4.545a.18.18 0 0 1-.052.128L4.452 9.147a.18.18 0 0 0-.053.128v.945c0 .1.081.18.18.18h2.64c.1 0 .18.08.18.18v3.24c0 .1.081.18.18.18h.84c.1 0 .18-.08.18-.18v-3.24c0-.1.081-.18.18-.18h2.64c.1 0 .18-.08.18-.18v-.945a.18.18 0 0 0-.052-.128z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M13.054 10.053A.18.18 0 0 1 13 9.925V4.18c0-.1.08-.18.18-.18h.39c.1 0 .18-.08.18-.18V2.68c0-.1-.08-.18-.18-.18H6.43c-.1 0-.18.08-.18.18v1.14c0 .1.08.18.18.18h.39c.1 0 .18.08.18.18v5.745a.18.18 0 0 1-.053.128l-1.394 1.394a.18.18 0 0 0-.053.128v1.245c0 .1.08.18.18.18h3.39c.1 0 .18.08.18.18v4.14c0 .1.08.18.18.18h1.14c.1 0 .18-.08.18-.18v-4.14c0-.1.08-.18.18-.18h3.39c.1 0 .18-.08.18-.18v-1.245a.18.18 0 0 0-.053-.128z" fill="currentColor"/>`,
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

const PinFilledIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

PinFilledIcon.displayName = "PinFilledIcon";

export default PinFilledIcon;
