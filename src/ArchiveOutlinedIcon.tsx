import * as React from "react";
import type { IconProps } from "./types";

/**
 * ArchiveOutlinedIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path d="M9.555 3.951h-7.11q.004.025.005.05v5.7c0 .47.38.85.85.85h5.4c.47 0 .85-.38.85-.85v-5.7q.001-.025.005-.05M7 5.051a.45.45 0 0 1 0 .9H5a.45.45 0 0 1 0-.9zm3.55-2.8a.8.8 0 0 0-.8-.8h-7.5a.8.8 0 1 0 0 1.6h7.5a.8.8 0 0 0 .8-.8m.9 0a1.7 1.7 0 0 1-1.04 1.566q.039.085.04.184v5.7a1.75 1.75 0 0 1-1.75 1.75H3.3a1.75 1.75 0 0 1-1.75-1.75v-5.7q0-.099.039-.184A1.7 1.7 0 0 1 2.25.551h7.5a1.7 1.7 0 0 1 1.7 1.7" fill="currentColor"/></g><defs><clipPath id="a"><path d="M0 0h12v12H0z" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M13 5H3v7.5A1.5 1.5 0 0 0 4.5 14h7a1.5 1.5 0 0 0 1.5-1.5zM9.5 7a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1zM14 2.8a.8.8 0 0 0-.8-.8H2.8a.8.8 0 0 0-.8.8v.4a.8.8 0 0 0 .8.8h10.4a.8.8 0 0 0 .8-.8zm1 .4c0 .706-.408 1.316-1 1.61v7.69a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 12.5V4.81c-.592-.294-1-.904-1-1.61v-.4A1.8 1.8 0 0 1 2.8 1h10.4A1.8 1.8 0 0 1 15 2.8z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M16.15 6.549H3.85v9.45c0 .8.65 1.45 1.45 1.45h9.4c.8 0 1.45-.65 1.45-1.45zm-3.851 1.4a.55.55 0 1 1 0 1.1h-4.6a.55.55 0 1 1 0-1.1zM17.45 3.3a.75.75 0 0 0-.75-.75H3.3a.75.75 0 0 0-.75.75v1.4c0 .414.336.75.75.75h13.4a.75.75 0 0 0 .75-.75zm1.1 1.4a1.85 1.85 0 0 1-1.3 1.767V16a2.55 2.55 0 0 1-2.55 2.55H5.3A2.55 2.55 0 0 1 2.75 16V6.466a1.85 1.85 0 0 1-1.3-1.767V3.3A1.85 1.85 0 0 1 3.3 1.45h13.4a1.85 1.85 0 0 1 1.85 1.85z" fill="currentColor"/>`,
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

const ArchiveOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

ArchiveOutlinedIcon.displayName = "ArchiveOutlinedIcon";

export default ArchiveOutlinedIcon;
