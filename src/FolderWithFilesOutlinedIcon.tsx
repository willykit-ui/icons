import * as React from "react";
import type { IconProps } from "./types";

/**
 * FolderWithFilesOutlinedIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path fill="currentColor" d="M.834 9.334v-4.7c0-.566-.003-.918.054-1.22A3.17 3.17 0 0 1 3.413.888c.302-.057.655-.055 1.22-.055.249 0 .405 0 .557.014.6.056 1.171.284 1.646.653h4.165c.293 0 .488-.001.659.021a2.5 2.5 0 0 1 2.165 2.286 2 2 0 0 1 .513.334q.1.089.188.187c.352.392.503.868.573 1.429.07.548.067 1.244.067 2.108v1.468c0 1.243.002 2.226-.101 2.993-.105.782-.326 1.414-.825 1.913-.5.5-1.132.72-1.913.825-.768.104-1.75.102-2.993.102H6.667c-1.243 0-2.226.002-2.993-.102-.781-.105-1.414-.326-1.913-.825s-.72-1.132-.825-1.913c-.103-.767-.102-1.75-.102-2.993M12 6.167a.5.5 0 0 1 0 1H8.667a.5.5 0 0 1 0-1zM7.876 2.501c.428.425.622.604.842.727q.22.12.46.19c.275.079.577.083 1.374.083h.25c.79 0 1.439.001 1.963.054a1.5 1.5 0 0 0-1.236-1.041A5 5 0 0 0 11 2.5zM1.834 9.334c0 1.271 0 2.174.092 2.86.09.67.26 1.056.542 1.338s.669.452 1.34.542c.684.092 1.587.093 2.859.093h2.667c1.27 0 2.174 0 2.859-.093.67-.09 1.057-.26 1.339-.542s.452-.668.542-1.339c.092-.685.092-1.588.092-2.859V7.866c0-.89 0-1.512-.06-1.983-.057-.46-.163-.706-.324-.885a2 2 0 0 0-.113-.112c-.178-.161-.425-.268-.884-.325-.472-.06-1.093-.06-1.984-.06h-.249c-.74 0-1.207.004-1.648-.122a3.2 3.2 0 0 1-.672-.277c-.4-.223-.728-.558-1.252-1.081l-.367-.367a5 5 0 0 0-.334-.321 2.17 2.17 0 0 0-1.182-.49 5 5 0 0 0-.464-.009c-.61 0-.847.002-1.035.037A2.17 2.17 0 0 0 1.871 3.6c-.036.187-.037.424-.037 1.035z"/></g><defs><clipPath id="a"><path fill="currentColor" d="M0 0h16v16H0z"/></clipPath></defs>`,
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

const FolderWithFilesOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

FolderWithFilesOutlinedIcon.displayName = "FolderWithFilesOutlinedIcon";

export default FolderWithFilesOutlinedIcon;
