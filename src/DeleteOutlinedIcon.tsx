import * as React from "react";
import type { IconProps } from "./types";

/**
 * DeleteOutlinedIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path d="M9.937 3.751a.45.45 0 0 1 .41.484L9.89 9.842a1.75 1.75 0 0 1-1.744 1.607h-4.29c-.912 0-1.67-.7-1.745-1.607l-.459-5.607a.45.45 0 0 1 .897-.073l.46 5.607a.85.85 0 0 0 .846.78h4.29a.85.85 0 0 0 .848-.78l.46-5.607a.45.45 0 0 1 .485-.411M4.563 4.998a.45.45 0 0 1 .492.402l.278 2.779a.45.45 0 0 1-.896.09L4.16 5.49a.45.45 0 0 1 .404-.492m2.867 0a.45.45 0 0 1 .403.492l-.279 2.78a.45.45 0 0 1-.896-.09l.279-2.78a.45.45 0 0 1 .492-.402M6.928.548c.132 0 .247 0 .354.016.396.06.75.296.944.649.053.096.09.205.131.322l.055.155.016.044a.68.68 0 0 0 .622.414l.05.001h1.601a.45.45 0 0 1 0 .9h-9.4a.45.45 0 0 1 0-.9h1.65a.68.68 0 0 0 .622-.415l.016-.044.055-.155c.04-.117.077-.226.13-.322a1.3 1.3 0 0 1 .945-.649c.107-.016.222-.015.354-.015zm-2.075.906a.4.4 0 0 0-.29.192c-.008.016-.019.04-.07.188l-.056.155-.023.067-.04.093h3.253l-.04-.093-.024-.067-.054-.155a2 2 0 0 0-.072-.188.4.4 0 0 0-.289-.192 2 2 0 0 0-.22-.005H5.073c-.162 0-.196.001-.22.005" fill="currentColor"/></g><defs><clipPath id="a"><path d="M0 0h12v12H0z" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M13.059 5.504a.5.5 0 0 1 .437.555l-.792 6.733A2.5 2.5 0 0 1 10.222 15H5.778a2.5 2.5 0 0 1-2.482-2.208l-.792-6.733a.5.5 0 1 1 .992-.118l.793 6.734A1.5 1.5 0 0 0 5.78 14h4.443c.76 0 1.4-.57 1.489-1.325l.793-6.734a.5.5 0 0 1 .555-.437M6.25 7.003a.5.5 0 0 1 .548.447l.333 3.333a.5.5 0 0 1-.995.1L5.803 7.55a.5.5 0 0 1 .447-.547m3.503 0a.5.5 0 0 1 .448.547l-.334 3.333a.5.5 0 1 1-.995-.1l.334-3.333a.5.5 0 0 1 .547-.447M9.09 1.5c.157 0 .293-.002.42.019a1.5 1.5 0 0 1 1.094.789c.059.114.1.242.15.391l.064.195.02.056c.117.323.42.541.763.55h2.06a.5.5 0 1 1 0 1H2.327a.5.5 0 0 1 0-1h2.06a.83.83 0 0 0 .762-.55l.02-.056.064-.195c.05-.149.091-.277.15-.391.22-.421.627-.715 1.095-.79.127-.02.262-.018.42-.018zM6.637 2.506a.5.5 0 0 0-.365.264 2 2 0 0 0-.088.246l-.065.193q-.015.048-.028.081a2 2 0 0 1-.092.21h3.992a2 2 0 0 1-.093-.21l-.027-.081-.064-.193a2 2 0 0 0-.09-.246.5.5 0 0 0-.364-.264A2 2 0 0 0 9.09 2.5H6.898c-.192 0-.232.001-.261.006" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M3.549 6.252a.55.55 0 0 1 .6.495l.868 9.118a1.75 1.75 0 0 0 1.742 1.584h6.484a1.75 1.75 0 0 0 1.742-1.584l.869-9.118a.55.55 0 1 1 1.094.105l-.868 9.117a2.85 2.85 0 0 1-2.837 2.58H6.76a2.85 2.85 0 0 1-2.837-2.58l-.868-9.117a.55.55 0 0 1 .495-.6m4.264 2.133a.55.55 0 0 1 .602.493l.444 4.444a.55.55 0 0 1-1.094.11L7.32 8.987a.55.55 0 0 1 .492-.602m4.373 0c.302.03.522.3.492.602l-.445 4.445a.55.55 0 0 1-1.094-.11l.444-4.444a.55.55 0 0 1 .602-.493m-.715-6.936c.214 0 .384-.002.543.024.591.095 1.1.468 1.375 1 .073.143.125.305.193.51l.087.263.026.08c.174.486.624.81 1.127.822l.083.001H17.5a.55.55 0 1 1 0 1.1h-15a.55.55 0 0 1 0-1.1h2.688a1.23 1.23 0 0 0 1.127-.823l.027-.08.087-.263a3.6 3.6 0 0 1 .193-.51 1.89 1.89 0 0 1 1.376-1c.159-.026.328-.024.542-.024zM8.54 2.55c-.253 0-.317.001-.367.01a.79.79 0 0 0-.573.419 3 3 0 0 0-.126.35l-.087.263-.036.105q-.087.242-.22.453h5.75a2.4 2.4 0 0 1-.257-.558l-.086-.263a3 3 0 0 0-.127-.35.79.79 0 0 0-.573-.42 3 3 0 0 0-.367-.01z" fill="currentColor"/>`,
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

const DeleteOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

DeleteOutlinedIcon.displayName = "DeleteOutlinedIcon";

export default DeleteOutlinedIcon;
