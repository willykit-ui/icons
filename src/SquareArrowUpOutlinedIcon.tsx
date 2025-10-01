import * as React from "react";
import type { IconProps } from "./types";

/**
 * SquareArrowUpOutlinedIcon icon component.
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
      __html: `<path fill="currentColor" d="M6 4.5a.5.5 0 0 0-.354.146l-1.5 1.5-.064.079a.5.5 0 0 0 .693.693l.079-.064L6 5.707l1.146 1.147a.5.5 0 1 0 .708-.708l-1.5-1.5-.077-.062A.5.5 0 0 0 6 4.5"/><path fill="currentColor" d="M1 6c0-1.56.003-2.492.106-3.161.092-.592.25-.888.547-1.186s.594-.455 1.186-.547C3.509 1.003 4.44 1 6 1s2.492.003 3.161.106c.592.092.888.25 1.186.547.261.262.443.64.545 1.348.105.735.108 1.68.108 2.999 0 1.56-.003 2.492-.106 3.161-.092.592-.25.888-.547 1.186s-.594.455-1.186.547C8.491 10.997 7.56 11 6 11v1c2.855 0 3.967 0 4.874-.78l.18-.166C12 10.107 12 9.046 12 6c0-2.423 0-3.913-.78-4.87l-.166-.184C10.107 0 9.046 0 6 0S1.893 0 .946.946C0 1.893 0 2.954 0 6s0 4.107.946 5.054C1.893 12 2.954 12 6 12v-1c-1.56 0-2.492-.003-3.161-.106-.592-.092-.888-.25-1.186-.547s-.455-.594-.547-1.186C1.003 8.491 1 7.56 1 6"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path fill="currentColor" d="M8 6.5a.5.5 0 0 1 .354.146l2 2 .064.079a.5.5 0 0 1-.693.693l-.079-.064L8 7.707 6.354 9.354a.5.5 0 1 1-.708-.708l2-2 .077-.062A.5.5 0 0 1 8 6.5"/><path fill="currentColor" d="M14 8c0-1.668-.001-2.733-.122-3.514-.115-.742-.332-1.182-.757-1.607s-.865-.642-1.607-.757C10.734 2.002 9.668 2 8 2s-2.733.001-3.514.122c-.742.115-1.182.332-1.607.757-.407.407-.636.955-.756 1.789C2.001 5.515 2 6.586 2 8c0 1.668.001 2.733.122 3.514.115.742.332 1.182.757 1.607s.865.642 1.607.757c.78.12 1.846.122 3.514.122s2.733-.001 3.514-.122c.742-.115 1.182-.332 1.607-.757s.642-.865.757-1.607c.12-.78.122-1.846.122-3.514m1 0c0 1.632.002 2.791-.134 3.667-.141.914-.438 1.561-1.038 2.161s-1.247.897-2.161 1.038C10.791 15.002 9.632 15 8 15s-2.791.002-3.667-.134c-.914-.141-1.561-.438-2.161-1.038s-.897-1.247-1.038-2.161C.998 10.791 1 9.632 1 8c0-1.386-.002-2.54.133-3.475.136-.947.42-1.735 1.039-2.353.6-.6 1.247-.897 2.161-1.038C5.209.998 6.368 1 8 1s2.791-.002 3.667.134c.914.141 1.561.438 2.161 1.038s.897 1.247 1.038 2.161C15.002 5.209 15 6.368 15 8"/>`,
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

const SquareArrowUpOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

SquareArrowUpOutlinedIcon.displayName = "SquareArrowUpOutlinedIcon";

export default SquareArrowUpOutlinedIcon;
