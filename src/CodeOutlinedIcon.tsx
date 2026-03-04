import * as React from "react";
import type { IconProps } from "./types";

/**
 * CodeOutlinedIcon icon component.
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
      __html: `<path d="M7.108 2.065a.45.45 0 0 1 .32.551l-1.993 7.501a.45.45 0 0 1-.87-.231l1.993-7.5a.45.45 0 0 1 .55-.32m.824 2.867a.45.45 0 0 1 .636 0l2.25 2.25a.45.45 0 0 1 0 .636l-2.25 2.25a.45.45 0 0 1-.636-.636L9.863 7.5 7.932 5.569a.45.45 0 0 1 0-.636m-4.5-3a.45.45 0 0 1 .636.636L2.137 4.501l1.931 1.932a.45.45 0 0 1-.636.636l-2.25-2.25a.45.45 0 0 1 0-.636z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M9.452 2.849a.5.5 0 0 1 .356.61L7.149 13.462a.5.5 0 0 1-.966-.257l2.658-10a.5.5 0 0 1 .611-.355m1.194 3.796a.5.5 0 0 1 .707 0l3 3a.5.5 0 0 1 0 .707l-3 3a.5.5 0 0 1-.707-.707L13.293 10l-2.647-2.647a.5.5 0 0 1 0-.707m-6-4a.5.5 0 1 1 .707.707L2.707 6l2.646 2.646a.5.5 0 0 1-.707.707l-3-3a.5.5 0 0 1 0-.707z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M11.797 3.636a.55.55 0 0 1 .39.673L8.864 16.808a.55.55 0 1 1-1.062-.283l3.322-12.5a.55.55 0 0 1 .673-.39m1.564 4.727a.55.55 0 0 1 .778 0l3.75 3.75a.55.55 0 0 1 0 .778l-3.75 3.75a.55.55 0 1 1-.778-.778l3.362-3.361L13.36 9.14a.55.55 0 0 1 0-.778m-7.499-5a.55.55 0 1 1 .778.778L3.277 7.5l3.362 3.362a.55.55 0 1 1-.778.778l-3.75-3.75a.55.55 0 0 1 0-.778z" fill="currentColor"/>`,
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

const CodeOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

CodeOutlinedIcon.displayName = "CodeOutlinedIcon";

export default CodeOutlinedIcon;
