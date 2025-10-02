import * as React from "react";
import type { IconProps } from "./types";

/**
 * NotebookOutlinedIcon icon component.
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
      __html: `<path fill="currentColor" d="M11 10a.5.5 0 0 1 0 1H1a.5.5 0 0 1 0-1zm-1-5.5c0-.721-.001-1.212-.05-1.58-.048-.352-.132-.516-.243-.627s-.275-.195-.628-.242C8.712 2 8.221 2 7.5 2h-3c-.721 0-1.212.001-1.58.05-.352.048-.516.132-.627.243s-.195.275-.242.628C2 3.288 2 3.779 2 4.5V7c0 .485.001.8.032 1.03.03.217.076.285.114.324.039.038.107.085.324.114.23.03.545.032 1.03.032h5c.485 0 .799-.001 1.03-.032.217-.03.285-.076.324-.114.038-.039.085-.107.114-.324C9.998 7.8 10 7.485 10 7zM7.5 7a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1zM11 7c0 .457.001.85-.041 1.164-.044.328-.144.642-.399.897-.254.254-.568.354-.896.398-.313.042-.707.041-1.164.041h-5c-.457 0-.85.001-1.164-.041-.328-.044-.642-.144-.897-.398-.254-.255-.354-.57-.398-.897C.999 7.851 1 7.457 1 7V4.5c0-.693 0-1.263.06-1.713.062-.464.198-.873.526-1.201s.737-.464 1.201-.526C3.237 1 3.807 1 4.5 1h3c.693 0 1.263 0 1.713.06.464.062.873.198 1.201.526s.464.737.526 1.201c.06.45.06 1.02.06 1.713z"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path fill="currentColor" d="M14.667 13.5a.5.5 0 0 1 0 1H1.334a.5.5 0 0 1 0-1zM13.5 6c0-.957 0-1.624-.068-2.128-.066-.49-.187-.748-.372-.933-.184-.184-.443-.305-.932-.37C11.624 2.5 10.957 2.5 10 2.5H6c-.957 0-1.624 0-2.128.068-.49.066-.748.187-.933.371-.184.185-.305.444-.37.933C2.5 4.376 2.5 5.043 2.5 6v3.333c0 .642 0 1.075.044 1.396.041.308.113.44.2.527s.219.159.527.2c.321.043.754.044 1.396.044h6.666c.643 0 1.075 0 1.396-.044.308-.041.44-.113.527-.2s.159-.219.2-.527c.043-.321.044-.754.044-1.396zM10 9.5a.5.5 0 0 1 0 1H6a.5.5 0 0 1 0-1zm4.5-.167c0 .614 0 1.126-.054 1.53-.056.419-.18.796-.483 1.1-.304.304-.681.427-1.1.483-.404.055-.916.054-1.53.054H4.667c-.614 0-1.126 0-1.53-.054-.419-.056-.796-.18-1.1-.483-.303-.304-.427-.681-.483-1.1-.055-.404-.054-.916-.054-1.53V6c0-.928 0-1.675.078-2.26.08-.6.253-1.106.654-1.508.402-.4.907-.573 1.507-.654C4.325 1.5 5.072 1.5 6 1.5h4c.928 0 1.675 0 2.26.078.6.08 1.106.253 1.508.654.4.402.573.907.654 1.507.079.586.078 1.333.078 2.261z"/>`,
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

const NotebookOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

NotebookOutlinedIcon.displayName = "NotebookOutlinedIcon";

export default NotebookOutlinedIcon;
