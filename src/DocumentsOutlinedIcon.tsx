import * as React from "react";
import type { IconProps } from "./types";

/**
 * DocumentsOutlinedIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path d="M2.102 2.39a.673.673 0 0 0-.652.673v5.875c0 .365.29.66.652.672L2.1 9.563V2.438zm4.36 5.084a.45.45 0 0 1 0 .9H4.156a.45.45 0 0 1 0-.9zm1.386-1.925a.45.45 0 0 1 0 .9H4.155a.45.45 0 0 1 0-.9zm0-1.921a.45.45 0 0 1 0 .9H4.155a.45.45 0 0 1 0-.9zm3.602 5.31c0 .87-.705 1.576-1.575 1.576h-.233c-.328.56-.934.937-1.63.937H3.988a1.89 1.89 0 0 1-1.629-.937h-.233c-.87 0-1.575-.706-1.575-1.576V3.063c0-.87.705-1.575 1.575-1.575h.233c.328-.56.934-.937 1.63-.937h4.025c.695 0 1.301.377 1.629.937h.233c.87 0 1.575.706 1.575 1.575zM3 9.563c0 .546.442.988.987.988h4.026A.987.987 0 0 0 9 9.563V2.438a.987.987 0 0 0-.987-.987H3.987A.987.987 0 0 0 3 2.438zm6.9 0q0 .024-.003.047a.67.67 0 0 0 .653-.672V3.063a.673.673 0 0 0-.653-.672l.003.047z" fill="currentColor"/></g><defs><clipPath id="a"><rect width="12" height="12" rx="5" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M3.04 3.219h-.077A.963.963 0 0 0 2 4.182v7.636c0 .532.431.963.963.963h.076q-.006-.075-.008-.15V3.369q.002-.075.008-.15M8.601 10a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1zm1.8-2.502a.5.5 0 0 1 0 1h-4.8a.5.5 0 0 1 0-1zm0-2.498a.5.5 0 0 1 0 1h-4.8a.5.5 0 0 1 0-1zM15 11.818a1.963 1.963 0 0 1-1.963 1.963h-.367A2.37 2.37 0 0 1 10.6 15H5.4c-.89 0-1.665-.492-2.07-1.219h-.367A1.963 1.963 0 0 1 1 11.818V4.182c0-1.084.879-1.963 1.963-1.963h.367A2.37 2.37 0 0 1 5.4 1h5.2c.89 0 1.665.492 2.07 1.219h.367c1.084 0 1.963.879 1.963 1.963zm-10.969.813A1.37 1.37 0 0 0 5.401 14H10.6a1.37 1.37 0 0 0 1.369-1.37V3.37A1.37 1.37 0 0 0 10.599 2H5.4a1.37 1.37 0 0 0-1.369 1.37zm8.938 0q-.002.075-.008.15h.076a.963.963 0 0 0 .963-.963V4.182a.963.963 0 0 0-.963-.963h-.076q.006.075.008.15z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M3.963 4.049H3.8c-.69 0-1.25.56-1.25 1.25v9.4c0 .69.56 1.25 1.25 1.25h.163a3 3 0 0 1-.013-.25V4.3q.001-.127.013-.25m7.236 7.9a.55.55 0 1 1 0 1.1H6.6a.55.55 0 1 1 0-1.1zm2.2-2.503a.55.55 0 0 1 0 1.1H6.6a.55.55 0 1 1 0-1.1zm0-2.497a.55.55 0 1 1 0 1.1H6.6a.55.55 0 1 1 0-1.1zm5.15 7.75a2.35 2.35 0 0 1-2.349 2.35h-.49a2.85 2.85 0 0 1-2.51 1.5H6.8a2.85 2.85 0 0 1-2.51-1.5H3.8a2.35 2.35 0 0 1-2.35-2.35V5.3A2.35 2.35 0 0 1 3.8 2.95h.49a2.85 2.85 0 0 1 2.51-1.5h6.4c1.086 0 2.029.607 2.51 1.5h.49a2.35 2.35 0 0 1 2.35 2.35zm-13.5 1c0 .967.784 1.75 1.75 1.75H13.2a1.75 1.75 0 0 0 1.75-1.75V4.3a1.75 1.75 0 0 0-1.75-1.75H6.8A1.75 1.75 0 0 0 5.05 4.3zm11 0q0 .127-.012.25h.163c.69 0 1.25-.56 1.25-1.25V5.3c0-.69-.56-1.25-1.25-1.25h-.163q.012.124.013.25z" fill="currentColor"/>`,
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

const DocumentsOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

DocumentsOutlinedIcon.displayName = "DocumentsOutlinedIcon";

export default DocumentsOutlinedIcon;
