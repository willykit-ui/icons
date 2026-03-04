import * as React from "react";
import type { IconProps } from "./types";

/**
 * PositionLeftOutlinedIcon icon component.
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
      __html: `<path d="M1.5 2.05a.45.45 0 0 1 .45.451v7a.45.45 0 0 1-.9 0v-7a.45.45 0 0 1 .45-.45m6.916 1.864a.45.45 0 0 1 .637 0l1.767 1.768a.45.45 0 0 1 0 .636L9.051 8.087a.45.45 0 0 1-.636-.636l1-1h-2.29a.45.45 0 0 1 0-.9h2.29l-.999-1a.45.45 0 0 1 0-.636M4.501 5.553a.45.45 0 0 1 0 .9h-1a.45.45 0 0 1 0-.9z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M2.5 2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 .5-.5m8.288 3.288a.5.5 0 0 1 .707 0l2.358 2.358a.5.5 0 0 1 0 .707l-2.358 2.357a.5.5 0 0 1-.707-.707l1.504-1.504H9.499a.5.5 0 0 1 0-1h2.793l-1.504-1.504a.5.5 0 0 1 0-.707M6.5 7.5a.5.5 0 0 1 0 1l-2.001.001a.5.5 0 0 1 0-1z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M3.5 2.95a.55.55 0 0 1 .55.549v13a.55.55 0 1 1-1.1 0v-13a.55.55 0 0 1 .55-.55m9.664 3.713a.55.55 0 0 1 .778 0L16.89 9.61a.55.55 0 0 1 0 .778l-2.947 2.946a.551.551 0 0 1-.778-.777l2.009-2.008H11.5a.55.55 0 0 1-.001-1.1h3.673L13.164 7.44a.55.55 0 0 1 0-.778M8.501 9.45a.55.55 0 0 1 0 1.1H5.499a.55.55 0 0 1 .001-1.1z" fill="currentColor"/>`,
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

const PositionLeftOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

PositionLeftOutlinedIcon.displayName = "PositionLeftOutlinedIcon";

export default PositionLeftOutlinedIcon;
