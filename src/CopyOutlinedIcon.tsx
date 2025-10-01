import * as React from "react";
import type { IconProps } from "./types";

/**
 * CopyOutlinedIcon icon component.
 *
 * @description Supports sizes: small (12px), medium (16px, default), large (20px).
 * Automatically falls back to the closest available size if exact one is missing.
 *
 * @param fontSize - Icon size preset or custom pixel value
 * @param color - Icon color (supports CSS colors, variables, and 'currentColor')
 * @param ...props - All other SVG element props
 */

const svgChildren = {
  small: { content: { __html: "" }, viewBox: "0 0 16 16" },

  medium: {
    content: {
      __html: `<path fill="currentColor" d="M13.5 7.336c0-.957 0-1.624-.068-2.128-.066-.49-.187-.748-.372-.933-.184-.184-.443-.305-.932-.37-.504-.068-1.171-.07-2.128-.07H8c-.957 0-1.624.002-2.128.07-.49.065-.748.186-.933.37-.184.185-.305.444-.37.933C4.5 5.712 4.5 6.379 4.5 7.336v3.333c0 .957 0 1.624.068 2.128.066.489.187.748.371.932.185.185.444.306.933.372.504.067 1.171.068 2.128.068h2c.957 0 1.624 0 2.128-.068.49-.066.748-.187.932-.372.185-.184.306-.443.372-.932.067-.504.068-1.171.068-2.128zm1 3.333c0 .929 0 1.676-.078 2.262-.08.6-.253 1.105-.654 1.507-.402.4-.907.573-1.507.654-.586.079-1.333.077-2.261.077H8c-.928 0-1.675.002-2.26-.077-.6-.08-1.106-.254-1.508-.655-.354-.354-.53-.791-.623-1.302A2.5 2.5 0 0 1 1.5 10.669v-4c0-1.243 0-2.225.103-2.992.105-.782.326-1.414.825-1.913s1.131-.72 1.913-.826C5.108.835 6.09.836 7.333.836H10c1.248 0 2.278.914 2.466 2.11.51.091.947.268 1.302.622.4.402.573.907.654 1.507.079.586.078 1.332.078 2.26zm-12 0a1.5 1.5 0 0 0 1.016 1.419 43 43 0 0 1-.016-1.42V7.337c0-.929 0-1.675.078-2.26.08-.6.253-1.106.654-1.508.402-.4.907-.573 1.507-.654.586-.079 1.333-.078 2.261-.078h2c.53 0 1.002.001 1.418.016A1.5 1.5 0 0 0 10 1.836H7.333c-1.271 0-2.174 0-2.86.093-.67.09-1.056.26-1.338.542s-.452.668-.542 1.339C2.5 4.495 2.5 5.398 2.5 6.669z"/>`,
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

const CopyOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

CopyOutlinedIcon.displayName = "CopyOutlinedIcon";

export default CopyOutlinedIcon;
