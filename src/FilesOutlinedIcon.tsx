import * as React from "react";
import type { IconProps } from "./types";

/**
 * FilesOutlinedIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path d="M.55 9.701v-5.4c0-.967.783-1.75 1.75-1.75h1.052V2.3A1.75 1.75 0 0 1 5.102.55h2.36c.465 0 .91.184 1.238.512l2.24 2.239c.328.328.511.773.511 1.237V7.7a1.75 1.75 0 0 1-1.75 1.75h-1.05v.25a1.75 1.75 0 0 1-1.75 1.75H2.3A1.75 1.75 0 0 1 .55 9.7m4.853-3.95h1.698L5.403 4.077zm2.801-2h1.697L8.204 2.077zM1.45 9.701c0 .47.38.85.85.85h4.6c.47 0 .85-.38.85-.85V6.74l-.005-.088H5.113a.61.61 0 0 1-.61-.61v-2.59H2.3a.85.85 0 0 0-.85.849zm2.801-7.15h.21c.465 0 .91.184 1.238.512l2.439 2.439q.034.036.066.073l.031.031q.067.068.109.145c.198.289.306.633.306.988v1.812h1.051c.47 0 .85-.38.85-.85v-3.05H7.915a.61.61 0 0 1-.61-.61v-2.59H5.102a.85.85 0 0 0-.851.85z" fill="currentColor"/></g><defs><clipPath id="a"><rect width="12" height="12" rx="2" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M1 12.498V6.1a2.5 2.5 0 0 1 2.5-2.5h1.142v-.1a2.5 2.5 0 0 1 2.5-2.5h2.63a2.5 2.5 0 0 1 1.768.732l2.728 2.728A2.5 2.5 0 0 1 15 6.228v3.67a2.5 2.5 0 0 1-2.5 2.5h-1.142v.1a2.5 2.5 0 0 1-2.5 2.5H3.5a2.5 2.5 0 0 1-2.5-2.5m6.14-4.74h2.498L7.14 5.296zm3.641-2.599h2.497l-2.497-2.464zM2 12.498a1.5 1.5 0 0 0 1.5 1.5h5.358a1.5 1.5 0 0 0 1.5-1.5V9.087q-.001-.167-.038-.328H6.85a.71.71 0 0 1-.708-.708V4.625a1.5 1.5 0 0 0-.27-.025H3.5A1.5 1.5 0 0 0 2 6.1zM5.642 3.6h.23c.454 0 .894.126 1.277.355q.065.03.124.076a2.5 2.5 0 0 1 .366.301l2.987 2.987q.043.044.082.09l.139.138c.092.091.15.197.182.306.213.373.33.797.33 1.234v2.311H12.5a1.5 1.5 0 0 0 1.5-1.5v-3.67q-.001-.036-.004-.07l-.006.001h-3.5a.71.71 0 0 1-.709-.708V2h-2.64a1.5 1.5 0 0 0-1.5 1.501z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M1.45 15.696V7.5A2.85 2.85 0 0 1 4.3 4.65h1.632V4.3a2.85 2.85 0 0 1 2.85-2.85h3.466c.756 0 1.481.3 2.016.835l3.452 3.451a2.85 2.85 0 0 1 .834 2.016v4.746a2.85 2.85 0 0 1-2.85 2.85h-1.632v.35a2.85 2.85 0 0 1-2.85 2.85H4.3a2.85 2.85 0 0 1-2.85-2.85M8.877 9.77h3.298L8.877 6.514zm4.48-3.2h3.3l-3.3-3.255zM2.55 15.696c0 .967.783 1.75 1.75 1.75h6.918a1.75 1.75 0 0 0 1.75-1.75v-4.425q-.001-.207-.05-.406l-.025.003h-4.31a.806.806 0 0 1-.806-.806V5.81l.002-.03a2 2 0 0 0-.333-.032H4.3a1.75 1.75 0 0 0-1.75 1.75zM7.032 4.648h.414c.756 0 1.481.3 2.016.835l3.771 3.772q.053.054.101.111l.124.122a.8.8 0 0 1 .2.316c.264.44.41.945.41 1.467v2.976H15.7a1.75 1.75 0 0 0 1.75-1.75V7.751q-.001-.045-.005-.089-.034.005-.072.006h-4.31a.806.806 0 0 1-.805-.806v-4.25q0-.033.004-.063h-3.48a1.75 1.75 0 0 0-1.75 1.75z" fill="currentColor"/>`,
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

const FilesOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

FilesOutlinedIcon.displayName = "FilesOutlinedIcon";

export default FilesOutlinedIcon;
