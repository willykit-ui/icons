import * as React from "react";
import type { IconProps } from "./types";

/**
 * SubscriptOutlinedIcon icon component.
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
      __html: `<path d="M9.475 7q.455.002.79.153.337.153.52.426.186.271.186.63 0 .23-.092.454-.092.225-.33.496a7 7 0 0 1-.672.65l-.479.442v.025h1.232a.39.39 0 0 1 0 .78H8.537a.479.479 0 0 1-.315-.838l1.296-1.135q.163-.149.279-.272.115-.124.176-.25a.63.63 0 0 0-.012-.558.5.5 0 0 0-.2-.184.64.64 0 0 0-.29-.064.6.6 0 0 0-.291.068.47.47 0 0 0-.196.194c-.083.155-.211.308-.387.308h-.139c-.253 0-.47-.21-.392-.451q.045-.135.118-.254.183-.297.515-.457.334-.162.776-.162M6.807 1.556a.45.45 0 0 1 .636.636L5.136 4.5l2.307 2.308a.45.45 0 0 1-.636.636L4.499 5.137 2.191 7.444a.45.45 0 0 1-.636-.636L3.862 4.5 1.557 2.194a.45.45 0 0 1 .636-.636L4.5 3.863z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M12.454 9.576q.495 0 .863.166.366.166.566.465.202.296.202.688 0 .25-.1.495a2 2 0 0 1-.36.54 8 8 0 0 1-.732.71l-.523.482v.027h1.344a.425.425 0 0 1 0 .85h-2.283a.522.522 0 0 1-.344-.914l1.413-1.237q.18-.162.305-.296.125-.137.191-.274a.7.7 0 0 0 .067-.3.6.6 0 0 0-.08-.31.53.53 0 0 0-.216-.2.7.7 0 0 0-.317-.07.65.65 0 0 0-.318.076.5.5 0 0 0-.214.21c-.09.17-.23.336-.422.336h-.152c-.276 0-.512-.23-.427-.492q.048-.147.128-.276.2-.324.563-.5.364-.176.845-.176M9.147 2.143a.5.5 0 0 1 .707.707L6.705 5.998l3.149 3.148a.5.5 0 0 1-.708.707L5.997 6.705 2.851 9.852a.5.5 0 0 1-.707-.707L5.29 5.998 2.147 2.853a.5.5 0 1 1 .707-.707l3.144 3.145z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M15.821 12.84q.58 0 1.007.195.428.195.661.541.236.346.235.804 0 .29-.116.576t-.42.632q-.3.345-.855.827l-.61.563v.032h1.568a.496.496 0 0 1 0 .99h-2.663a.609.609 0 0 1-.402-1.065l1.65-1.445q.209-.188.355-.344.147-.16.224-.319a.8.8 0 0 0 .077-.35q0-.211-.093-.36a.6.6 0 0 0-.253-.234.8.8 0 0 0-.37-.082.76.76 0 0 0-.37.087.6.6 0 0 0-.249.246c-.106.197-.27.392-.494.392h-.176c-.322 0-.597-.268-.498-.574q.056-.173.149-.323.233-.378.656-.582.425-.207.987-.206m-4.21-10.229a.55.55 0 1 1 .778.778L8.277 7.5l4.112 4.112a.55.55 0 1 1-.778.778L7.5 8.278 3.39 12.39a.55.55 0 0 1-.779-.778l4.112-4.111L2.61 3.39a.55.55 0 1 1 .778-.778l4.11 4.112z" fill="currentColor"/>`,
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

const SubscriptOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

SubscriptOutlinedIcon.displayName = "SubscriptOutlinedIcon";

export default SubscriptOutlinedIcon;
