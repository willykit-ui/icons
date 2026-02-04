import * as React from "react";
import type { IconProps } from "./types";

/**
 * CrossCircleOutlinedIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path d="M6 .5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11m0 .9a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2m1.682 2.282a.45.45 0 0 1 .636.636L6.637 6l1.681 1.682a.45.45 0 0 1-.636.636L6 6.637 4.318 8.318a.45.45 0 0 1-.636-.636L5.363 6 3.682 4.318a.45.45 0 0 1 .636-.636L6 5.363z" fill="currentColor"/></g><defs><clipPath id="a"><rect width="12" height="12" rx="2" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M8 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1m0 1a6 6 0 1 0 0 12A6 6 0 0 0 8 2m2.146 3.146a.5.5 0 1 1 .707.708L8.708 8l2.146 2.146a.5.5 0 1 1-.707.707L8 8.708l-2.146 2.146a.5.5 0 1 1-.708-.707L7.293 8 5.146 5.854a.5.5 0 1 1 .708-.708L8 7.293z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M10 1.45a8.55 8.55 0 1 1 0 17.099 8.55 8.55 0 1 1 0-17.1m0 1.099a7.45 7.45 0 1 0 0 14.9 7.45 7.45 0 0 0 0-14.9m2.423 4.135a.631.631 0 1 1 .892.892L10.893 10l2.422 2.423a.631.631 0 0 1-.892.893L10 10.892l-2.423 2.423a.631.631 0 0 1-.892-.893l2.422-2.423-2.422-2.423a.631.631 0 0 1 .892-.892L10 9.106z" fill="currentColor"/>`,
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

const CrossCircleOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

CrossCircleOutlinedIcon.displayName = "CrossCircleOutlinedIcon";

export default CrossCircleOutlinedIcon;
