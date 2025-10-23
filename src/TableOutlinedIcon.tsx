import * as React from "react";
import type { IconProps } from "./types";

/**
 * TableOutlinedIcon icon component.
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
      __html: `<path fill="currentColor" d="M12.5 10.375h-4V12.5h2.502c.358 0 .596 0 .78-.016.176-.014.258-.04.309-.066a.75.75 0 0 0 .327-.327c.026-.051.052-.133.066-.31.015-.183.016-.421.016-.779zm-4-1h4v-2.75h-4zm-5 0h4v-2.75h-4zm9-4.377c0-.358 0-.596-.016-.78-.014-.176-.04-.258-.066-.309a.75.75 0 0 0-.327-.327.8.8 0 0 0-.31-.066A11 11 0 0 0 11 3.5H8.5v2.125h4zM3.5 11c0 .358 0 .597.016.78.014.178.04.26.066.31a.75.75 0 0 0 .327.328c.051.026.133.052.31.066.183.015.421.016.779.016H7.5v-2.125h-4zm0-5.375h4V3.5H5c-.358 0-.597 0-.78.016-.178.014-.26.04-.31.066a.75.75 0 0 0-.328.327.8.8 0 0 0-.066.31C3.5 4.404 3.5 4.643 3.5 5zm10 5.377c0 .341 0 .627-.019.86-.02.24-.062.466-.171.682-.168.33-.437.598-.766.766-.216.11-.443.152-.682.171-.233.02-.519.019-.86.019H4.998c-.341 0-.627 0-.86-.019a1.8 1.8 0 0 1-.683-.171 1.75 1.75 0 0 1-.765-.766 1.8 1.8 0 0 1-.171-.683c-.02-.233-.019-.52-.019-.861V5c0-.342 0-.628.019-.861.02-.24.061-.468.171-.684a1.75 1.75 0 0 1 .765-.765 1.8 1.8 0 0 1 .684-.171c.233-.02.52-.019.861-.019h6c.342 0 .628 0 .861.019.24.02.467.062.683.171.329.168.598.436.766.765.11.216.152.444.171.683.02.233.019.519.019.86z"/>`,
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

const TableOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

TableOutlinedIcon.displayName = "TableOutlinedIcon";

export default TableOutlinedIcon;
