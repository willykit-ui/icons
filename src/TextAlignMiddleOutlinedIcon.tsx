import * as React from "react";
import type { IconProps, IconComponent } from "./types";

/**
 * TextAlignMiddleOutlinedIcon icon component.
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
      __html: `<path fill="currentColor" d="M10.5 5.55a.45.45 0 0 1 0 .9h-9a.45.45 0 0 1 0-.9zm-2.414 3.4a.45.45 0 0 1-.637.636l-.999-1V11a.45.45 0 0 1-.9.001V8.587l-1 .999a.45.45 0 0 1-.636-.637L5.68 7.181a.45.45 0 0 1 .637 0zM3.914 3.051a.45.45 0 0 1 .637-.636l1 1V1a.45.45 0 1 1 .899 0v2.414l1-1a.45.45 0 0 1 .636.637L6.32 4.82a.45.45 0 0 1-.637 0z"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path fill="currentColor" d="M13.5 7.5a.5.5 0 0 1 0 1h-11a.5.5 0 0 1 0-1zm-2.79 4.504a.5.5 0 0 1-.706.707L8.5 11.207V15a.5.5 0 0 1-1 0v-3.793L5.996 12.71a.5.5 0 0 1-.707-.707l2.357-2.357a.5.5 0 0 1 .707 0zM5.29 3.997a.5.5 0 0 1 .706-.707L7.5 4.794V1a.5.5 0 0 1 1 0v3.794l1.504-1.504a.5.5 0 0 1 .707.708L8.354 6.354a.5.5 0 0 1-.707 0z"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path fill="currentColor" d="M17.5 9.451a.55.55 0 1 1 0 1.1h-15a.55.55 0 1 1 0-1.1zm-4.166 5.608a.55.55 0 1 1-.777.777l-2.008-2.008v4.673a.55.55 0 0 1-1.099 0v-4.673l-2.008 2.007a.55.55 0 1 1-.778-.777l2.946-2.946a.55.55 0 0 1 .778 0zM6.666 4.943a.55.55 0 1 1 .777-.777l2.008 2.008V1.5a.55.55 0 0 1 1.099 0v4.673l2.009-2.008a.55.55 0 0 1 .777.777L10.39 7.89a.55.55 0 0 1-.778 0z"/>`,
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

const TextAlignMiddleOutlinedIcon: IconComponent = React.forwardRef<
  SVGSVGElement,
  IconProps
>((props, ref) => {
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
    flexShrink: 0,
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
});

TextAlignMiddleOutlinedIcon.displayName = "TextAlignMiddleOutlinedIcon";

export default TextAlignMiddleOutlinedIcon;
