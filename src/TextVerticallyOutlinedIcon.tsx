import * as React from "react";
import type { IconProps, IconComponent } from "./types";

/**
 * TextVerticallyOutlinedIcon icon component.
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
      __html: `<path fill="currentColor" d="M8.051 10.55V2.537l-.356.357a.45.45 0 0 1-.637-.636l1.125-1.126.068-.056a.45.45 0 0 1 .569.056l1.125 1.126a.45.45 0 0 1-.637.636l-.357-.358v8.014a.45.45 0 0 1-.9 0"/><path fill="currentColor" fillRule="evenodd" d="M6.8 4.634a.15.15 0 0 1 .2.141v.705a.15.15 0 0 1-.103.141l-1.163.405a.05.05 0 0 0-.034.048v2.104c0 .021.014.04.034.047l1.163.406A.15.15 0 0 1 7 8.774v.703a.15.15 0 0 1-.2.141L1.1 7.612a.15.15 0 0 1-.1-.141v-.69a.15.15 0 0 1 .1-.142zM4.618 6.382l-2.206.695c-.046.015-.046.081 0 .096l2.206.696a.05.05 0 0 0 .065-.047V6.43a.05.05 0 0 0-.065-.048" clipRule="evenodd"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path fill="currentColor" d="M13.355 2.648a.5.5 0 1 1-.707.707L12 2.708V14.5a.5.5 0 0 1-1 0V2.708l-.645.647a.5.5 0 0 1-.707-.707l1.5-1.502a.5.5 0 0 1 .707 0z"/><path fill="currentColor" fillRule="evenodd" d="M10 7.149a.1.1 0 0 1-.07.095l-2.326.736a.1.1 0 0 0-.07.095v2.85a.1.1 0 0 0 .07.095l2.326.737a.1.1 0 0 1 .07.096v1.01a.1.1 0 0 1-.131.094l-8.8-2.879A.1.1 0 0 1 1 9.983v-.966a.1.1 0 0 1 .069-.095l8.8-2.879a.1.1 0 0 1 .131.095zM6.31 8.526a.1.1 0 0 0-.13-.095l-3.086.973a.1.1 0 0 0 0 .191l3.085.974a.1.1 0 0 0 .13-.095z" clipRule="evenodd"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path fill="currentColor" d="M16.764 3.037a.55.55 0 1 1-.777.778l-.937-.937V18.45a.55.55 0 1 1-1.1 0V2.878l-.935.937a.55.55 0 1 1-.778-.778l1.874-1.875a.55.55 0 0 1 .778-.001z"/><path fill="currentColor" fillRule="evenodd" d="M12 8.956a.1.1 0 0 1-.068.095l-2.697.928a.1.1 0 0 0-.068.095v3.603a.1.1 0 0 0 .068.094l2.698.93a.1.1 0 0 1 .067.095v1.316a.1.1 0 0 1-.132.094l-10.8-3.614A.1.1 0 0 1 1 12.498v-1.245a.1.1 0 0 1 .068-.095l10.8-3.614A.1.1 0 0 1 12 7.64zm-4.363 1.668a.1.1 0 0 0-.13-.096L3.542 11.78a.1.1 0 0 0 0 .191l3.964 1.252a.1.1 0 0 0 .13-.095z" clipRule="evenodd"/>`,
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

const TextVerticallyOutlinedIcon: IconComponent = React.forwardRef<
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

TextVerticallyOutlinedIcon.displayName = "TextVerticallyOutlinedIcon";

export default TextVerticallyOutlinedIcon;
