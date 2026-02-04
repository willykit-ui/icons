import * as React from "react";
import type { IconProps } from "./types";

/**
 * CommentOutlinedIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path d="M1.45 6.001a4.55 4.55 0 1 1 2.525 4.075 1.27 1.27 0 0 0-.892-.098l-1.112.297a.2.2 0 0 1-.245-.245l.297-1.112a1.27 1.27 0 0 0-.098-.892 4.5 4.5 0 0 1-.475-2.025m-.9 0c0 .871.205 1.695.57 2.427a.37.37 0 0 1 .034.257L.856 9.798a1.1 1.1 0 0 0 1.347 1.347l1.113-.298a.37.37 0 0 1 .257.035A5.45 5.45 0 1 0 .55 6.002" fill="currentColor"/></g><defs><clipPath id="a"><path d="M0 0h12v12H0z" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M2 8a6 6 0 1 1 3.33 5.374 1.56 1.56 0 0 0-1.1-.122l-1.447.387a.344.344 0 0 1-.422-.422l.387-1.447c.103-.383.04-.774-.122-1.1A6 6 0 0 1 2 8M1 8c0 1.119.263 2.178.73 3.117a.56.56 0 0 1 .052.394l-.387 1.447a1.346 1.346 0 0 0 1.647 1.647l1.447-.387a.56.56 0 0 1 .394.052A7 7 0 1 0 1 8" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M2.55 9.999a7.45 7.45 0 1 1 4.134 6.673 1.86 1.86 0 0 0-1.307-.146l-1.78.477a.49.49 0 0 1-.6-.6l.476-1.78a1.86 1.86 0 0 0-.146-1.308A7.4 7.4 0 0 1 2.55 10m-1.1 0c0 1.367.321 2.66.893 3.808.09.181.11.369.067.53l-.476 1.781a1.59 1.59 0 0 0 1.947 1.947l1.781-.476a.76.76 0 0 1 .53.067A8.55 8.55 0 1 0 10 1.45 8.55 8.55 0 0 0 1.45 10" fill="currentColor"/>`,
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

const CommentOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

CommentOutlinedIcon.displayName = "CommentOutlinedIcon";

export default CommentOutlinedIcon;
