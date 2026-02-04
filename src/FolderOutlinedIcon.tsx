import * as React from "react";
import type { IconProps } from "./types";

/**
 * FolderOutlinedIcon icon component.
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
      __html: `<path d="M3.8 1.05c.365 0 .702.12.975.321H8.64c.824 0 1.504.6 1.634 1.388A1.65 1.65 0 0 1 11.5 4.35V9.3c0 .911-.74 1.65-1.65 1.65h-7.7a1.65 1.65 0 0 1-1.05-.377C.734 10.271.5 9.813.5 9.3V2.7c0-.911.74-1.65 1.65-1.65zm-1.65.901a.75.75 0 0 0-.75.75v6.6a.747.747 0 0 0 .75.75h7.7a.75.75 0 0 0 .746-.673L10.6 9.3V4.35a.75.75 0 0 0-.75-.75H6c-.844 0-1.326-.67-1.49-1.145a.75.75 0 0 0-.71-.505zm7.15 2.5a.45.45 0 0 1 0 .9H6.55a.45.45 0 0 1 0-.9zM5.407 2.27c.117.239.33.43.594.43h3.321a.76.76 0 0 0-.681-.43z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M5.146 1.7c.567 0 1.08.219 1.464.576h5.158c1.051 0 1.921.768 2.084 1.774A2.15 2.15 0 0 1 15 5.953v6.193a2.155 2.155 0 0 1-2.154 2.154H3.154A2.15 2.15 0 0 1 1 12.145v-8.29C1 2.665 1.965 1.7 3.154 1.7zm-1.992 1C2.517 2.7 2 3.215 2 3.853v8.292q0 .066.006.119a1.14 1.14 0 0 0 .258.614c.213.258.533.42.89.42h9.692c.637 0 1.154-.516 1.154-1.153V5.953c0-.515-.338-.952-.806-1.1l-.007-.002a1.2 1.2 0 0 0-.341-.051H7.98c-.968 0-1.545-.76-1.749-1.334a1.2 1.2 0 0 0-.17-.31.5.5 0 0 1-.104-.119 1.15 1.15 0 0 0-.627-.323l-.184-.015zm8.721 3.345a.5.5 0 0 1 0 1h-3.23a.5.5 0 0 1 0-1zM7.238 3.276c.128.25.34.456.604.51l.138.014h4.732a1.11 1.11 0 0 0-.944-.524z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M6.494 2.3c.586 0 1.127.192 1.566.513h6.512a2.354 2.354 0 0 1 2.35 2.269A2.66 2.66 0 0 1 18.5 7.508v7.437a2.657 2.657 0 0 1-2.656 2.657H4.156a2.65 2.65 0 0 1-2.05-.967 2.65 2.65 0 0 1-.606-1.69V4.957a2.656 2.656 0 0 1 2.656-2.656zM4.156 3.4c-.86 0-1.556.698-1.556 1.557v9.988a1.56 1.56 0 0 0 .355.99q.093.112.212.21l.104.08c.252.175.556.277.885.277h11.688c.805 0 1.468-.613 1.548-1.397l.008-.16V7.508c0-.86-.697-1.557-1.556-1.557H9.963c-1.097 0-1.765-.854-2.008-1.524a1.56 1.56 0 0 0-1.337-1.022L6.494 3.4zm11.156 4.195a.55.55 0 0 1 0 1.1h-4.57a.55.55 0 1 1 0-1.1zM8.989 4.053c.156.429.517.799.974.799h5.823a1.256 1.256 0 0 0-1.214-.939h-5.64q.03.068.057.14" fill="currentColor"/>`,
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

const FolderOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

FolderOutlinedIcon.displayName = "FolderOutlinedIcon";

export default FolderOutlinedIcon;
