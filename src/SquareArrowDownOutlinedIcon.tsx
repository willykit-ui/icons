import * as React from "react";
import type { IconProps } from "./types";

/**
 * SquareArrowDownOutlinedIcon icon component.
 *
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
      __html: `<g fill="currentColor" clipPath="url(#a)"><path d="M6 7.5a.5.5 0 0 0 .354-.146l1.5-1.5.064-.079a.5.5 0 0 0-.693-.693l-.079.064L6 6.293 4.854 5.146a.5.5 0 1 0-.708.708l1.5 1.5.077.062A.5.5 0 0 0 6 7.5"/><path d="M1 6c0-1.56.003-2.492.106-3.161.092-.592.25-.888.547-1.186s.594-.455 1.186-.547C3.509 1.003 4.44 1 6 1s2.492.003 3.161.106c.592.092.888.25 1.186.547.261.262.443.64.545 1.348.105.735.108 1.68.108 2.999 0 1.56-.003 2.492-.106 3.161-.092.592-.25.888-.547 1.186s-.594.455-1.186.547C8.491 10.997 7.56 11 6 11v1c2.855 0 3.967 0 4.874-.78l.18-.166C12 10.107 12 9.046 12 6c0-2.423 0-3.913-.78-4.87l-.166-.184C10.107 0 9.046 0 6 0S1.893 0 .946.946C0 1.893 0 2.954 0 6s0 4.107.946 5.054C1.893 12 2.954 12 6 12v-1c-1.56 0-2.492-.003-3.161-.106-.592-.092-.888-.25-1.186-.547s-.455-.594-.547-1.186C1.003 8.491 1 7.56 1 6"/></g><defs><clipPath id="a"><path fill="currentColor" d="M12 0H0v12h12z"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path fill="currentColor" d="M9.646 6.646a.5.5 0 1 1 .707.708l-2 2a.5.5 0 0 1-.707 0l-2-2a.5.5 0 1 1 .708-.708L8 8.293z"/><path fill="currentColor" d="M14 8c0-1.587-.001-2.682-.117-3.505-.113-.8-.327-1.279-.713-1.665s-.865-.6-1.664-.713C10.684 2.001 9.59 2 8.003 2s-2.682.001-3.506.117c-.8.113-1.28.327-1.667.713-.386.386-.6.865-.713 1.665C2.001 5.318 2 6.413 2 8s.001 2.681.117 3.504c.113.8.327 1.28.713 1.666s.866.6 1.667.713c.824.116 1.92.117 3.506.117 1.587 0 2.68-.001 3.503-.117.8-.113 1.278-.327 1.664-.713s.6-.866.713-1.666C13.999 10.68 14 9.586 14 8m1 0c0 1.556.001 2.734-.127 3.644-.131.931-.406 1.643-.996 2.233s-1.3.865-2.232.996c-.908.128-2.086.127-3.642.127s-2.736.001-3.646-.127c-.932-.131-1.644-.406-2.234-.996s-.865-1.302-.996-2.233C.999 10.734 1 9.556 1 8s-.001-2.735.127-3.645c.131-.931.406-1.642.996-2.232s1.302-.865 2.234-.996C5.267.999 6.447 1 8.003 1s2.734-.001 3.643.127c.93.131 1.641.406 2.231.996s.865 1.3.996 2.232C15.001 5.265 15 6.444 15 8"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: { content: { __html: "" }, viewBox: "0 0 16 16" },
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

const SquareArrowDownOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

SquareArrowDownOutlinedIcon.displayName = "SquareArrowDownOutlinedIcon";

export default SquareArrowDownOutlinedIcon;
