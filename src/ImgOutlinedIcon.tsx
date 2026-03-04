import * as React from "react";
import type { IconProps } from "./types";

/**
 * ImgOutlinedIcon icon component.
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
      __html: `<g fillRule="evenodd" clipPath="url(#a)" clipRule="evenodd"><path d="M7.999 2.55a1.45 1.45 0 1 1 0 2.9 1.45 1.45 0 0 1 0-2.9m0 .9a.55.55 0 1 0 0 1.1.55.55 0 0 0 0-1.1" fill="currentColor"/><path d="M9.256.513A2.5 2.5 0 0 1 11.5 3v6l-.013.256a2.5 2.5 0 0 1-2.231 2.231L9 11.5H3A2.5 2.5 0 0 1 .513 9.256L.5 9V3A2.5 2.5 0 0 1 3 .5h6zM3.129 5.854a.7.7 0 0 0-.956-.032l-.673.59a.5.5 0 0 1-.1.063V9A1.6 1.6 0 0 0 3 10.6h6a1.6 1.6 0 0 0 1.315-.69.5.5 0 0 1-.142-.1L8.577 8.125a1.05 1.05 0 0 0-1.295-.07l-.15.105A1.45 1.45 0 0 1 5.274 8zM3 1.4A1.6 1.6 0 0 0 1.4 3v2.303l.18-.157a1.6 1.6 0 0 1 2.186.072L5.91 7.362a.55.55 0 0 0 .705.062l.15-.105a1.95 1.95 0 0 1 2.295.038l.13.108.013.012.013.013L10.6 8.95V3A1.6 1.6 0 0 0 9 1.4z" fill="currentColor"/></g><defs><clipPath id="a"><path d="M0 0h12v12H0z" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path fillRule="evenodd" d="M10.665 3.5a1.834 1.834 0 1 1 0 3.668 1.834 1.834 0 0 1 0-3.668m0 1a.833.833 0 1 0 0 1.667.833.833 0 0 0 0-1.667" clipRule="evenodd" fill="currentColor"/><path fillRule="evenodd" d="M12.154 1.004A3 3 0 0 1 15 4v8l-.004.154a3 3 0 0 1-2.842 2.842L12 15H4a3 3 0 0 1-2.996-2.846L1 12V4a3 3 0 0 1 3-3h8zm-7.91 6.732a1.034 1.034 0 0 0-1.412-.047L2 8.416V12a2 2 0 0 0 2 2h8a2 2 0 0 0 1.83-1.197.5.5 0 0 1-.163-.097l-2.15-1.933a1.5 1.5 0 0 0-1.866-.113l-.198.14a1.83 1.83 0 0 1-2.35-.204zM4 2a2 2 0 0 0-2 2v3.088l.173-.151a2.034 2.034 0 0 1 2.777.092l2.86 2.86a.83.83 0 0 0 1.068.092l.2-.14a2.5 2.5 0 0 1 3.109.188L14 11.66V4a2 2 0 0 0-2-2z" clipRule="evenodd" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path fillRule="evenodd" d="M13.332 4.45a2.217 2.217 0 1 1 0 4.434 2.217 2.217 0 0 1 0-4.434m0 1.1a1.118 1.118 0 1 0 0 2.235 1.118 1.118 0 0 0 0-2.235" clipRule="evenodd" fill="currentColor"/><path fillRule="evenodd" d="M15.18 1.505A3.5 3.5 0 0 1 18.5 5v10l-.005.18a3.5 3.5 0 0 1-3.315 3.315L15 18.5H5a3.5 3.5 0 0 1-3.495-3.32L1.5 15v-4.672a.55.55 0 0 1 0-.416V5A3.5 3.5 0 0 1 5 1.5h10zM5.356 9.616a1.367 1.367 0 0 0-1.866-.062l-.89.779V15A2.4 2.4 0 0 0 5 17.4h10a2.4 2.4 0 0 0 2.227-1.507.6.6 0 0 1-.093-.067l-2.687-2.418a1.95 1.95 0 0 0-2.425-.145l-.248.175a2.22 2.22 0 0 1-2.842-.247zM5 2.6A2.4 2.4 0 0 0 2.6 5v3.871l.166-.144a2.466 2.466 0 0 1 3.368.112l3.575 3.574c.384.384.988.436 1.432.124l.249-.175a3.05 3.05 0 0 1 3.794.229l2.216 1.995V5A2.4 2.4 0 0 0 15 2.6z" clipRule="evenodd" fill="currentColor"/>`,
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

const ImgOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

ImgOutlinedIcon.displayName = "ImgOutlinedIcon";

export default ImgOutlinedIcon;
