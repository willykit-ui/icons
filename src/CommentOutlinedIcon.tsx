import * as React from "react";
import type { IconProps } from "./types";

/**
 * CommentOutlinedIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path fill="currentColor" d="M1.5 6a4.5 4.5 0 1 1 2.497 4.03 1.32 1.32 0 0 0-.927-.101l-1.113.298a.15.15 0 0 1-.184-.184l.298-1.113a1.32 1.32 0 0 0-.101-.927A4.5 4.5 0 0 1 1.5 6m-1 0c0 .879.207 1.711.574 2.45a.32.32 0 0 1 .031.22L.808 9.785a1.15 1.15 0 0 0 1.408 1.408l1.113-.297a.32.32 0 0 1 .222.03A5.5 5.5 0 1 0 .5 6"/></g><defs><clipPath id="a"><path fill="currentColor" d="M0 0h12v12H0z"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<g clipPath="url(#a)"><path fill="currentColor" d="M14.5 6.95c0-1.155 0-1.987-.062-2.636-.062-.641-.179-1.052-.38-1.381a3 3 0 0 0-.99-.99c-.33-.202-.741-.32-1.383-.38-.648-.062-1.48-.063-2.635-.063h-2.1c-1.155 0-1.987 0-2.636.063-.641.06-1.052.178-1.381.38a3 3 0 0 0-.99.99c-.202.329-.32.74-.38 1.381-.062.65-.063 1.48-.063 2.636v.7c0 .822 0 1.414.032 1.881.032.463.093.766.197 1.017a3 3 0 0 0 1.623 1.624c.365.151.83.207 1.71.223.288.005.538.008.745.03.216.025.426.072.627.19.199.115.343.27.47.445.12.165.244.375.386.616l.38.64a.39.39 0 0 0 .66 0l.38-.64c.142-.24.266-.451.387-.616.126-.174.27-.33.47-.446.2-.117.41-.164.626-.188.207-.023.457-.027.745-.031.88-.016 1.345-.072 1.71-.223a3 3 0 0 0 1.624-1.624c.103-.25.164-.554.196-1.017.032-.467.032-1.059.032-1.88zm-5.833.55a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm1.666-2a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zM15.5 7.65c0 .809 0 1.44-.034 1.949-.035.513-.108.939-.27 1.332a4 4 0 0 1-2.166 2.165c-.558.23-1.196.282-2.074.298-.307.005-.503.01-.653.026a.6.6 0 0 0-.234.06.6.6 0 0 0-.164.168c-.086.118-.183.28-.335.537l-.379.641c-.531.899-1.85.899-2.382 0l-.38-.641a7 7 0 0 0-.334-.537.6.6 0 0 0-.164-.168.6.6 0 0 0-.234-.06 8 8 0 0 0-.653-.026c-.878-.016-1.516-.067-2.074-.298A4 4 0 0 1 .805 10.93c-.163-.393-.236-.819-.27-1.332C.498 9.089.5 8.459.5 7.65v-.7c0-1.136 0-2.023.066-2.73.068-.715.21-1.297.524-1.81a4 4 0 0 1 1.32-1.32C2.923.776 3.505.634 4.22.566 4.927.5 5.814.5 6.95.5h2.1c1.136 0 2.023 0 2.73.066.715.068 1.297.21 1.81.524a4 4 0 0 1 1.32 1.32c.314.513.456 1.095.524 1.81.067.707.066 1.594.066 2.73z"/></g><defs><clipPath id="a"><path fill="currentColor" d="M0 0h16v16H0z"/></clipPath></defs>`,
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

const CommentOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

CommentOutlinedIcon.displayName = "CommentOutlinedIcon";

export default CommentOutlinedIcon;
