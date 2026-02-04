import * as React from "react";
import type { IconProps } from "./types";

/**
 * CommentRectangularOutlinedIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path d="M10.55 2.3a.85.85 0 0 0-.85-.849H2.3a.85.85 0 0 0-.85.85v5.4c0 .47.38.85.85.85h1.162c.464 0 .91.184 1.237.512L6 10.364l1.3-1.3a1.75 1.75 0 0 1 1.238-.513H9.7c.47 0 .85-.38.85-.85zM6.5 5.55a.45.45 0 0 1 0 .901H4a.45.45 0 0 1 0-.9zM8 4.05a.45.45 0 0 1 0 .901H4a.45.45 0 0 1 0-.9zm3.45 3.651a1.75 1.75 0 0 1-1.75 1.75H8.538a.85.85 0 0 0-.6.25l-1.55 1.547a.55.55 0 0 1-.777 0L4.063 9.7a.85.85 0 0 0-.601-.249H2.3a1.75 1.75 0 0 1-1.75-1.75v-5.4c0-.967.783-1.75 1.75-1.75h7.4c.966 0 1.75.783 1.75 1.75z" fill="currentColor"/></g><defs><clipPath id="a"><rect width="12" height="12" rx="2" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M14.5 3.5A1.5 1.5 0 0 0 13 2H4a1.5 1.5 0 0 0-1.5 1.5v6.4A1.5 1.5 0 0 0 4 11.4h1.9q.048 0 .095.01.033.005.064.018l.03.01a.5.5 0 0 1 .169.114l2.24 2.24 2.247-2.246a.5.5 0 0 1 .243-.133l.011-.004a.5.5 0 0 1 .1-.009H13a1.5 1.5 0 0 0 1.5-1.5zm-5.352 4a.5.5 0 0 1 0 1h-3.25a.5.5 0 1 1 0-1zm1.95-1.95a.5.5 0 0 1 0 1h-5.2a.5.5 0 1 1 0-1zM15.5 9.9a2.5 2.5 0 0 1-2.5 2.5h-1.694l-2.362 2.362a.63.63 0 0 1-.891 0L5.69 12.4H4a2.5 2.5 0 0 1-2.5-2.5V3.5A2.5 2.5 0 0 1 4 1h9a2.5 2.5 0 0 1 2.5 2.5z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M17.45 4.299a1.75 1.75 0 0 0-1.75-1.75H4.3a1.75 1.75 0 0 0-1.75 1.75v8.2c0 .966.783 1.75 1.75 1.75h1.548c.755 0 1.48.3 2.014.835L10 17.222l2.138-2.138a2.85 2.85 0 0 1 2.014-.835H15.7a1.75 1.75 0 0 0 1.75-1.75zm-6.65 5.15a.55.55 0 1 1 0 1.1h-4a.55.55 0 0 1 0-1.1zm2.4-2.4a.55.55 0 0 1 0 1.1H6.8a.55.55 0 0 1 0-1.1zm5.35 5.45a2.85 2.85 0 0 1-2.85 2.85h-1.548a1.75 1.75 0 0 0-1.237.512l-2.413 2.413a.71.71 0 0 1-1.004 0l-2.413-2.413a1.75 1.75 0 0 0-1.237-.512H4.3a2.85 2.85 0 0 1-2.85-2.85v-8.2a2.85 2.85 0 0 1 2.85-2.85h11.4a2.85 2.85 0 0 1 2.85 2.85z" fill="currentColor"/>`,
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

const CommentRectangularOutlinedIcon = React.forwardRef<
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

CommentRectangularOutlinedIcon.displayName = "CommentRectangularOutlinedIcon";

export default CommentRectangularOutlinedIcon;
