import * as React from "react";
import type { IconProps } from "./types";

/**
 * FilterOutlinedIcon icon component.
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
      __html: `<path fill="currentColor" d="M10.5 2.907c0-.346-.001-.553-.023-.7a.5.5 0 0 0-.028-.12l-.01-.017c-.002-.002-.028-.03-.178-.049A7 7 0 0 0 9.5 2h-7c-.367 0-.595 0-.76.021-.15.02-.177.047-.178.05l-.011.017a.5.5 0 0 0-.029.118c-.02.148-.022.355-.022.701v.345c0 .27 0 .435.014.56.011.112.03.152.044.175a.5.5 0 0 0 .148.136c.11.077.265.165.51.303l1.457.82c.296.166.512.284.674.425q.473.408.61 1.014c.046.21.043.444.043.752V8.77l.002.29c.002.077.005.136.01.186q.009.066.015.081l.006.013.017.015q.018.016.084.051c.099.051.238.106.471.197.484.19.797.311 1.032.367.112.026.179.03.218.028.031-.002.041-.007.046-.01s.008-.005.016-.02a.6.6 0 0 0 .047-.175C6.998 9.577 7 9.266 7 8.771V7.437c0-.308-.003-.543.044-.752.09-.405.294-.74.61-1.014.161-.14.377-.26.673-.426l1.457-.82c.245-.137.4-.225.51-.302a.5.5 0 0 0 .148-.136.4.4 0 0 0 .044-.175c.013-.125.014-.29.014-.56zm1 .345c0 .25 0 .474-.018.662-.021.2-.068.398-.184.59-.115.19-.267.325-.434.44-.158.11-.36.224-.59.353l-1.457.82c-.34.192-.443.253-.508.31a.84.84 0 0 0-.29.475c-.016.076-.019.175-.019.535V8.77c0 .46.001.865-.048 1.178-.052.329-.176.672-.52.887-.336.21-.7.185-1.026.107-.319-.075-.71-.229-1.165-.407a6 6 0 0 1-.566-.24 1.2 1.2 0 0 1-.456-.376 1.16 1.16 0 0 1-.2-.558C4 9.192 4 8.987 4 8.772V7.436c0-.36-.003-.46-.02-.535a.84.84 0 0 0-.289-.475c-.065-.057-.168-.118-.508-.31l-1.457-.82c-.23-.129-.432-.242-.59-.353a1.45 1.45 0 0 1-.434-.44 1.4 1.4 0 0 1-.183-.59C.499 3.726.5 3.501.5 3.252v-.345c0-.316-.001-.607.032-.843.037-.253.122-.512.346-.722.219-.206.482-.28.736-.313C1.857 1 2.16 1 2.5 1h7c.34 0 .643-.001.886.03.254.031.517.106.736.312.224.21.31.47.346.722.034.236.032.527.032.843z"/>`,
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
