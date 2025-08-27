import * as React from "react";
import type { IconProps } from "./types";

/**
 * FileOutlinedIcon icon component.
 *
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
      __html: `<g clipPath="url(#a)"><path fill="currentColor" d="M.502 7.002v-2c0-.928 0-1.675.078-2.26.08-.6.253-1.106.654-1.508.402-.401.91-.573 1.511-.654C3.333.501 4.083.502 5.017.502c.724 0 1.216-.008 1.669.166.452.174.811.507 1.347.99l1.98 1.78c.619.558 1.047.93 1.273 1.438s.216 1.074.216 1.907v.219c0 .928 0 1.675-.078 2.26-.08.6-.253 1.106-.654 1.508-.402.4-.907.573-1.507.654-.586.079-1.333.078-2.261.078h-2c-.929 0-1.675 0-2.26-.078-.6-.08-1.106-.253-1.508-.654-.4-.402-.573-.907-.654-1.507C.501 8.677.502 7.93.502 7.002m1 0c0 .957 0 1.624.068 2.128.066.49.187.748.371.932.185.185.444.306.933.372.504.067 1.171.068 2.128.068h2c.957 0 1.624 0 2.128-.068.49-.066.748-.187.932-.371.185-.185.306-.444.372-.933.067-.504.068-1.171.068-2.128v-.219c0-.693-.006-1.04-.06-1.285H8.998c-.575 0-1.057.002-1.438-.05-.396-.053-.758-.171-1.05-.463-.29-.291-.409-.653-.462-1.048-.051-.382-.05-.864-.05-1.439v-.97c-.207-.023-.497-.026-.981-.026-.962 0-1.633 0-2.14.068-.491.066-.751.187-.936.371-.184.185-.305.444-.37.933-.068.504-.07 1.171-.07 2.128zm5.496-4.504c0 .603 0 1.005.041 1.305.038.285.104.4.179.475.074.075.19.14.475.18.3.04.702.04 1.305.04h.692q-.149-.138-.346-.316L7.364 2.4q-.212-.191-.366-.327z"/></g><defs><clipPath id="a"><path fill="currentColor" d="M0 0h12v12H0z"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<g clipPath="url(#a)"><path fill="currentColor" d="M.836 9.336V6.669c0-1.243 0-2.225.102-2.992.106-.782.327-1.414.826-1.913s1.133-.721 1.918-.826C4.452.834 5.44.836 6.689.836c.979 0 1.598-.008 2.165.21.568.218 1.02.636 1.745 1.287l2.64 2.376c.836.753 1.372 1.222 1.656 1.86.285.637.274 1.35.274 2.476v.291c0 1.243.002 2.226-.102 2.993-.105.781-.326 1.414-.825 1.913s-1.132.72-1.913.825c-.767.104-1.75.102-2.993.102H6.669c-1.243 0-2.225.002-2.992-.102-.782-.105-1.414-.326-1.913-.825s-.72-1.132-.826-1.913c-.103-.767-.102-1.75-.102-2.993m1 0c0 1.271 0 2.174.093 2.86.09.67.26 1.056.542 1.338s.668.452 1.339.542c.685.092 1.588.093 2.859.093h2.667c1.271 0 2.174 0 2.86-.093.67-.09 1.056-.26 1.338-.542s.452-.668.542-1.339c.092-.685.093-1.588.093-2.859v-.291c0-1.03-.008-1.514-.118-1.88h-2.054c-.771 0-1.4 0-1.895-.066-.51-.069-.95-.217-1.303-.57-.353-.352-.501-.793-.57-1.302-.066-.495-.065-1.125-.065-1.896v-1.44c-.306-.05-.724-.055-1.475-.055-1.277 0-2.186 0-2.875.093-.674.09-1.062.26-1.343.542-.282.282-.452.668-.542 1.339-.092.685-.093 1.588-.093 2.859zm7.328-6.005c0 .8.001 1.35.057 1.762.053.398.15.594.285.73.136.135.33.23.73.284.412.056.961.057 1.761.057h1.347c-.197-.19-.449-.419-.775-.712L9.93 3.077a24 24 0 0 0-.765-.669z"/></g><defs><clipPath id="a"><path fill="currentColor" d="M0 0h16v16H0z"/></clipPath></defs>`,
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

const FileOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

FileOutlinedIcon.displayName = "FileOutlinedIcon";

export default FileOutlinedIcon;
