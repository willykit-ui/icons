import * as React from "react";
import type { IconProps } from "./types";

/**
 * ConsumersOutlinedIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path d="M10.02.5a1.481 1.481 0 0 1 0 2.962 1.48 1.48 0 0 1-1.29-.755l-2.317.53q.01.112.01.225l-.004.152a2.94 2.94 0 0 1-.536 1.55l3.513 3.513a1.48 1.48 0 1 1-.664.61L5.26 5.811c-.46.353-1.026.57-1.642.603l-.68 2.476a1.48 1.48 0 1 1-.837-.347l.61-2.218A2.962 2.962 0 0 1 3.46.5a2.96 2.96 0 0 1 2.749 1.86l2.338-.534A1.48 1.48 0 0 1 10.02.5M1.98 9.438a.58.58 0 1 0 0 1.16.58.58 0 0 0 0-1.16m8.04 0a.58.58 0 1 0 0 1.16.58.58 0 0 0 0-1.16M3.46 1.401a2.06 2.06 0 1 0 .001 4.122 2.06 2.06 0 0 0 0-4.122m6.56 0a.58.58 0 1 0 0 1.16.58.58 0 0 0 0-1.16" fill="currentColor"/></g><defs><clipPath id="a"><rect width="12" height="12" rx="2" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M13.308 1.01c.95.096 1.692.899 1.692 1.875l-.01.192a1.886 1.886 0 0 1-1.875 1.693l-.192-.01a1.89 1.89 0 0 1-1.485-1.018L8.52 4.41q.017.179.018.36l-.005.194a3.75 3.75 0 0 1-.768 2.092l4.42 4.422c.274-.156.591-.247.93-.247l.193.01c.95.097 1.692.9 1.692 1.875l-.01.193a1.885 1.885 0 0 1-1.875 1.692l-.192-.01a1.886 1.886 0 0 1-1.683-1.682l-.01-.193c0-.338.09-.656.247-.93l-4.42-4.422a3.75 3.75 0 0 1-2.161.771l-.85 3.098c.44.345.723.88.724 1.483l-.01.193c-.097.95-.9 1.692-1.875 1.692l-.193-.01a1.885 1.885 0 0 1-1.682-1.682L1 13.115c0-1.04.844-1.885 1.885-1.885l.192.01.037.005.773-2.811a3.77 3.77 0 0 1-2.882-3.471L1 4.77A3.77 3.77 0 0 1 4.77 1l.193.005a3.77 3.77 0 0 1 3.331 2.43l2.942-.672A1.883 1.883 0 0 1 13.116 1zM2.885 12.23a.885.885 0 1 0 0 1.77.885.885 0 0 0 0-1.77m10.23 0a.885.885 0 1 0 0 1.77.885.885 0 0 0 0-1.77M4.77 2a2.77 2.77 0 1 0 0 5.54 2.77 2.77 0 0 0 0-5.54m8.345 0a.885.885 0 1 0 0 1.77.885.885 0 0 0 0-1.77" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M16.21 1.5a2.29 2.29 0 0 1 2.289 2.288l-.012.234a2.29 2.29 0 0 1-2.277 2.055l-.233-.012a2.29 2.29 0 0 1-1.83-1.289l-3.521.805q.028.245.028.496l-.006.236a4.55 4.55 0 0 1-.914 2.514l5.377 5.376a2.29 2.29 0 0 1 3.388 2.008l-.012.234A2.29 2.29 0 0 1 16.21 18.5l-.233-.012A2.29 2.29 0 0 1 14.3 14.95L8.973 9.62a4.56 4.56 0 0 1-2.802 1.031l-1.023 3.723c.563.417.929 1.083.93 1.837l-.013.234A2.29 2.29 0 0 1 3.788 18.5l-.233-.012a2.29 2.29 0 0 1 .233-4.565q.171.002.336.027l.937-3.41a4.58 4.58 0 0 1-3.555-4.227L1.5 6.077A4.577 4.577 0 0 1 6.077 1.5l.236.006a4.58 4.58 0 0 1 4.066 3.004l3.547-.81a2.286 2.286 0 0 1 2.284-2.2M3.788 15.023A1.19 1.19 0 1 0 3.79 17.4a1.19 1.19 0 0 0-.002-2.378m12.422 0a1.19 1.19 0 1 0 .002 2.378 1.19 1.19 0 0 0-.002-2.378M6.077 2.6a3.478 3.478 0 1 0 0 6.955 3.478 3.478 0 0 0 0-6.955m10.133 0a1.19 1.19 0 1 0 .001 2.378A1.19 1.19 0 0 0 16.21 2.6" fill="currentColor"/>`,
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

const ConsumersOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

ConsumersOutlinedIcon.displayName = "ConsumersOutlinedIcon";

export default ConsumersOutlinedIcon;
