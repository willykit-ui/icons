import * as React from "react";
import type { IconProps } from "./types";

/**
 * TableAddOutlinedIcon icon component.
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
      __html: `<path fill="currentColor" d="M12.167 4.795c0-.38 0-.636-.017-.833-.015-.191-.043-.283-.074-.343a.83.83 0 0 0-.364-.364c-.06-.03-.152-.059-.344-.074a5 5 0 0 0-.348-.015l-.487-.002h-2.7v2.333h4.334zm-.667 7.87v-1.5H10a.5.5 0 0 1 0-1h1.5v-1.5a.5.5 0 0 1 1 0v1.5H14a.5.5 0 1 1 0 1h-1.5v1.5a.5.5 0 0 1-1 0m-9-3.168h4.333v-3H2.5zm0 1.7c0 .382 0 .638.017.835.015.192.043.284.074.344.08.157.208.285.364.364.06.03.152.059.343.075.197.016.452.016.833.016h2.702v-2.334H2.5zm0-5.7h4.333V3.164h-2.7c-.38 0-.638 0-.835.017-.191.015-.283.043-.343.074a.83.83 0 0 0-.364.364c-.03.06-.059.152-.074.343-.017.197-.017.454-.017.836zm10.667.5a.5.5 0 0 1-.5.5H7.833v6.834a.5.5 0 0 1-.5.5H4.131c-.364 0-.668 0-.915-.02a1.9 1.9 0 0 1-.715-.18 1.83 1.83 0 0 1-.8-.8 1.9 1.9 0 0 1-.181-.717c-.02-.247-.02-.552-.02-.917v-6.4c0-.364 0-.669.02-.916.02-.253.066-.491.18-.716.176-.345.456-.625.801-.8.225-.115.463-.16.716-.181.247-.02.552-.02.917-.02h6.4l.502.002q.228.003.414.018c.253.02.491.066.716.18.345.176.625.456.8.801.115.225.16.462.18.715.02.247.021.55.021.915z"/>`,
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

const TableAddOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

TableAddOutlinedIcon.displayName = "TableAddOutlinedIcon";

export default TableAddOutlinedIcon;
