import * as React from "react";
import type { IconProps } from "./types";

/**
 * UbeOutlinedIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path fill="currentColor" d="M10.5 5.97c0-.64 0-1.085-.035-1.434a3 3 0 0 0-.027-.197L6.5 6.309v4.075l.05-.019c.253-.104.56-.264 1.007-.499l1-.524c.547-.287.923-.486 1.202-.672.268-.18.413-.326.511-.493.1-.169.162-.375.195-.713.034-.349.035-.794.035-1.435zM6 1.5c-.148 0-.308.034-.55.135-.253.104-.56.264-1.007.499l-1 .524c-.547.287-.923.486-1.202.672a3 3 0 0 0-.19.137L6 5.44l3.947-1.973a3 3 0 0 0-.188-.137c-.28-.186-.655-.385-1.202-.672l-1-.524a14 14 0 0 0-1.006-.5C6.308 1.535 6.148 1.5 6 1.5M1.5 6.03c0 .64 0 1.085.035 1.434.034.338.095.544.194.713.099.167.244.314.512.493.28.186.655.385 1.202.672l1 .524c.447.235.754.395 1.006.5q.026.008.051.018V6.309l-3.94-1.97q-.015.09-.025.197c-.034.349-.035.794-.035 1.435zm10 0c0 .62 0 1.122-.04 1.532-.041.42-.129.783-.328 1.122-.2.34-.474.588-.817.818-.334.223-.765.447-1.294.725l-1 .525c-.43.226-.783.411-1.087.537-.314.13-.61.211-.934.211s-.62-.081-.934-.21a15 15 0 0 1-1.087-.538l-1-.525c-.529-.278-.96-.502-1.293-.725-.344-.23-.617-.478-.818-.818S.581 7.98.54 7.562C.5 7.152.5 6.65.5 6.029v-.058c0-.622 0-1.123.04-1.533.041-.42.129-.783.328-1.122.2-.34.474-.588.818-.818.333-.223.764-.447 1.293-.725l1-.525c.43-.226.783-.411 1.087-.537C5.38.58 5.676.5 6 .5s.62.081.934.21c.304.127.657.312 1.087.538l1 .525c.529.278.96.502 1.293.725.344.23.617.478.818.818s.287.703.328 1.122c.04.41.04.911.04 1.533z"/></g><defs><clipPath id="a"><path fill="currentColor" d="M0 0h12v12H0z"/></clipPath></defs>`,
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

const UbeOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

UbeOutlinedIcon.displayName = "UbeOutlinedIcon";

export default UbeOutlinedIcon;
