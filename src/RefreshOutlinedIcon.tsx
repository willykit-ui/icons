import * as React from "react";
import type { IconProps } from "./types";

/**
 * RefreshOutlinedIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path d="M10.326 5.075a.45.45 0 0 1 .563.057l.927.917a.45.45 0 1 1-.632.64l-.166-.165c-.084 2.714-2.331 4.88-5.084 4.88a5.1 5.1 0 0 1-4.347-2.415.45.45 0 0 1 .766-.472 4.2 4.2 0 0 0 3.58 1.987c2.263 0 4.098-1.768 4.185-3.972l-.157.156a.45.45 0 0 1-.633-.64l.928-.916zM6.046.598c1.833 0 3.44.967 4.33 2.415a.45.45 0 0 1-.766.471 4.18 4.18 0 0 0-3.564-1.986c-2.25 0-4.08 1.764-4.168 3.967l.153-.152a.45.45 0 0 1 .634.64l-.924.916a.45.45 0 0 1-.634 0l-.924-.917a.45.45 0 0 1 .634-.639l.16.16C1.064 2.763 3.303.598 6.047.598" fill="currentColor"/></g><defs><clipPath id="a"><rect width="12" height="12" rx="2" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M13.5 8.484V8.48l-.365.362a.501.501 0 0 1-.703-.712l1.217-1.203.078-.064a.5.5 0 0 1 .624.064l1.218 1.203a.5.5 0 0 1-.703.712l-.366-.363v.006c0 3.605-2.955 6.518-6.588 6.518a6.6 6.6 0 0 1-5.626-3.126.5.5 0 1 1 .85-.524 5.6 5.6 0 0 0 4.776 2.65c3.092 0 5.588-2.476 5.588-5.518M2.855 7.164a.501.501 0 0 1 .705.71L2.348 9.077a.5.5 0 0 1-.706 0L.43 7.874a.5.5 0 0 1 .705-.71l.36.357V7.52c0-3.603 2.943-6.518 6.564-6.518a6.57 6.57 0 0 1 5.608 3.126.5.5 0 0 1-.852.524 5.57 5.57 0 0 0-4.756-2.65c-3.076 0-5.564 2.474-5.564 5.518v.001z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M16.517 10.567v-.1l-.497.491a.55.55 0 0 1-.774-.782l1.435-1.417.086-.07a.55.55 0 0 1 .686.07l1.435 1.417a.55.55 0 0 1-.774.782l-.497-.491v.1c0 4.222-3.464 7.633-7.722 7.633a7.74 7.74 0 0 1-6.593-3.66.55.55 0 0 1 .935-.58 6.64 6.64 0 0 0 5.658 3.14c3.663 0 6.621-2.93 6.622-6.533M3.972 9.035a.55.55 0 0 1 .775.781l-1.429 1.417a.55.55 0 0 1-.775 0L1.114 9.816a.55.55 0 0 1 .776-.78l.49.485v-.095c.001-4.22 3.45-7.633 7.694-7.633a7.7 7.7 0 0 1 6.571 3.662.55.55 0 0 1-.936.576 6.6 6.6 0 0 0-5.635-3.138c-3.646 0-6.593 2.929-6.594 6.533v.095z" fill="currentColor"/>`,
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

const RefreshOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

RefreshOutlinedIcon.displayName = "RefreshOutlinedIcon";

export default RefreshOutlinedIcon;
