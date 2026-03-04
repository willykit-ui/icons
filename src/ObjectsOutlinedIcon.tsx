import * as React from "react";
import type { IconProps } from "./types";

/**
 * ObjectsOutlinedIcon icon component.
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
      __html: `<path fillRule="evenodd" d="M5.103 1.005a1 1 0 0 1 .892.892L6 2v1.05h2V2a1 1 0 0 1 1-1h1a1 1 0 0 1 .995.897L11 2v3l-.005.103A1 1 0 0 1 10 6H9a1 1 0 0 1-1-1V3.95H6V5a1 1 0 0 1-.897.995L5 6H2.95v1H3a1 1 0 0 1 1 1v.55h1V8l.005-.103A1 1 0 0 1 6 7h4l.102.005a1 1 0 0 1 .893.892L11 8v2l-.005.102a1 1 0 0 1-.893.893L10 11H6a1 1 0 0 1-.995-.898L5 10v-.55H4V10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V8l.005-.103A1 1 0 0 1 2 7h.05V6H2a1 1 0 0 1-.995-.897L1 5V2l.005-.103A1 1 0 0 1 2 1h3zM2 7.9a.1.1 0 0 0-.1.1v2a.1.1 0 0 0 .1.1h1a.1.1 0 0 0 .1-.1V8a.1.1 0 0 0-.1-.1zm4 0a.1.1 0 0 0-.1.1v2a.1.1 0 0 0 .1.1h4a.1.1 0 0 0 .1-.1V8a.1.1 0 0 0-.1-.1zm-4-6a.1.1 0 0 0-.1.1v3a.1.1 0 0 0 .1.1h3a.1.1 0 0 0 .1-.1V2a.1.1 0 0 0-.1-.1zm7 0a.1.1 0 0 0-.1.1v3a.1.1 0 0 0 .1.1h1a.1.1 0 0 0 .1-.1V2a.1.1 0 0 0-.1-.1z" clipRule="evenodd" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path fillRule="evenodd" d="M7.103 2.005a1 1 0 0 1 .892.892L8 3v1h2V3a1 1 0 0 1 1-1h2l.102.005a1 1 0 0 1 .893.892L14 3v3l-.005.103A1 1 0 0 1 13 7h-2a1 1 0 0 1-1-1V5H8v1a1 1 0 0 1-.897.995L7 7H4v2l.096.005a1 1 0 0 1 .9.892L5 10v1h2v-1l.005-.103A1 1 0 0 1 8 9h5l.102.005a1 1 0 0 1 .893.892L14 10v3a1 1 0 0 1-.898.995L13 14H8a1 1 0 0 1-.995-.898L7 13v-1H5v1l-.005.102A1 1 0 0 1 4 14H3a1 1 0 0 1-1-1v-3a1 1 0 0 1 .897-.995L3 9V7l-.096-.005a1 1 0 0 1-.9-.892L2 6V3l.005-.103A1 1 0 0 1 3 2h4zM3 13h1v-3H3zm5 0h5v-3H8zM3 6h4V3H3zm8 0h2V3h-2z" clipRule="evenodd" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path fillRule="evenodd" d="M8.833 2.007a1.3 1.3 0 0 1 1.16 1.16L10 3.3v1.65h3V3.3l.007-.133A1.3 1.3 0 0 1 14.3 2h2.4l.133.007a1.3 1.3 0 0 1 1.16 1.16L18 3.3v4.4a1.3 1.3 0 0 1-1.167 1.293L16.7 9h-2.4A1.3 1.3 0 0 1 13 7.7V6.05h-3V7.7a1.3 1.3 0 0 1-1.167 1.293L8.7 9H5.05v2h.65l.133.007a1.3 1.3 0 0 1 1.16 1.16L7 12.3v1.65h2V12.3l.007-.133A1.3 1.3 0 0 1 10.3 11h6.4l.133.007a1.3 1.3 0 0 1 1.16 1.16L18 12.3v4.4a1.3 1.3 0 0 1-1.167 1.293L16.7 18h-6.4A1.3 1.3 0 0 1 9 16.7v-1.65H7v1.65a1.3 1.3 0 0 1-1.167 1.293L5.7 18H3.3A1.3 1.3 0 0 1 2 16.7v-4.4l.007-.133A1.3 1.3 0 0 1 3.3 11h.65V9H3.3A1.3 1.3 0 0 1 2 7.7V3.3l.007-.133A1.3 1.3 0 0 1 3.3 2h5.4zM3.3 12.1a.2.2 0 0 0-.2.2v4.4c0 .11.09.2.2.2h2.4a.2.2 0 0 0 .2-.2v-4.4a.2.2 0 0 0-.2-.2zm7 0a.2.2 0 0 0-.2.2v4.4c0 .11.09.2.2.2h6.4a.2.2 0 0 0 .2-.2v-4.4a.2.2 0 0 0-.2-.2zm-7-9a.2.2 0 0 0-.2.2v4.4c0 .11.09.2.2.2h5.4a.2.2 0 0 0 .2-.2V3.3a.2.2 0 0 0-.2-.2zm11 0a.2.2 0 0 0-.2.2v4.4c0 .11.09.2.2.2h2.4a.2.2 0 0 0 .2-.2V3.3a.2.2 0 0 0-.2-.2z" clipRule="evenodd" fill="currentColor"/>`,
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

const ObjectsOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

ObjectsOutlinedIcon.displayName = "ObjectsOutlinedIcon";

export default ObjectsOutlinedIcon;
