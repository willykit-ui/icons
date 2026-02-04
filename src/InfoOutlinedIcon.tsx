import * as React from "react";
import type { IconProps } from "./types";

/**
 * InfoOutlinedIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path d="M6 .55a5.45 5.45 0 1 1 0 10.901 5.45 5.45 0 0 1 0-10.9m0 .901a4.55 4.55 0 1 0 0 9.1 4.55 4.55 0 0 0 0-9.1m-.06 3.55q.354 0 .544.193a.68.68 0 0 1 .192.502q0 .065-.014.226a2 2 0 0 1-.049.295l-.243.977a3 3 0 0 0-.077.497q0 .195.076.266.077.07.267.07.089 0 .2-.035.114-.035.164-.062l-.065.302a12 12 0 0 1-.468.2 1.1 1.1 0 0 1-.406.069q-.356 0-.553-.196a.68.68 0 0 1-.196-.5q0-.116.014-.24.015-.122.048-.277l.244-.98q.033-.141.055-.267t.022-.23q0-.188-.068-.262-.069-.074-.262-.074a.6.6 0 0 0-.194.033A3 3 0 0 0 5 5.572l.065-.302a6 6 0 0 1 .46-.19q.22-.078.415-.079m.56-1.5a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1" fill="currentColor"/></g><defs><clipPath id="a"><path d="M0 0h12v12H0z" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M8 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1m0 1a6 6 0 1 0 0 12A6 6 0 0 0 8 2m-.076 4.65q.458 0 .707.251a.9.9 0 0 1 .249.653q0 .083-.018.293-.016.21-.063.384l-.317 1.27a4 4 0 0 0-.1.647q0 .252.1.344t.346.092a1.4 1.4 0 0 0 .473-.126l-.084.393q-.382.17-.61.26-.226.09-.527.09-.462-.001-.718-.257a.88.88 0 0 1-.257-.648q0-.151.02-.312.019-.159.062-.36l.318-1.275q.042-.183.071-.347.03-.164.03-.299 0-.245-.09-.34-.09-.097-.34-.097a.8.8 0 0 0-.252.044q-.13.044-.223.083l.085-.394q.312-.144.598-.246.285-.103.54-.103M8.65 4.7a.65.65 0 1 1 0 1.3.65.65 0 0 1 0-1.3" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M10 1.45a8.55 8.55 0 1 1 0 17.099 8.55 8.55 0 1 1 0-17.1m0 1.099a7.45 7.45 0 1 0 0 14.9 7.45 7.45 0 0 0 0-14.9m-.089 5.9q.53 0 .816.29t.287.753q0 .096-.02.338a2.5 2.5 0 0 1-.073.443l-.365 1.465q-.046.177-.081.405-.035.225-.035.341 0 .293.115.399.115.105.4.105.133 0 .3-.053.169-.052.245-.092l-.098.453q-.44.197-.702.3a1.7 1.7 0 0 1-.61.103q-.531 0-.827-.295a1 1 0 0 1-.296-.748 3 3 0 0 1 .022-.36q.022-.185.072-.416l.366-1.47q.048-.213.083-.401.033-.189.033-.345 0-.283-.103-.393-.102-.111-.392-.112a.9.9 0 0 0-.291.051 4 4 0 0 0-.257.096l.098-.453q.36-.167.69-.286t.623-.118m.839-2.25a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5" fill="currentColor"/>`,
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

const InfoOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

InfoOutlinedIcon.displayName = "InfoOutlinedIcon";

export default InfoOutlinedIcon;
