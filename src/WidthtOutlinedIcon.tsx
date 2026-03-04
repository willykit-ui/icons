import * as React from "react";
import type { IconProps } from "./types";

/**
 * WidthtOutlinedIcon icon component.
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
      __html: `<path d="M1.505 9.056a.45.45 0 0 1 .45.45v.994a.45.45 0 0 1-.9 0v-.994a.45.45 0 0 1 .45-.45m8.995 0a.45.45 0 0 1 .45.45v.994a.45.45 0 0 1-.9 0v-.994a.45.45 0 0 1 .45-.45M7.057 7.057a.45.45 0 0 1 .636 0l1.125 1.125.056.068a.45.45 0 0 1-.056.568L7.693 9.943a.45.45 0 0 1-.636-.636l.356-.357H4.587l.356.357a.45.45 0 0 1-.636.636L3.182 8.818a.45.45 0 0 1 0-.636l1.125-1.125a.45.45 0 0 1 .636.636l-.356.357h2.826l-.356-.357a.45.45 0 0 1 0-.636M1.505 6.056a.45.45 0 0 1 .45.45v1a.45.45 0 0 1-.9 0v-1a.45.45 0 0 1 .45-.45m8.995 0a.45.45 0 0 1 .45.45v1a.45.45 0 0 1-.9 0v-1a.45.45 0 0 1 .45-.45" fill="currentColor"/><path fillRule="evenodd" d="M10.6 1.01c.196.04.35.194.39.39l.01.1v3l-.01.1a.5.5 0 0 1-.39.39l-.1.01h-9a.5.5 0 0 1-.49-.4L1 4.5v-3l.01-.1A.5.5 0 0 1 1.5 1h9zM1.9 4.1h8.2V1.9H1.9z" clipRule="evenodd" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M2.5 12a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5m11 0a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5M9.646 9.646a.5.5 0 0 1 .707 0l1.5 1.5a.5.5 0 0 1 0 .707l-1.5 1.5a.5.5 0 1 1-.707-.707l.647-.646H5.707l.647.646a.5.5 0 1 1-.708.707l-1.5-1.5-.064-.078a.5.5 0 0 1 .064-.629l1.5-1.5a.5.5 0 1 1 .708.707L5.707 11h4.586l-.647-.646a.5.5 0 0 1 0-.708M2.5 7a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5m11 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5" fill="currentColor"/><path fillRule="evenodd" d="M13.6 2.01a.5.5 0 0 1 .4.49v3a.5.5 0 0 1-.4.49l-.1.01h-11a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h11zM3 5h10V3H3z" clipRule="evenodd" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M2.5 14.95a.55.55 0 0 1 .55.55v2a.55.55 0 1 1-1.1 0v-2a.55.55 0 0 1 .55-.55m15 0a.55.55 0 0 1 .55.55v2a.55.55 0 1 1-1.1 0v-2a.55.55 0 0 1 .55-.55m-5.264-2.715a.55.55 0 0 1 .778 0l1.875 1.875a.55.55 0 0 1 0 .778l-1.875 1.875a.55.55 0 1 1-.778-.778l.936-.935H6.826l.938.936a.55.55 0 0 1-.778.778l-1.875-1.875-.069-.084a.55.55 0 0 1 .07-.694l1.874-1.875a.55.55 0 1 1 .778.778l-.937.936h6.346l-.937-.937a.55.55 0 0 1 0-.778M2.5 8.95a.55.55 0 0 1 .55.55v3.625a.55.55 0 1 1-1.1 0V9.5a.55.55 0 0 1 .55-.55m15 0a.55.55 0 0 1 .55.55v3.625a.55.55 0 1 1-1.1 0V9.5a.55.55 0 0 1 .55-.55" fill="currentColor"/><path fillRule="evenodd" d="M17.6 2.01c.196.04.35.194.39.39l.01.1v5l-.01.1a.5.5 0 0 1-.39.39l-.1.01h-15a.5.5 0 0 1-.5-.5v-5l.01-.1A.5.5 0 0 1 2.5 2h15zM3.1 6.9h13.8V3.1H3.1z" clipRule="evenodd" fill="currentColor"/>`,
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

const WidthtOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

WidthtOutlinedIcon.displayName = "WidthtOutlinedIcon";

export default WidthtOutlinedIcon;
