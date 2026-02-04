import * as React from "react";
import type { IconProps } from "./types";

/**
 * QrCodeOutlinedIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path d="M4.6 6.35c.58 0 1.05.47 1.05 1.05v3c0 .58-.47 1.051-1.05 1.051h-3a1.05 1.05 0 0 1-1.05-1.05v-3c0-.58.47-1.05 1.05-1.05zm2.2 2.851a.45.45 0 0 1 .451.45v.75c0 .082.067.15.15.15h.75a.45.45 0 0 1 0 .9H7.4a1.05 1.05 0 0 1-1.05-1.05v-.75a.45.45 0 0 1 .45-.45m4.201 0a.45.45 0 0 1 .45.45v.75c0 .58-.47 1.05-1.05 1.05h-.75a.45.45 0 0 1 0-.9h.75a.15.15 0 0 0 .15-.15v-.75A.45.45 0 0 1 11 9.2M1.6 7.251a.15.15 0 0 0-.15.15v3c0 .082.067.15.15.15h3a.15.15 0 0 0 .15-.15v-3a.15.15 0 0 0-.15-.15zm1.9 1.05c.11 0 .2.09.2.2v.8a.2.2 0 0 1-.2.2h-.8a.2.2 0 0 1-.2-.2v-.8c0-.11.09-.2.2-.2zm5.8 0c.111 0 .2.09.201.2v.8a.2.2 0 0 1-.2.2h-.8a.2.2 0 0 1-.2-.2v-.8c0-.11.09-.2.2-.2zM8.15 6.35a.45.45 0 0 1 0 .9H7.4a.15.15 0 0 0-.149.15v.75a.45.45 0 0 1-.9 0V7.4c0-.58.47-1.05 1.05-1.05zm2.25 0c.58 0 1.05.47 1.051 1.05v.75a.45.45 0 0 1-.9 0V7.4a.15.15 0 0 0-.15-.15h-.75a.45.45 0 0 1 0-.9zM4.6.55c.58 0 1.05.47 1.05 1.05v3c0 .58-.47 1.05-1.05 1.05h-3A1.05 1.05 0 0 1 .55 4.6v-3c0-.58.47-1.05 1.05-1.05zm5.8 0c.58 0 1.051.47 1.051 1.05v3c0 .58-.47 1.05-1.05 1.05h-3a1.05 1.05 0 0 1-1.05-1.05v-3c0-.58.47-1.05 1.05-1.05zm-8.8.9a.15.15 0 0 0-.15.15v3c0 .082.067.15.15.15h3a.15.15 0 0 0 .15-.15v-3a.15.15 0 0 0-.15-.15zm5.8 0a.15.15 0 0 0-.149.15v3c0 .082.067.15.15.15h3a.15.15 0 0 0 .15-.15v-3a.15.15 0 0 0-.15-.15zM3.5 2.5c.11 0 .2.09.2.2v.8a.2.2 0 0 1-.2.2h-.8a.2.2 0 0 1-.2-.2v-.8c0-.11.09-.2.2-.2zm5.8 0a.2.2 0 0 1 .201.2v.8a.2.2 0 0 1-.2.2h-.8a.2.2 0 0 1-.2-.2v-.8c0-.11.09-.2.2-.2z" fill="currentColor"/></g><defs><clipPath id="a"><rect width="12" height="12" rx="2" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M6.06 8.54a1.4 1.4 0 0 1 1.4 1.4v3.66a1.4 1.4 0 0 1-1.4 1.4H2.4A1.4 1.4 0 0 1 1 13.6V9.94a1.4 1.4 0 0 1 1.4-1.4zm2.983 3.645a.5.5 0 0 1 .5.5v.915c0 .22.18.4.4.4h.915a.5.5 0 0 1 0 1h-.915a1.4 1.4 0 0 1-1.4-1.4v-.915a.5.5 0 0 1 .5-.5m5.46 0a.5.5 0 0 1 .5.5v.915a1.4 1.4 0 0 1-1.4 1.4h-.915a.5.5 0 0 1 0-1h.914a.4.4 0 0 0 .4-.4v-.915a.5.5 0 0 1 .5-.5M2.4 9.54a.4.4 0 0 0-.4.4v3.66c0 .22.18.4.4.4h3.66a.4.4 0 0 0 .4-.4V9.94a.4.4 0 0 0-.4-.4zm2.349 1.45a.26.26 0 0 1 .26.26v1.04a.26.26 0 0 1-.26.26h-1.04a.26.26 0 0 1-.26-.26v-1.04a.26.26 0 0 1 .26-.26zm7.543 0a.26.26 0 0 1 .26.26v1.04a.26.26 0 0 1-.26.26h-1.04a.26.26 0 0 1-.26-.26v-1.04a.26.26 0 0 1 .26-.26zm-1.434-2.45a.5.5 0 0 1 0 1h-.915a.4.4 0 0 0-.4.4v.915a.5.5 0 0 1-1 0V9.94a1.4 1.4 0 0 1 1.4-1.4zm2.744 0a1.4 1.4 0 0 1 1.4 1.4v.915a.5.5 0 0 1-1 0V9.94a.4.4 0 0 0-.4-.4h-.915a.5.5 0 0 1 0-1zM6.06 1a1.4 1.4 0 0 1 1.4 1.4v3.66a1.4 1.4 0 0 1-1.4 1.4H2.4A1.4 1.4 0 0 1 1 6.06V2.4A1.4 1.4 0 0 1 2.4 1zm7.542 0a1.4 1.4 0 0 1 1.4 1.4v3.66a1.4 1.4 0 0 1-1.4 1.4H9.944a1.4 1.4 0 0 1-1.4-1.4V2.4a1.4 1.4 0 0 1 1.4-1.4zM2.4 2a.4.4 0 0 0-.4.4v3.66c0 .22.18.4.4.4h3.66a.4.4 0 0 0 .4-.4V2.4a.4.4 0 0 0-.4-.4zm7.543 0a.4.4 0 0 0-.4.4v3.66c0 .22.18.4.4.4h3.66a.4.4 0 0 0 .4-.4V2.4a.4.4 0 0 0-.4-.4zM4.75 3.45a.26.26 0 0 1 .26.26v1.04a.26.26 0 0 1-.26.26H3.71a.26.26 0 0 1-.26-.26V3.71a.26.26 0 0 1 .26-.26zm7.543 0a.26.26 0 0 1 .26.26v1.04a.26.26 0 0 1-.26.26h-1.04a.26.26 0 0 1-.26-.26V3.71a.26.26 0 0 1 .26-.26z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M7.42 10.729a1.85 1.85 0 0 1 1.85 1.85v4.12a1.85 1.85 0 0 1-1.85 1.849H3.3a1.85 1.85 0 0 1-1.85-1.85v-4.12a1.85 1.85 0 0 1 1.85-1.85zm3.861 4.39a.55.55 0 0 1 .55.549v1.03c0 .414.336.75.75.75h1.03a.55.55 0 0 1 0 1.1h-1.03a1.85 1.85 0 0 1-1.85-1.85v-1.03a.55.55 0 0 1 .55-.55m6.72 0a.55.55 0 0 1 .55.549v1.03a1.85 1.85 0 0 1-1.85 1.85h-1.03a.55.55 0 0 1 0-1.1h1.03a.75.75 0 0 0 .75-.75v-1.03a.55.55 0 0 1 .55-.55M3.3 11.828a.75.75 0 0 0-.75.75v4.12c0 .413.336.75.75.75h4.12a.75.75 0 0 0 .75-.75v-4.12a.75.75 0 0 0-.75-.75zm2.702 1.85a.32.32 0 0 1 .32.319v1.28a.32.32 0 0 1-.32.32h-1.28a.32.32 0 0 1-.32-.32v-1.28a.32.32 0 0 1 .32-.32zm9.277 0a.32.32 0 0 1 .32.319v1.28a.32.32 0 0 1-.32.32H14a.32.32 0 0 1-.32-.32v-1.28a.32.32 0 0 1 .32-.32zm-1.668-2.95a.55.55 0 0 1 0 1.1h-1.03a.75.75 0 0 0-.75.75v1.03a.55.55 0 0 1-1.1 0v-1.03a1.85 1.85 0 0 1 1.85-1.85zm3.09 0a1.85 1.85 0 0 1 1.85 1.85v1.03a.55.55 0 0 1-1.1 0v-1.03a.75.75 0 0 0-.75-.75h-1.03a.55.55 0 1 1 0-1.1zM7.42 1.449A1.85 1.85 0 0 1 9.27 3.3v4.12a1.85 1.85 0 0 1-1.85 1.85H3.3a1.85 1.85 0 0 1-1.85-1.85V3.3A1.85 1.85 0 0 1 3.3 1.45zm9.281 0a1.85 1.85 0 0 1 1.85 1.85v4.12a1.85 1.85 0 0 1-1.85 1.85h-4.12a1.85 1.85 0 0 1-1.85-1.85v-4.12a1.85 1.85 0 0 1 1.85-1.85zM3.3 2.55a.75.75 0 0 0-.75.75v4.12c0 .414.336.75.75.75h4.12a.75.75 0 0 0 .75-.75V3.3a.75.75 0 0 0-.75-.75zm9.281 0a.75.75 0 0 0-.75.75v4.12c0 .414.336.75.75.75h4.12a.75.75 0 0 0 .75-.75V3.3a.75.75 0 0 0-.75-.75zM6.002 4.4a.32.32 0 0 1 .32.32V6a.32.32 0 0 1-.32.32h-1.28a.32.32 0 0 1-.32-.32V4.72a.32.32 0 0 1 .32-.32zm9.277 0a.32.32 0 0 1 .32.32V6a.32.32 0 0 1-.32.32H14a.32.32 0 0 1-.32-.32V4.72A.32.32 0 0 1 14 4.4z" fill="currentColor"/>`,
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

const QrCodeOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

QrCodeOutlinedIcon.displayName = "QrCodeOutlinedIcon";

export default QrCodeOutlinedIcon;
