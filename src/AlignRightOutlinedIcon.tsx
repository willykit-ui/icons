import * as React from "react";
import type { IconProps } from "./types";

/**
 * AlignRightOutlinedIcon icon component.
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
      __html: `<path d="M10.5 1.05a.45.45 0 0 1 .45.451v9a.45.45 0 0 1-.9 0v-9a.45.45 0 0 1 .45-.45" fill="currentColor"/><path fillRule="evenodd" d="M8.5 7.001a.5.5 0 0 1 .5.5v2l-.01.1a.5.5 0 0 1-.49.4h-7a.5.5 0 0 1-.49-.4l-.01-.1v-2a.5.5 0 0 1 .5-.5zm-6.6 2.1h6.2V7.9H1.9z" clipRule="evenodd" fill="currentColor"/><path d="M7.057 2.058a.45.45 0 0 1 .636 0l1.125 1.125a.45.45 0 0 1 .056.568l-.056.068-1.125 1.125a.45.45 0 0 1-.636-.636l.356-.357H4.5a.45.45 0 0 1 0-.9h2.913l-.356-.357a.45.45 0 0 1 0-.636" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M13.5 2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 .5-.5" fill="currentColor"/><path fillRule="evenodd" d="M11.6 9.01c.196.04.35.194.39.39l.01.1v3a.5.5 0 0 1-.4.49l-.1.01h-9a.5.5 0 0 1-.5-.5v-3l.01-.1A.5.5 0 0 1 2.5 9h9zM3 12h8v-2H3z" clipRule="evenodd" fill="currentColor"/><path d="M9.646 3.646a.5.5 0 0 1 .707 0l1.5 1.5a.5.5 0 0 1 .063.631l-.062.077-1.5 1.5a.5.5 0 1 1-.708-.708L10.293 6H5.5a.5.5 0 0 1 0-1h4.793l-.647-.646a.5.5 0 0 1 0-.708" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M17.5 1.95a.55.55 0 0 1 .55.549v15a.55.55 0 1 1-1.1 0v-15a.55.55 0 0 1 .55-.55" fill="currentColor"/><path fillRule="evenodd" d="M15.5 10.999a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.49-.4L2 16.5v-5l.01-.1a.5.5 0 0 1 .39-.39l.1-.01zm-12.4 4.9h11.8v-3.8H3.1z" clipRule="evenodd" fill="currentColor"/><path d="M13.111 4.11a.55.55 0 0 1 .778 0l2 2a.55.55 0 0 1 .07.692l-.07.086-2 2a.55.55 0 1 1-.778-.778l1.062-1.061H6.5a.55.55 0 1 1 0-1.1h7.673L13.11 4.888a.55.55 0 0 1 0-.778" fill="currentColor"/>`,
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

const AlignRightOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

AlignRightOutlinedIcon.displayName = "AlignRightOutlinedIcon";

export default AlignRightOutlinedIcon;
