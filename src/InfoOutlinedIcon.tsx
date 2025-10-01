import * as React from "react";
import type { IconProps } from "./types";

/**
 * InfoOutlinedIcon icon component.
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
      __html: `<path fill="currentColor" fillRule="evenodd" d="M6 2.245a3.754 3.754 0 1 0 0 7.508 3.754 3.754 0 0 0 0-7.508M1.444 6a4.554 4.554 0 1 1 9.108 0 4.554 4.554 0 0 1-9.108 0" clipRule="evenodd"/><path fill="currentColor" d="M6.935 8.231 7 7.93a1 1 0 0 1-.364.097q-.19 0-.266-.07t-.077-.266q0-.076.024-.228.023-.15.053-.269l.244-.977q.035-.135.049-.296a3 3 0 0 0 .013-.225.68.68 0 0 0-.191-.502Q6.293 5 5.94 5q-.197 0-.416.079-.22.08-.46.19L5 5.57q.072-.03.171-.064a.6.6 0 0 1 .194-.033q.194 0 .262.074t.068.262q0 .104-.022.23a5 5 0 0 1-.055.267l-.244.98a3 3 0 0 0-.048.278q-.015.122-.015.24 0 .301.197.499.198.196.553.196.232 0 .406-.069t.468-.2M7 4a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: { content: { __html: "" }, viewBox: "0 0 16 16" },

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

const InfoOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

InfoOutlinedIcon.displayName = "InfoOutlinedIcon";

export default InfoOutlinedIcon;
