import * as React from "react";
import type { IconProps } from "./types";

/**
 * DangerTriangleOutlinedIcon icon component.
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
      __html: `<path fill="currentColor" d="M7.995 1.5c.999 0 1.755.577 2.47 1.484.708.9 1.46 2.235 2.424 3.945l.243.43c.8 1.417 1.43 2.534 1.76 3.428.335.905.414 1.727-.091 2.451-.49.703-1.309.99-2.34 1.126-1.036.137-2.431.136-4.224.136h-.485c-1.793 0-3.188 0-4.224-.136-1.031-.136-1.85-.423-2.34-1.126-.505-.724-.425-1.546-.091-2.45.33-.895.962-2.012 1.761-3.43l.243-.43c.964-1.709 1.715-3.044 2.423-3.944C6.24 2.077 6.996 1.5 7.995 1.5m0 1c-.542 0-1.041.286-1.684 1.103-.65.824-1.358 2.077-2.34 3.817l-.243.43c-.817 1.449-1.397 2.482-1.693 3.283-.292.79-.252 1.21-.026 1.533.24.345.692.58 1.65.707.955.126 2.27.127 4.093.127h.485c1.822 0 3.138-.001 4.093-.127.959-.126 1.41-.362 1.65-.707.226-.323.266-.743-.026-1.533-.296-.8-.876-1.834-1.693-3.283l-.242-.43c-.982-1.74-1.69-2.993-2.34-3.817C9.038 2.786 8.538 2.5 7.996 2.5"/><path fill="currentColor" d="M7.5 8.669V5.336a.5.5 0 1 1 1 0v3.333l-.01.102a.5.5 0 0 1-.98 0zm1.161 1.998a.667.667 0 1 1-1.333 0 .667.667 0 0 1 1.333 0"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path fill="currentColor" d="M9.993 1.875c1.249 0 2.195.721 3.088 1.855.886 1.125 1.825 2.794 3.03 4.931l.303.537c1 1.772 1.79 3.167 2.202 4.285.418 1.131.517 2.159-.115 3.065-.613.879-1.635 1.238-2.925 1.408-1.294.17-3.038.169-5.279.169h-.606c-2.241 0-3.985.001-5.28-.169-1.29-.17-2.312-.53-2.925-1.408-.631-.906-.532-1.934-.115-3.065.413-1.118 1.202-2.514 2.201-4.285l.304-.537c1.205-2.137 2.144-3.806 3.03-4.93.893-1.135 1.839-1.856 3.087-1.856m0 1.25c-.677 0-1.301.358-2.105 1.379C7.076 5.534 6.19 7.1 4.964 9.275l-.303.537c-1.021 1.812-1.747 3.103-2.117 4.104-.365.988-.314 1.513-.032 1.917.3.43.864.726 2.062.884 1.194.157 2.839.158 5.117.158h.606c2.278 0 3.923-.001 5.116-.158 1.198-.158 1.762-.453 2.063-.884.281-.404.332-.929-.033-1.917-.369-1-1.095-2.292-2.117-4.103l-.303-.538c-1.227-2.174-2.112-3.74-2.923-4.771-.804-1.021-1.43-1.379-2.107-1.379"/><path fill="currentColor" d="M9.375 10.837V6.67a.625.625 0 0 1 1.25 0v4.167a.625.625 0 0 1-1.25 0m1.452 2.496a.833.833 0 1 1-1.667 0 .833.833 0 0 1 1.667 0"/>`,
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

const DangerTriangleOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

DangerTriangleOutlinedIcon.displayName = "DangerTriangleOutlinedIcon";

export default DangerTriangleOutlinedIcon;
