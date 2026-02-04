import * as React from "react";
import type { IconProps } from "./types";

/**
 * PlayOutlinedIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path d="M11.05 6.001a5.05 5.05 0 1 0-10.1 0 5.05 5.05 0 0 0 10.1 0m-6.7-2.105c0-.499.533-.8.953-.576l.082.053 2.862 2.105a.65.65 0 0 1 0 1.046L5.385 8.63a.65.65 0 0 1-1.035-.524zm.9 3.715 2.19-1.61L5.25 4.39zm6.7-1.61a5.95 5.95 0 1 1-11.9 0 5.95 5.95 0 0 1 11.9 0" fill="currentColor"/></g><defs><clipPath id="a"><rect width="12" height="12" rx="2" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M8 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1m0 1a6 6 0 1 0 0 12A6 6 0 0 0 8 2M6 5.6a.8.8 0 0 1 1.179-.705l.101.065 3.2 2.4a.8.8 0 0 1 0 1.28l-3.2 2.4A.8.8 0 0 1 6 10.4zm1 4.399L9.666 8 7 6z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M17.45 9.999a7.45 7.45 0 1 0-14.9 0 7.45 7.45 0 0 0 14.9 0m-10-3.197a.95.95 0 0 1 1.402-.836l.12.078 4.236 3.197a.95.95 0 0 1 0 1.516l-4.235 3.197a.95.95 0 0 1-1.523-.758zm1.1 6.093 3.837-2.896L8.55 7.103zm10-2.896a8.55 8.55 0 0 1-8.55 8.55 8.55 8.55 0 1 1 8.55-8.55" fill="currentColor"/>`,
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

const PlayOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

PlayOutlinedIcon.displayName = "PlayOutlinedIcon";

export default PlayOutlinedIcon;
