import * as React from "react";
import type { IconProps } from "./types";

/**
 * CommentFilledIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path d="M6 .55a5.45 5.45 0 1 1-2.427 10.332.37.37 0 0 0-.257-.035l-1.113.298A1.1 1.1 0 0 1 .856 9.798l.298-1.113a.37.37 0 0 0-.035-.257A5.45 5.45 0 0 1 6 .55m-1.8 6a.45.45 0 0 0 0 .901h1.5a.45.45 0 0 0 0-.9zm0-2a.45.45 0 0 0 0 .901h3.599a.45.45 0 0 0 0-.9z" fill="currentColor"/></g><defs><clipPath id="a"><path d="M0 0h12v12H0z" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<g clipPath="url(#a)"><path d="M8 .957a7.042 7.042 0 1 1-3.136 13.349.52.52 0 0 0-.364-.05l-1.447.389a1.387 1.387 0 0 1-1.699-1.699l.388-1.447a.52.52 0 0 0-.049-.364A7.042 7.042 0 0 1 8 .957M5 8.999a.5.5 0 0 0 0 1h3a.5.5 0 1 0 0-1zm0-2.5a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1z" fill="currentColor"/></g><defs><clipPath id="a"><path d="M0 0h16v16H0z" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M10 1.45a8.55 8.55 0 1 1-3.808 16.206.76.76 0 0 0-.53-.067l-1.781.476a1.59 1.59 0 0 1-1.947-1.947l.476-1.781a.76.76 0 0 0-.067-.53A8.55 8.55 0 0 1 10 1.45m-4 9.5a.55.55 0 1 0 0 1.099h5a.55.55 0 1 0 0-1.1zm0-3a.55.55 0 1 0 0 1.099h8a.55.55 0 1 0 0-1.1z" fill="currentColor"/>`,
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

const CommentFilledIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

CommentFilledIcon.displayName = "CommentFilledIcon";

export default CommentFilledIcon;
