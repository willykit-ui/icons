import * as React from "react";
import type { IconProps } from "./types";

/**
 * DocumentTextOutlinedIcon icon component.
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
      __html: `<path fill="currentColor" d="M10 5.002c0-.957 0-1.624-.068-2.128-.066-.49-.187-.748-.371-.933-.185-.184-.444-.305-.933-.37-.504-.068-1.171-.07-2.128-.07h-1c-.957.001-1.624.002-2.128.07-.49.065-.748.186-.933.37-.184.185-.305.444-.37.933C2 3.378 2 4.045 2 5.002v2c0 .957 0 1.624.068 2.128.066.49.187.748.371.932.185.185.444.306.933.372.504.067 1.171.068 2.128.068h1c.957 0 1.624 0 2.128-.068.49-.066.748-.187.933-.371.184-.185.305-.444.37-.933C10 8.626 10 7.959 10 7.002zM6.502 7.498a.5.5 0 1 1 0 1h-2.5a.5.5 0 0 1 0-1zm1.5-1.998a.5.5 0 1 1 0 1h-4a.5.5 0 0 1 0-1zm0-1.998a.5.5 0 1 1 0 1h-4a.5.5 0 1 1 0-1zM11 7.002c0 .928 0 1.675-.078 2.26-.08.6-.253 1.106-.654 1.508-.402.4-.907.573-1.507.654-.586.079-1.333.078-2.261.078h-1c-.928 0-1.675 0-2.26-.078-.6-.08-1.106-.253-1.508-.654-.4-.402-.573-.907-.654-1.507C1 8.677 1 7.93 1 7.002v-2c0-.929 0-1.675.078-2.26.08-.6.253-1.106.654-1.508.402-.4.907-.573 1.507-.654C3.825.501 4.572.502 5.5.502h1c.928 0 1.675 0 2.26.078.6.08 1.106.253 1.508.654.4.402.573.907.654 1.507C11 3.327 11 4.073 11 5.002z"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path fill="currentColor" d="M13.5 6.669c0-1.271 0-2.174-.093-2.86-.09-.67-.26-1.056-.542-1.338s-.668-.452-1.339-.542c-.685-.092-1.588-.093-2.859-.093H7.333c-1.271 0-2.174 0-2.86.093-.67.09-1.056.26-1.338.542s-.452.668-.542 1.339C2.5 4.495 2.5 5.398 2.5 6.669v2.667c0 1.271 0 2.174.093 2.86.09.67.26 1.056.542 1.338s.668.452 1.339.542c.685.092 1.588.093 2.859.093h1.334c1.271 0 2.174 0 2.86-.093.67-.09 1.056-.26 1.338-.542s.452-.668.542-1.339c.092-.685.093-1.588.093-2.86zm-4.831 3.495a.5.5 0 1 1 0 1H5.336a.5.5 0 0 1 0-1zm2-2.664a.5.5 0 1 1 0 1H5.336a.5.5 0 0 1 0-1zm0-2.664a.5.5 0 1 1 0 1H5.336a.5.5 0 0 1 0-1zm3.831 4.5c0 1.243 0 2.226-.102 2.993-.106.781-.327 1.414-.826 1.913s-1.131.72-1.913.825c-.767.104-1.75.102-2.992.102H7.333c-1.243 0-2.225.002-2.992-.102-.782-.105-1.414-.326-1.913-.825s-.72-1.132-.825-1.913c-.104-.767-.103-1.75-.103-2.993V6.669c0-1.243 0-2.225.103-2.992.105-.782.326-1.414.825-1.913s1.131-.72 1.913-.826C5.108.835 6.09.836 7.333.836h1.334c1.243 0 2.225 0 2.992.102.782.106 1.414.327 1.913.826s.72 1.131.826 1.913c.103.767.102 1.75.102 2.992z"/>`,
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

const DocumentTextOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

DocumentTextOutlinedIcon.displayName = "DocumentTextOutlinedIcon";

export default DocumentTextOutlinedIcon;
