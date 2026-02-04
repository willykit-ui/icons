import * as React from "react";
import type { IconProps } from "./types";

/**
 * Laptop3OutlinedIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path d="M9.2.55c.69.001 1.25.56 1.25 1.25v5.5q-.001.049-.01.096l.026.05 1.329 3.099a.65.65 0 0 1-.598.906H.804a.65.65 0 0 1-.597-.906l1.328-3.1q.011-.025.024-.049a1 1 0 0 1-.009-.095V1.8c0-.69.56-1.25 1.25-1.25zm-8.017 10h9.635L9.704 7.952H2.297zM3.4 9.402a.4.4 0 1 1 0 .8.4.4 0 0 1 0-.8m1.3 0a.4.4 0 1 1 .002.8.4.4 0 0 1-.001-.8m1.302 0a.4.4 0 1 1 0 .8.4.4 0 0 1 0-.8m1.296 0a.4.4 0 1 1 .001.8.4.4 0 0 1 0-.8m1.301 0a.4.4 0 1 1 .001.8.4.4 0 0 1 0-.8m-4.55-1a.35.35 0 1 1 0 .7.35.35 0 0 1 0-.7m1.301 0a.35.35 0 1 1 0 .7.35.35 0 0 1 0-.7m1.301 0a.35.35 0 1 1 0 .7.35.35 0 0 1 0-.7m1.3 0a.35.35 0 1 1 .001.7.35.35 0 0 1 0-.7m-5.15-6.95a.35.35 0 0 0-.35.35v5.25h7.1V1.8a.35.35 0 0 0-.35-.35z" fill="currentColor"/></g><defs><clipPath id="a"><path d="M0 0h12v12H0z" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M12.3 1A1.7 1.7 0 0 1 14 2.7v7.258l.003.005.064.118 1.574 3.51A1 1 0 0 1 14.728 15H1.273a1 1 0 0 1-.913-1.41l1.574-3.509.063-.118L2 9.958V2.7A1.7 1.7 0 0 1 3.7 1zM1.273 14h13.455l-1.552-3.46H2.824zM4 12.53a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1m2 0a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1m4 0a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1m2 0a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1m-4-.03a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1m-3-1.3a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1m2 0a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1m2 0a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1m2 0a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1M3.7 2a.7.7 0 0 0-.7.7v6.84h10V2.7a.7.7 0 0 0-.7-.7z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M15.3 1.95a1.95 1.95 0 0 1 1.95 1.95v8.63l.008.01.078.127 2.248 4.305a1.078 1.078 0 0 1-.955 1.577H1.37c-.81 0-1.33-.86-.955-1.577l2.248-4.305.078-.128.005-.007.003-8.634A1.95 1.95 0 0 1 4.7 1.95zM1.407 17.45h17.186l-2.227-4.262H3.634zm3.845-2.05a.65.65 0 1 1 0 1.298.65.65 0 0 1 0-1.299m2.398 0a.65.65 0 1 1 0 1.298.65.65 0 0 1 0-1.299m2.399 0a.65.65 0 1 1 0 1.299.65.65 0 0 1 0-1.3m2.402 0a.65.65 0 1 1 0 1.298.65.65 0 0 1 0-1.299m2.399 0a.65.65 0 1 1 0 1.298.65.65 0 0 1 0-1.299m-8.352-1.5a.6.6 0 1 1 0 1.2.6.6 0 0 1 0-1.2m2.402 0a.6.6 0 1 1 .001 1.2.6.6 0 0 1 0-1.2m2.399 0a.6.6 0 1 1 0 1.2.6.6 0 0 1 0-1.2m2.402 0a.6.6 0 1 1 0 1.2.6.6 0 0 1 0-1.2M4.7 3.048a.85.85 0 0 0-.85.85l-.002 8.189H16.15V3.899a.85.85 0 0 0-.85-.85z" fill="currentColor"/>`,
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

const Laptop3OutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

Laptop3OutlinedIcon.displayName = "Laptop3OutlinedIcon";

export default Laptop3OutlinedIcon;
