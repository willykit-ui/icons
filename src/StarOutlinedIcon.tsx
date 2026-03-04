import * as React from "react";
import type { IconProps } from "./types";

/**
 * StarOutlinedIcon icon component.
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
      __html: `<path fillRule="evenodd" d="M5.576 1.283a.5.5 0 0 1 .85 0L7.903 3.66c.069.11.178.19.304.221l2.718.671a.5.5 0 0 1 .263.808L9.384 7.5a.5.5 0 0 0-.116.359l.201 2.792a.5.5 0 0 1-.622.52l-.064-.021-2.594-1.054a.5.5 0 0 0-.377 0L3.218 11.15a.5.5 0 0 1-.686-.5l.2-2.791a.5.5 0 0 0-.115-.359L.812 5.361a.5.5 0 0 1 .263-.808l2.717-.67a.5.5 0 0 0 .246-.145l.06-.077zm-.714 2.853c-.193.31-.5.532-.854.62l-2.094.516 1.391 1.65c.235.278.352.638.326 1.002l-.156 2.15 1.998-.81.129-.046a1.4 1.4 0 0 1 .797 0l.129.045 1.997.812-.155-2.15a1.4 1.4 0 0 1 .326-1.004l1.39-1.65-2.093-.516a1.4 1.4 0 0 1-.854-.619L6 2.304z" clipRule="evenodd" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path fillRule="evenodd" d="M7.575 1.484a.5.5 0 0 1 .85 0l2.148 3.456a.5.5 0 0 0 .305.22l3.95.976a.5.5 0 0 1 .262.808l-2.622 3.111a.5.5 0 0 0-.116.359l.293 4.057a.5.5 0 0 1-.688.5l-3.769-1.533a.5.5 0 0 0-.376 0L4.043 14.97l-.065.022a.5.5 0 0 1-.623-.52l.293-4.058a.5.5 0 0 0-.061-.28l-.055-.079L.91 6.944a.5.5 0 0 1 .262-.808l3.95-.975a.5.5 0 0 0 .246-.145l.059-.076zM6.276 5.467a1.5 1.5 0 0 1-.914.664l-3.17.783L4.297 9.41a1.5 1.5 0 0 1 .349 1.074L4.41 13.74l3.025-1.23c.317-.129.667-.144.993-.048l.137.048 3.024 1.23-.235-3.256a1.5 1.5 0 0 1 .35-1.074l2.103-2.497-3.17-.783a1.5 1.5 0 0 1-.913-.664L8 2.695z" clipRule="evenodd" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M9.575 1.683a.5.5 0 0 1 .85 0l2.818 4.533a.5.5 0 0 0 .305.222l5.182 1.28a.5.5 0 0 1 .262.807l-3.44 4.081a.5.5 0 0 0-.117.358l.385 5.325a.5.5 0 0 1-.687.499l-4.944-2.011a.5.5 0 0 0-.377 0l-4.945 2.01-.064.022a.5.5 0 0 1-.623-.52l.384-5.325a.5.5 0 0 0-.061-.278l-.055-.08-3.44-4.081a.5.5 0 0 1 .262-.808l5.182-1.279a.5.5 0 0 0 .305-.222zM7.691 6.797a1.6 1.6 0 0 1-.975.708L2.47 8.555l2.818 3.343a1.6 1.6 0 0 1 .372 1.146l-.314 4.36 4.05-1.646.147-.051a1.6 1.6 0 0 1 .912 0l.146.051 4.05 1.647-.313-4.362c-.03-.415.103-.826.372-1.145l2.817-3.344-4.244-1.049a1.6 1.6 0 0 1-.975-.708L10 3.084z" fill="currentColor"/>`,
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

const StarOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

StarOutlinedIcon.displayName = "StarOutlinedIcon";

export default StarOutlinedIcon;
