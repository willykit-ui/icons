import * as React from "react";
import type { IconProps } from "./types";

/**
 * ChartOutlinedIcon icon component.
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
      __html: `<path fill="currentColor" d="M13.5 9.664a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0-.5.5v4.5h3zm-4-6.328c0-.485-.001-.8-.032-1.03-.03-.217-.076-.286-.114-.324s-.107-.085-.324-.114c-.23-.03-.545-.032-1.03-.032s-.8.001-1.03.032c-.217.03-.285.076-.324.114-.038.038-.085.107-.114.324-.03.23-.032.545-.032 1.03v10.828h3zm-7 10.828h3V6.336a.5.5 0 0 0-.5-.5H3a.5.5 0 0 0-.5.5zm8-5.913c.156-.055.325-.087.5-.087h2a1.5 1.5 0 0 1 1.5 1.5v4.5h.169v1H1.336a.5.5 0 0 1 0-1H1.5V6.336a1.5 1.5 0 0 1 1.5-1.5h2q.264.001.5.087V3.336c0-.457-.001-.85.041-1.164.044-.328.144-.642.398-.897.255-.254.57-.354.897-.398C7.149.835 7.543.836 8 .836s.85-.001 1.164.041c.328.044.642.144.896.398.255.255.355.57.399.897.042.313.041.707.041 1.164z"/>`,
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

const ChartOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

ChartOutlinedIcon.displayName = "ChartOutlinedIcon";

export default ChartOutlinedIcon;
