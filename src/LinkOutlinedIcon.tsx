import * as React from "react";
import type { IconProps } from "./types";

/**
 * LinkOutlinedIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path d="M6.624 4.646a.5.5 0 0 1 .707.002c.98.985.844 2.595-.151 3.594l-2.424 2.434c-.996 1-2.605 1.138-3.587.151-.981-.985-.844-2.595.151-3.594l1.212-1.217a.5.5 0 0 1 .709.706L2.029 7.939c-.678.68-.677 1.656-.152 2.183.523.526 1.492.528 2.17-.152L6.47 7.536c.677-.68.677-1.656.152-2.183a.5.5 0 0 1 0-.707m.62-3.322c.996-1 2.604-1.137 3.587-.15.98.984.844 2.595-.151 3.594l-1.21 1.217a.5.5 0 0 1-.71-.706l1.213-1.217c.678-.68.677-1.657.152-2.184-.523-.525-1.493-.527-2.17.153L5.529 4.464c-.678.68-.677 1.657-.152 2.184a.5.5 0 1 1-.708.705c-.981-.985-.844-2.596.151-3.595z" fill="currentColor"/></g><defs><clipPath id="a"><rect width="12" height="12" rx="2" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<g clipPath="url(#a)"><path d="M8.881 6.31a.55.55 0 0 1 .779.002c1.23 1.235 1.064 3.265-.198 4.532l-3.151 3.164c-1.263 1.268-3.29 1.434-4.52.198s-1.066-3.265.196-4.533l1.576-1.582a.55.55 0 1 1 .78.777l-1.577 1.58c-.913.917-.924 2.25-.196 2.981.726.73 2.05.719 2.962-.197l3.151-3.164c.913-.917.925-2.249.197-2.98a.55.55 0 0 1 .001-.778m.807-4.318c1.263-1.268 3.289-1.434 4.52-.198s1.066 3.265-.196 4.533l-1.576 1.582a.55.55 0 1 1-.78-.777l1.577-1.582c.913-.916.924-2.249.196-2.98-.726-.728-2.05-.718-2.962.198L7.316 5.931c-.913.917-.925 2.25-.197 2.98a.55.55 0 1 1-.78.777c-1.23-1.235-1.065-3.265.197-4.532z" fill="currentColor"/></g><defs><clipPath id="a"><rect width="16" height="16" rx="2" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M11.14 7.975a.6.6 0 0 1 .849.002c1.478 1.484 1.286 3.934-.243 5.47L7.868 17.34c-1.53 1.536-3.976 1.73-5.456.244-1.48-1.484-1.287-3.936.242-5.47l1.94-1.948a.6.6 0 0 1 .85.847l-1.94 1.947c-1.148 1.153-1.173 2.842-.242 3.776.93.933 2.607.91 3.755-.243l3.879-3.893c1.148-1.153 1.173-2.842.242-3.777a.6.6 0 0 1 .002-.848m.991-5.316c1.53-1.536 3.976-1.73 5.456-.243 1.48 1.485 1.287 3.936-.242 5.47l-1.94 1.947a.6.6 0 0 1-.85-.847l1.94-1.946c1.148-1.153 1.173-2.843.242-3.777-.93-.933-2.608-.909-3.755.243L9.103 7.399c-1.148 1.153-1.173 2.843-.242 3.778a.6.6 0 0 1-.85.847c-1.48-1.485-1.288-3.936.241-5.471z" fill="currentColor"/>`,
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

const LinkOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

LinkOutlinedIcon.displayName = "LinkOutlinedIcon";

export default LinkOutlinedIcon;
