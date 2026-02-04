import * as React from "react";
import type { IconProps } from "./types";

/**
 * EditOutlinedIcon icon component.
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
      __html: `<path d="M6.832 3.076c.12 0 .236.045.321.13L8.858 4.9a.45.45 0 0 1 .005.634L4.94 9.55H11a.45.45 0 0 1 0 .9H1a.45.45 0 0 1 0-.9h.882V8.137a.45.45 0 0 1 .128-.315l4.504-4.611a.45.45 0 0 1 .318-.135M2.782 8.32v1.06H3.85l4.058-4.155-1.066-1.06zm5.583-6.806a.906.906 0 0 1 1.276 0l1.064 1.056a.9.9 0 0 1 0 1.276l-.833.827a.45.45 0 0 1-.634 0L7.532 2.978a.45.45 0 0 1 0-.638zm.636.637-.002.001-.51.507 1.066 1.06.514-.511L9.007 2.15z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M8.962 4.14a.5.5 0 0 1 .358.147l2.318 2.32a.5.5 0 0 1 .006.7L5.638 13.5h9.364a.5.5 0 1 1 0 1h-14a.5.5 0 0 1 0-1H2.4a.5.5 0 0 1-.057-.226v-2.32a.5.5 0 0 1 .14-.348l6.124-6.314a.5.5 0 0 1 .355-.151m-5.619 7.016v1.617h1.608l5.632-5.808L8.97 5.353zm7.78-9.188a1.116 1.116 0 0 1 1.579 0l1.446 1.447a1.116 1.116 0 0 1 0 1.58l-1.13 1.131a.5.5 0 0 1-.709 0l-2.318-2.32a.5.5 0 0 1 0-.706zm.872.707a.116.116 0 0 0-.165 0l-.779.778 1.612 1.612.778-.778a.116.116 0 0 0 0-.165z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M11.146 5.47a.55.55 0 0 1 .393.161l2.708 2.708a.55.55 0 0 1 .006.771L7.23 16.35H18.5a.55.55 0 1 1 0 1.1h-17a.55.55 0 1 1 0-1.1h2.013a.54.54 0 0 1-.063-.25v-2.707a.55.55 0 0 1 .155-.383l7.15-7.373a.55.55 0 0 1 .39-.167M4.55 13.615v1.936h1.926l6.61-6.817-1.93-1.931zm9.142-10.692a1.27 1.27 0 0 1 1.796 0l1.69 1.69a1.27 1.27 0 0 1 0 1.795l-1.322 1.323a.55.55 0 0 1-.778 0L12.37 5.023a.55.55 0 0 1 0-.779zm1.018.778a.17.17 0 0 0-.24 0l-.933.932 1.93 1.93.932-.932a.17.17 0 0 0 0-.24z" fill="currentColor"/>`,
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

const EditOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

EditOutlinedIcon.displayName = "EditOutlinedIcon";

export default EditOutlinedIcon;
