import * as React from "react";
import type { IconProps } from "./types";

/**
 * SuperscriptOutlinedIcon icon component.
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
      __html: `<path d="M6.682 4.682a.45.45 0 0 1 .636.636L5.137 7.5l2.181 2.182a.45.45 0 0 1-.636.636L4.5 8.137l-2.182 2.181a.45.45 0 0 1-.636-.636L3.863 7.5 1.682 5.318a.45.45 0 0 1 .636-.636L4.5 6.863zM9.475.945q.455 0 .79.153.337.152.52.425.186.272.186.631 0 .23-.092.453-.092.225-.33.497a7 7 0 0 1-.672.65l-.479.441v.026h1.232a.39.39 0 0 1 0 .779H8.537a.479.479 0 0 1-.315-.838l1.296-1.135q.163-.149.279-.271.115-.125.176-.25a.63.63 0 0 0-.012-.559.5.5 0 0 0-.2-.183.6.6 0 0 0-.29-.065.6.6 0 0 0-.291.069.47.47 0 0 0-.196.193c-.083.155-.211.309-.387.309h-.139c-.253 0-.47-.211-.392-.452q.045-.135.118-.254.183-.296.515-.457.334-.162.776-.162" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M9.146 6.143a.5.5 0 0 1 .707.707L6.705 9.998l3.148 3.149a.5.5 0 0 1-.707.707l-3.148-3.149-3.147 3.147a.5.5 0 0 1-.708-.707l3.148-3.147-3.145-3.144a.5.5 0 1 1 .707-.708l3.145 3.145zm3.307-4.567q.497 0 .863.166.367.167.567.465.202.296.202.689 0 .248-.1.494a2 2 0 0 1-.36.54 8 8 0 0 1-.732.71l-.523.482v.027h1.344a.425.425 0 0 1 0 .85H11.43a.522.522 0 0 1-.344-.914L12.5 3.848q.179-.162.305-.296.125-.137.192-.274a.7.7 0 0 0 .065-.3.6.6 0 0 0-.079-.31.53.53 0 0 0-.216-.2.7.7 0 0 0-.318-.07.65.65 0 0 0-.317.076.5.5 0 0 0-.213.21c-.091.17-.232.337-.424.337h-.15c-.276 0-.513-.23-.428-.493q.048-.147.128-.276.2-.324.562-.5.364-.176.846-.176" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M11.612 7.611a.55.55 0 0 1 .777.778l-4.112 4.11 4.112 4.112a.55.55 0 1 1-.777.778l-4.113-4.113-4.109 4.11a.551.551 0 0 1-.778-.777l4.11-4.11-4.11-4.11a.55.55 0 1 1 .777-.778l4.11 4.11zM15.82 1.84q.58 0 1.008.194.427.195.66.541.237.346.237.804 0 .291-.117.576-.117.286-.42.632-.3.345-.855.827l-.609.563v.032h1.567a.496.496 0 0 1 0 .991h-2.664a.608.608 0 0 1-.401-1.066l1.65-1.445a6 6 0 0 0 .355-.344q.147-.16.223-.319a.8.8 0 0 0 .078-.35q0-.212-.092-.36a.6.6 0 0 0-.254-.234.8.8 0 0 0-.37-.082.76.76 0 0 0-.37.087.6.6 0 0 0-.25.246c-.106.197-.268.392-.492.392h-.177c-.322 0-.597-.268-.498-.574q.056-.173.15-.323.233-.378.655-.582.425-.206.987-.206" fill="currentColor"/>`,
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

const SuperscriptOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

SuperscriptOutlinedIcon.displayName = "SuperscriptOutlinedIcon";

export default SuperscriptOutlinedIcon;
