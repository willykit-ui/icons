import * as React from "react";
import type { IconProps } from "./types";

/**
 * FilterOutlinedIcon icon component.
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
      __html: `<path d="M10.05 2.4h-8.1v.078c0 .119.048.234.132.318l3.072 3.072c.253.253.396.597.396.955v2.498l.9-.449V6.823c0-.358.143-.702.396-.955l3.072-3.072a.45.45 0 0 0 .132-.318zm.9.078c0 .357-.142.7-.395.954L7.48 6.505a.45.45 0 0 0-.131.318V9.43l-2.7 1.35V6.822a.45.45 0 0 0-.131-.318L1.445 3.432a1.35 1.35 0 0 1-.395-.954V1.5h9.9z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M14 2.5H2v.305c0 .208.082.409.228.558l4.46 4.575c.328.337.512.788.512 1.257v3.986l1.6-.82V9.195c0-.47.184-.92.512-1.257l4.46-4.575A.8.8 0 0 0 14 2.805zm1 .305c0 .47-.183.92-.51 1.257l-4.463 4.575a.8.8 0 0 0-.227.558v3.778l-.272.138L6.2 14.818V9.195a.8.8 0 0 0-.227-.558L1.51 4.062A1.8 1.8 0 0 1 1 2.805V1.5h14z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M17.95 3.549H3.05v.365c0 .26.106.507.293.687l5.575 5.336c.404.386.632.921.632 1.48v4.677l1.9-.986v-3.691c0-.559.228-1.094.632-1.48L17.657 4.6a.95.95 0 0 0 .293-.687zm1.1.365a2.05 2.05 0 0 1-.632 1.48l-5.575 5.337a.95.95 0 0 0-.293.686v4.36l-4.1 2.126v-6.486a.95.95 0 0 0-.293-.686L2.582 5.395a2.05 2.05 0 0 1-.632-1.48V2.448h17.1z" fill="currentColor"/>`,
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

const FilterOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

FilterOutlinedIcon.displayName = "FilterOutlinedIcon";

export default FilterOutlinedIcon;
