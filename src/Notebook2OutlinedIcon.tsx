import * as React from "react";
import type { IconProps } from "./types";

/**
 * Notebook2OutlinedIcon icon component.
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
      __html: `<path fill="currentColor" d="M10.5 9.372a.5.5 0 0 0-.13-.321l-.033-.035-.726-.748H2.39l-.726.748c-.024.025-.03.03-.033.035a.5.5 0 0 0-.13.321v.048l.001.111a.5.5 0 0 0 .468.468l.11.001h7.84l.111-.001a.5.5 0 0 0 .468-.468l.001-.111zM9.323 4c0-.485 0-.799-.032-1.03-.03-.217-.076-.285-.114-.324-.038-.038-.106-.085-.322-.114-.232-.03-.546-.032-1.032-.032H4.177c-.486 0-.8.001-1.031.032-.217.03-.285.076-.323.114s-.085.107-.114.324c-.031.23-.032.545-.032 1.03v3.268h6.646zm1 3.564.732.756.054.057A1.5 1.5 0 0 1 11.5 9.42q0 .1-.003.175a1.5 1.5 0 0 1-1.402 1.402q-.076.004-.175.003H2.08q-.1 0-.175-.003A1.5 1.5 0 0 1 .503 9.595Q.499 9.519.5 9.42l.001-.08a1.5 1.5 0 0 1 .39-.963l.054-.057.732-.756V4c0-.457-.001-.85.04-1.164.045-.328.144-.642.4-.897.254-.254.568-.354.896-.398.313-.042.707-.041 1.164-.041h3.646c.457 0 .851-.001 1.164.041.328.044.642.144.897.398.255.255.354.57.398.897.042.313.041.707.041 1.164z"/><path fill="currentColor" d="M7.25 8.75a.5.5 0 0 1 0 1h-2.5a.5.5 0 0 1 0-1zm-.875-5.375a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0"/>`,
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

const Notebook2OutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

Notebook2OutlinedIcon.displayName = "Notebook2OutlinedIcon";

export default Notebook2OutlinedIcon;
