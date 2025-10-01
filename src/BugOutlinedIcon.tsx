import * as React from "react";
import type { IconProps } from "./types";

/**
 * BugOutlinedIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path fill="currentColor" d="M9 5.969a1.47 1.47 0 0 0-1.469-1.47H4.47A1.47 1.47 0 0 0 3 5.97V7.5a3 3 0 0 0 2.5 2.959V7.5a.5.5 0 0 1 1 0v2.958A3 3 0 0 0 9 7.5zm-3-3.97a1.75 1.75 0 0 0-1.732 1.51q.1-.009.2-.01h3.063q.102.001.2.01A1.75 1.75 0 0 0 6 2m4 4.5h1a.5.5 0 0 1 0 1h-1a4 4 0 0 1-.384 1.709l.82.328.09.047a.5.5 0 0 1-.364.909l-.098-.028-.997-.399A3.99 3.99 0 0 1 6 11.5a3.99 3.99 0 0 1-3.068-1.435l-.996.399a.5.5 0 1 1-.372-.928l.819-.328A4 4 0 0 1 2 7.5H1a.5.5 0 1 1 0-1h1v-.531c0-.438.115-.849.314-1.206l-.75-.3-.09-.046a.5.5 0 0 1 .364-.91l.098.029 1 .4.079.04q.112-.083.235-.153V3.75c0-.725.282-1.382.74-1.873l-.747-.448-.082-.061a.5.5 0 0 1 .596-.797l1.118.671a2.74 2.74 0 0 1 2.249 0l1.12-.67a.5.5 0 0 1 .513.857l-.748.448c.458.491.741 1.148.741 1.873v.073q.122.07.234.153a1 1 0 0 1 .08-.04l1-.4a.5.5 0 1 1 .371.928l-.75.3c.2.356.315.767.315 1.205z"/></g><defs><clipPath id="a"><rect width="12" height="12" fill="currentColor" rx="1.5"/></clipPath></defs>`,
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

const BugOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

BugOutlinedIcon.displayName = "BugOutlinedIcon";

export default BugOutlinedIcon;
