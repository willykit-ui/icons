import * as React from "react";
import type { IconProps } from "./types";

/**
 * CrossCircleFilledIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path d="M6 .5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11m2.32 3.182a.45.45 0 0 0-.637 0L6 5.363 4.319 3.682a.45.45 0 0 0-.636.636L5.364 6 3.683 7.682a.45.45 0 0 0 .636.636l1.682-1.681 1.682 1.681a.45.45 0 0 0 .636-.636L6.638 6l1.681-1.682a.45.45 0 0 0 0-.636" fill="currentColor"/></g><defs><clipPath id="a"><rect width="12" height="12" rx="2" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M8 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1m2.854 4.146a.5.5 0 0 0-.707 0L8 7.293 5.854 5.146a.5.5 0 0 0-.708.708L7.293 8l-2.147 2.146a.5.5 0 1 0 .708.707L8 8.708l2.146 2.146a.5.5 0 1 0 .707-.707L8.708 8l2.146-2.146a.5.5 0 0 0 0-.708" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M10 1.45a8.55 8.55 0 1 1 0 17.099 8.55 8.55 0 1 1 0-17.1m3.315 5.234a.63.63 0 0 0-.892 0L10 9.106 7.577 6.684a.631.631 0 0 0-.892.892L9.107 10l-2.422 2.423a.631.631 0 0 0 .892.893L10 10.892l2.423 2.423a.631.631 0 0 0 .892-.893l-2.422-2.423 2.422-2.423a.63.63 0 0 0 0-.892" fill="currentColor"/>`,
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

const CrossCircleFilledIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

CrossCircleFilledIcon.displayName = "CrossCircleFilledIcon";

export default CrossCircleFilledIcon;
