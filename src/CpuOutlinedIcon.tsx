import * as React from "react";
import type { IconProps } from "./types";

/**
 * CpuOutlinedIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path fill="currentColor" d="M9.5 6c0-.957 0-1.624-.068-2.128-.066-.49-.187-.748-.371-.933-.185-.184-.444-.305-.933-.37C7.624 2.5 6.957 2.5 6 2.5s-1.624 0-2.128.068c-.49.066-.748.187-.933.371-.184.185-.305.444-.37.933C2.5 4.376 2.5 5.043 2.5 6s0 1.624.068 2.128c.066.49.187.748.371.933.185.184.444.305.933.37C4.376 9.5 5.043 9.5 6 9.5s1.624 0 2.128-.068c.49-.066.748-.187.933-.371.184-.185.305-.444.37-.933C9.5 7.624 9.5 6.957 9.5 6M8 5c0-.367-.002-.593-.023-.756-.02-.149-.049-.17-.05-.17-.002-.002-.022-.03-.171-.05C7.593 4.001 7.367 4 7 4H5c-.367 0-.593.002-.756.023-.149.02-.17.049-.17.05-.002.002-.03.022-.05.171C4.001 4.407 4 4.633 4 5v2c0 .367.002.593.023.756.02.149.049.17.05.17.002.002.022.03.171.05.163.022.389.024.756.024h2c.367 0 .593-.002.756-.023.149-.02.17-.049.17-.05.002-.002.03-.022.05-.171C7.999 7.593 8 7.367 8 7zm2.5 1q0 .54-.006 1H11a.5.5 0 0 1 0 1h-.549q-.012.135-.03.26c-.08.6-.252 1.106-.653 1.508-.402.4-.907.573-1.507.654A6 6 0 0 1 8 10.45V11a.5.5 0 0 1-1 0v-.507a70 70 0 0 1-2 0V11a.5.5 0 0 1-1 0v-.55a6 6 0 0 1-.26-.028c-.6-.08-1.106-.253-1.508-.654-.4-.402-.573-.907-.654-1.507A6 6 0 0 1 1.548 8H1a.5.5 0 0 1 0-1h.506a71 71 0 0 1 0-2H1a.5.5 0 0 1 0-1h.549q.012-.135.03-.26c.08-.6.252-1.106.653-1.508.402-.4.907-.573 1.507-.654q.125-.016.261-.03V1a.5.5 0 0 1 1 0v.506a71 71 0 0 1 2 0V1a.5.5 0 0 1 1 0v.549q.135.012.26.03c.6.08 1.106.252 1.508.653.4.402.573.907.654 1.507q.017.125.03.261H11a.5.5 0 0 1 0 1h-.506q.007.46.006 1M9 7c0 .34 0 .644-.032.89-.035.26-.116.526-.334.744s-.485.299-.744.334C7.644 9 7.34 9 7 9H5c-.34 0-.644 0-.89-.032-.26-.035-.526-.116-.744-.334s-.299-.485-.334-.744C3 7.644 3 7.34 3 7V5c0-.34 0-.644.032-.89.035-.26.116-.526.334-.744s.485-.299.744-.334C4.356 3 4.66 3 5 3h2c.34 0 .644 0 .89.032.26.035.526.116.744.334s.299.485.334.744C9 4.356 9 4.66 9 5z"/></g><defs><clipPath id="a"><path fill="currentColor" d="M0 0h12v12H0z"/></clipPath></defs>`,
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

const CpuOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

CpuOutlinedIcon.displayName = "CpuOutlinedIcon";

export default CpuOutlinedIcon;
