import * as React from "react";
import type { IconProps } from "./types";

/**
 * EmailOutlinedIcon icon component.
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
      __html: `<path d="m10.55 3.355-3.96 3.15a.95.95 0 0 1-1.182 0L1.45 3.357v5.645c0 .304.246.55.55.55h8a.55.55 0 0 0 .55-.55zM2 2.451a.6.6 0 0 0-.212.042.5.5 0 0 1 .092.056L5.969 5.8a.05.05 0 0 0 .061 0l4.09-3.252a.5.5 0 0 1 .09-.056.6.6 0 0 0-.21-.042zm9.45 6.55c0 .8-.65 1.45-1.45 1.45H2c-.8 0-1.45-.65-1.45-1.45v-6c0-.8.65-1.45 1.45-1.45h8c.8 0 1.45.65 1.45 1.45z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M14 4.5c0-.169-.03-.33-.081-.482L8.96 8.15a1.5 1.5 0 0 1-1.92 0L2.08 4.018q-.078.228-.08.482v7A1.5 1.5 0 0 0 3.5 13h9a1.5 1.5 0 0 0 1.5-1.5zM3.5 3c-.294 0-.57.085-.8.231l4.98 4.152a.5.5 0 0 0 .64 0L13.3 3.23a1.5 1.5 0 0 0-.8-.23zM15 11.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 11.5v-7A2.5 2.5 0 0 1 3.5 2h9A2.5 2.5 0 0 1 15 4.5z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="m17.442 5.302-6.122 4.766a2.15 2.15 0 0 1-2.64 0L2.557 5.302q-.007.075-.007.15v9.094c0 1.05.852 1.903 1.903 1.903h11.094a1.904 1.904 0 0 0 1.903-1.903V5.452q-.001-.075-.008-.15M4.453 3.549a1.9 1.9 0 0 0-1.469.691l6.37 4.96c.38.296.912.296 1.292 0l6.369-4.96a1.9 1.9 0 0 0-1.468-.691zM18.55 14.546a3.003 3.003 0 0 1-3.003 3.003H4.453a3.003 3.003 0 0 1-3.003-3.003V5.452A3.003 3.003 0 0 1 4.453 2.45h11.094a3.003 3.003 0 0 1 3.003 3.003z" fill="currentColor"/>`,
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

const EmailOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

EmailOutlinedIcon.displayName = "EmailOutlinedIcon";

export default EmailOutlinedIcon;
