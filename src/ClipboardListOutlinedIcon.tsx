import * as React from "react";
import type { IconProps } from "./types";

/**
 * ClipboardListOutlinedIcon icon component.
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
      __html: `<path fill="currentColor" d="M10 4.997c0-.721-.001-1.212-.05-1.579-.048-.353-.132-.517-.243-.628-.098-.098-.236-.173-.503-.223a5 5 0 0 0-.728-.061 1.25 1.25 0 0 1-1.224.996h-2.5a1.25 1.25 0 0 1-1.225-.996c-.303.009-.54.026-.731.061-.267.05-.405.125-.503.223-.111.111-.195.275-.242.628C2 3.785 2 4.276 2 4.998v3c0 .72.001 1.21.05 1.578.048.353.132.517.243.628s.275.195.628.242c.367.05.858.051 1.579.051h3c.721 0 1.212-.001 1.58-.05.352-.048.516-.132.627-.243s.195-.275.242-.628C10 9.21 10 8.718 10 7.997zM3.748 8.248a.5.5 0 1 1 0 1h-.25a.5.5 0 0 1 0-1zm4.752 0a.5.5 0 1 1 0 1H5.25a.5.5 0 0 1 0-1zM3.748 6.502l.1.01a.5.5 0 0 1 0 .98l-.1.01h-.25a.5.5 0 1 1 0-1zm4.752 0a.5.5 0 0 1 0 1H5.25a.5.5 0 1 1 0-1zM3.748 4.75l.1.01a.5.5 0 0 1 0 .98l-.1.01h-.25a.5.5 0 0 1 0-1zm4.752 0a.5.5 0 0 1 0 1H5.25a.5.5 0 0 1 0-1zM4.752 1.502a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h2.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25zM11 7.997c0 .693 0 1.263-.06 1.713-.062.464-.198.873-.526 1.201s-.737.464-1.201.527c-.45.06-1.02.06-1.713.06h-3c-.693 0-1.263 0-1.713-.06-.464-.063-.873-.199-1.201-.527s-.464-.737-.526-1.201C1 9.26 1 8.69 1 7.997v-3c0-.693 0-1.263.06-1.713.062-.464.198-.873.526-1.201.286-.286.634-.426 1.03-.499a6 6 0 0 1 .91-.08A1.25 1.25 0 0 1 4.752.503h2.5c.606 0 1.11.431 1.225 1.004.34.01.644.03.908.078.395.073.743.213 1.03.499.327.328.463.737.525 1.201.06.45.06 1.02.06 1.713z"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path fill="currentColor" d="M13.5 6.663c0-.957 0-1.624-.068-2.128-.066-.489-.187-.748-.372-.932-.162-.163-.38-.275-.758-.344-.297-.055-.666-.079-1.144-.09A1.5 1.5 0 0 1 9.67 4.504H6.336a1.5 1.5 0 0 1-1.49-1.333c-.48.01-.85.034-1.148.089-.378.07-.596.181-.759.344-.184.184-.305.443-.37.932C2.5 5.04 2.5 5.706 2.5 6.663v4c0 .957 0 1.624.068 2.128.066.49.187.748.371.933.185.184.444.304.933.37.504.068 1.171.07 2.128.07h4c.957 0 1.624-.002 2.128-.07.489-.066.748-.186.932-.37.185-.185.306-.444.372-.933.067-.504.068-1.171.068-2.128zm-8.503 4.501a.5.5 0 1 1 0 1h-.333a.5.5 0 0 1 0-1zm6.336 0a.5.5 0 1 1 0 1H7a.5.5 0 0 1 0-1zM4.997 8.836a.5.5 0 0 1 0 1h-.333a.5.5 0 0 1 0-1zm6.336 0a.5.5 0 0 1 0 1H7a.5.5 0 0 1 0-1zM4.997 6.5a.5.5 0 0 1 0 1h-.333a.5.5 0 0 1 0-1zm6.336 0a.5.5 0 0 1 0 1H7a.5.5 0 0 1 0-1zM6.336 1.836a.5.5 0 0 0-.5.5v.667a.5.5 0 0 0 .5.5h3.333a.5.5 0 0 0 .5-.5v-.667a.5.5 0 0 0-.5-.5zm8.164 8.827c0 .929 0 1.675-.078 2.26-.08.6-.253 1.106-.654 1.508-.402.4-.907.573-1.507.654-.586.079-1.332.078-2.261.078H6c-.928 0-1.675 0-2.26-.078-.6-.08-1.106-.253-1.508-.654-.4-.402-.573-.907-.654-1.507-.079-.586-.078-1.332-.078-2.26v-4c0-.93 0-1.677.078-2.263.08-.6.253-1.104.654-1.505.35-.35.78-.528 1.286-.62.376-.07.817-.096 1.327-.106A1.5 1.5 0 0 1 6.335.836H9.67a1.5 1.5 0 0 1 1.49 1.334c.508.01.948.036 1.323.105.506.093.936.27 1.286.62.4.402.573.907.654 1.506.079.586.078 1.333.078 2.262z"/>`,
    },
    viewBox: "0 0 16 16",
  },

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
