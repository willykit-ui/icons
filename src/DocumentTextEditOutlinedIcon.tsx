import * as React from "react";
import type { IconProps } from "./types";

/**
 * DocumentTextEditOutlinedIcon icon component.
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
      __html: `<path d="M10.05 2.332v-.031a.85.85 0 0 0-.85-.85H2.8a.85.85 0 0 0-.85.85v7.4c0 .47.38.85.85.85h6.4c.47 0 .85-.38.85-.85V7.88a.45.45 0 0 1 .9 0V9.7a1.75 1.75 0 0 1-1.75 1.75H2.8A1.75 1.75 0 0 1 1.05 9.7V2.3c0-.967.783-1.75 1.75-1.75h6.4c.966 0 1.75.783 1.75 1.75v.031a.45.45 0 0 1-.9 0" fill="currentColor"/><path d="M5.5 5.55a.45.45 0 0 1 0 .901H4a.45.45 0 0 1 0-.9zm1-1.5a.45.45 0 0 1 0 .901H4a.45.45 0 0 1 0-.9zm-2 3a.45.45 0 0 1 0 .901H4a.45.45 0 0 1 0-.9zm5.606-3.557a.72.72 0 0 1 .792 0l.114.092.638.634a.72.72 0 0 1 0 1.021L7.84 9.022a.45.45 0 0 1-.317.131H6.5a.45.45 0 0 1-.45-.45V7.688c0-.12.048-.235.133-.32l3.81-3.783zM6.95 7.874v.379h.388l3.55-3.524-.386-.382z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M13 3.522V3.5A1.5 1.5 0 0 0 11.5 2h-7A1.5 1.5 0 0 0 3 3.5v9A1.5 1.5 0 0 0 4.5 14h7a1.5 1.5 0 0 0 1.5-1.5v-1.962a.5.5 0 1 1 1 0V12.5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 12.5v-9A2.5 2.5 0 0 1 4.5 1h7A2.5 2.5 0 0 1 14 3.5v.022a.5.5 0 0 1-1 0" fill="currentColor"/><path d="M8 7.5a.5.5 0 0 1 0 1l-2.398-.002a.5.5 0 0 1 0-1zM10 5a.5.5 0 0 1 0 1H5.602a.5.5 0 0 1 0-1zm-3 5a.5.5 0 0 1 0 1H5.602a.5.5 0 0 1 0-1zm5.762-4.104a.45.45 0 0 1 .321.131l1.25 1.25a.45.45 0 0 1 .005.631l-3.3 3.404a.45.45 0 0 1-.323.136h-1.25a.45.45 0 0 1-.45-.45v-1.25a.45.45 0 0 1 .127-.313l3.3-3.403.068-.057a.45.45 0 0 1 .252-.08M9.915 9.93v.618h.61L13.382 7.6l-.613-.614zm3.943-5.206a.78.78 0 0 1 1.047.053l.78.78c.306.306.306.8 0 1.106l-.61.61a.45.45 0 0 1-.636 0l-1.25-1.25a.45.45 0 0 1 0-.635l.61-.61zm.285.981.614.613.209-.208-.614-.613z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M15.5 1.45a2.05 2.05 0 0 1 2.05 2.049.55.55 0 1 1-1.1 0 .95.95 0 0 0-.95-.95H5.3a1.75 1.75 0 0 0-1.75 1.75v11.4c0 .967.783 1.75 1.75 1.75h9.4a1.75 1.75 0 0 0 1.75-1.75v-4.2a.55.55 0 1 1 1.1 0v4.2a2.85 2.85 0 0 1-2.85 2.85H5.3a2.85 2.85 0 0 1-2.85-2.85V4.3A2.85 2.85 0 0 1 5.3 1.45z" fill="currentColor"/><path fillRule="evenodd" d="M15.5 6.574a.5.5 0 0 1 .356.146l1.705 1.693a.5.5 0 0 1 .006.704l-4.504 4.611a.5.5 0 0 1-.357.15H11a.5.5 0 0 1-.5-.5v-1.693a.5.5 0 0 1 .143-.35l4.503-4.61.076-.063a.5.5 0 0 1 .278-.088m-4 5.315v.99h.994l4.01-4.106-.995-.989z" clipRule="evenodd" fill="currentColor"/><path d="M8.5 11.95a.55.55 0 1 1 0 1.099H6.6a.55.55 0 1 1 0-1.1zm1-2.505a.55.55 0 1 1 0 1.1H6.6a.55.55 0 1 1 0-1.1z" fill="currentColor"/><path fillRule="evenodd" d="M17.07 4.96a.956.956 0 0 1 1.201 0l.073.066 1.064 1.057a.95.95 0 0 1 0 1.347l-.832.826a.5.5 0 0 1-.705 0l-1.706-1.694a.5.5 0 0 1 0-.71l.833-.826zm.157 1.247.996.988.443-.44-.996-.987z" clipRule="evenodd" fill="currentColor"/><path d="M11.5 6.95a.55.55 0 1 1 0 1.099H6.6a.55.55 0 1 1 0-1.1z" fill="currentColor"/>`,
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

const DocumentTextEditOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

DocumentTextEditOutlinedIcon.displayName = "DocumentTextEditOutlinedIcon";

export default DocumentTextEditOutlinedIcon;
