import * as React from "react";
import type { IconProps } from "./types";

/**
 * PlayOutlinedIcon icon component.
 *
 * @description Supports sizes: small (12px), medium (16px, default), large (20px).
 * Automatically falls back to the closest available size if exact one is missing.
 *
 * @param fontSize - Icon size preset or custom pixel value
 * @param color - Icon color (supports CSS colors, variables, and 'currentColor')
 * @param ...props - All other SVG element props
 */

const svgChildren = {
  small: { content: { __html: "" }, viewBox: "0 0 16 16" },

  medium: {
    content: {
      __html: `<g clipPath="url(#a)"><path fill="currentColor" d="M14.167 8.001a6.167 6.167 0 1 0-12.334 0 6.167 6.167 0 0 0 12.333 0m-4.333 0c0-.102-.027-.19-.149-.331-.143-.167-.37-.355-.742-.658a10 10 0 0 0-.546-.42 9 9 0 0 0-.495-.32c-.377-.229-.594-.358-.754-.416a.4.4 0 0 0-.082-.02c-.018.014-.067.061-.11.281-.046.241-.066.58-.096 1.098-.016.279-.027.548-.027.786 0 .237.01.506.027.785.03.518.05.857.097 1.098.042.217.09.266.108.281a.3.3 0 0 0 .083-.02c.16-.058.377-.187.754-.416.18-.11.349-.218.495-.32.167-.118.354-.262.546-.419.372-.303.599-.491.742-.658.122-.142.148-.229.149-.331m1 0c0 .398-.154.707-.39.982-.215.25-.525.501-.87.782-.203.165-.41.326-.603.462-.17.119-.358.24-.55.356-.337.205-.657.403-.935.503a1.2 1.2 0 0 1-.502.079.97.97 0 0 1-.516-.197c-.306-.23-.429-.563-.493-.894-.062-.322-.086-.74-.114-1.23-.017-.29-.027-.58-.027-.843s.01-.553.027-.844c.028-.489.052-.907.114-1.23.064-.33.187-.663.493-.893l.117-.077a.95.95 0 0 1 .399-.12c.183-.014.353.026.502.079.278.1.598.297.935.502.192.116.38.237.55.356.194.136.4.296.604.462.344.281.654.532.869.783.236.275.39.584.39.982m4.333 0a7.166 7.166 0 0 1-14.334 0 7.167 7.167 0 0 1 14.333 0"/></g><defs><clipPath id="a"><path fill="currentColor" d="M0 0h16v16H0z"/></clipPath></defs>`,
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

const PlayOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

PlayOutlinedIcon.displayName = "PlayOutlinedIcon";

export default PlayOutlinedIcon;
