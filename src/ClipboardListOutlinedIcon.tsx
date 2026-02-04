import * as React from "react";
import type { IconProps } from "./types";

/**
 * ClipboardListOutlinedIcon icon component.
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
      __html: `<path d="M10.05 3.3a.85.85 0 0 0-.85-.849h-.882c-.119.515-.58.9-1.13.9H4.813a1.16 1.16 0 0 1-1.132-.9H2.8a.85.85 0 0 0-.85.85v6.4c0 .47.38.85.85.85h6.4c.47 0 .85-.38.85-.85zM3.967 8.134a.45.45 0 0 1 0 .9h-.29a.45.45 0 0 1 0-.9zm4.395 0a.45.45 0 0 1 0 .9H5.326a.45.45 0 0 1 0-.9zM3.967 6.49a.45.45 0 0 1 0 .9h-.29a.45.45 0 0 1 0-.9zm4.395 0a.45.45 0 0 1 0 .9H5.326a.45.45 0 0 1 0-.9zM3.967 4.844a.45.45 0 0 1 0 .9h-.29a.45.45 0 0 1 0-.9zm4.395 0a.45.45 0 0 1 0 .9H5.326a.45.45 0 0 1 0-.9zM4.812 1.45a.263.263 0 0 0-.262.263v.474c0 .145.118.263.263.263h2.375a.26.26 0 0 0 .261-.263v-.474a.26.26 0 0 0-.261-.263zM10.95 9.7a1.75 1.75 0 0 1-1.75 1.75H2.8A1.75 1.75 0 0 1 1.05 9.7V3.3c0-.967.783-1.75 1.75-1.75h.862c.08-.565.564-1 1.15-1h2.375c.587 0 1.07.435 1.15 1H9.2c.966 0 1.75.783 1.75 1.75z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M5.146 11.074a.5.5 0 0 1 0 1h-.4a.5.5 0 1 1 0-1zm6.08 0a.5.5 0 0 1 0 1h-4.2a.5.5 0 1 1 0-1zm-6.08-2.27a.5.5 0 0 1 0 1h-.4a.5.5 0 0 1 0-1zm6.08 0a.5.5 0 0 1 0 1h-4.2a.5.5 0 0 1 0-1zm-6.08-2.28a.5.5 0 0 1 0 1h-.4a.5.5 0 1 1 0-1zm6.08 0a.5.5 0 0 1 0 1h-4.2a.5.5 0 1 1 0-1zM10 2.3a.3.3 0 0 0-.3-.3H6.3a.3.3 0 0 0-.3.3v1.4a.3.3 0 0 0 .3.3h3.4a.3.3 0 0 0 .3-.3zm4.5 10.2A2.5 2.5 0 0 1 12 15H4a2.5 2.5 0 0 1-2.5-2.5v-8A2.5 2.5 0 0 1 4 2h1.036A1.3 1.3 0 0 1 6.3 1h3.4a1.3 1.3 0 0 1 1.264 1H12a2.5 2.5 0 0 1 2.5 2.5zM11 3.7A1.3 1.3 0 0 1 9.7 5H6.3A1.3 1.3 0 0 1 5 3.7V3H4a1.5 1.5 0 0 0-1.5 1.5v8A1.5 1.5 0 0 0 4 14h8a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 12 3h-1z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M6.547 13.502a.55.55 0 1 1 0 1.1h-.6a.55.55 0 0 1 0-1.1zm7.452 0a.55.55 0 1 1 0 1.1h-5.8a.55.55 0 0 1 0-1.1zm-7.452-2.701a.55.55 0 1 1 0 1.1h-.6a.55.55 0 0 1 0-1.1zm7.452 0a.55.55 0 1 1 0 1.1h-5.8a.55.55 0 0 1 0-1.1zM6.547 8.1a.55.55 0 1 1 0 1.1h-.6a.55.55 0 0 1 0-1.1zm7.452 0a.55.55 0 1 1 0 1.1h-5.8a.55.55 0 0 1 0-1.1zM12.45 2.799a.25.25 0 0 0-.25-.25H7.8a.25.25 0 0 0-.25.25v1.4c0 .138.112.25.25.25h4.4a.25.25 0 0 0 .25-.25zm1.1 1.4a1.35 1.35 0 0 1-1.35 1.35H7.8a1.35 1.35 0 0 1-1.35-1.35v-.15H5.3a1.75 1.75 0 0 0-1.75 1.75v9.9c0 .967.783 1.75 1.75 1.75h9.4a1.75 1.75 0 0 0 1.75-1.75V5.8a1.75 1.75 0 0 0-1.75-1.75h-1.15zm0-1.25h1.15a2.85 2.85 0 0 1 2.85 2.85v9.9a2.85 2.85 0 0 1-2.85 2.85H5.3a2.85 2.85 0 0 1-2.85-2.85V5.8A2.85 2.85 0 0 1 5.3 2.95h1.15V2.8c0-.746.604-1.35 1.35-1.35h4.4c.746 0 1.35.604 1.35 1.35z" fill="currentColor"/>`,
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

const ClipboardListOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

ClipboardListOutlinedIcon.displayName = "ClipboardListOutlinedIcon";

export default ClipboardListOutlinedIcon;
