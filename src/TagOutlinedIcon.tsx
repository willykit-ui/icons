import * as React from "react";
import type { IconProps } from "./types";

/**
 * TagOutlinedIcon icon component.
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
      __html: `<path fill="currentColor" d="M10.594 6c0-.114-.03-.242-.132-.452-.108-.22-.274-.487-.524-.886l-.334-.534c-.294-.471-.496-.795-.68-1.035-.177-.232-.315-.354-.462-.436-.147-.081-.324-.133-.614-.16a7 7 0 0 0-.525-.026l-.715-.004H5.314c-.964 0-1.638 0-2.146.07-.493.066-.756.187-.942.374-.187.187-.309.45-.375.943-.069.508-.07 1.181-.07 2.146s.001 1.638.07 2.146c.066.494.188.757.375.944.186.187.449.308.942.375.508.068 1.182.07 2.146.07h1.294c.556 0 .939-.001 1.24-.03.29-.028.467-.08.614-.161.147-.082.284-.204.462-.436.184-.24.386-.564.68-1.035l.334-.534c.25-.399.416-.666.524-.887.102-.21.132-.338.132-.452m-7.73 2.475V3.54a.5.5 0 0 1 1 0v4.935a.5.5 0 0 1-1 0m5.439-2.57a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0m3.29.095c0 .32-.092.603-.233.892-.135.277-.335.595-.573.976l-.334.535c-.284.456-.517.827-.736 1.114-.226.295-.462.53-.77.702-.31.17-.635.246-1.005.281-.36.034-.797.034-1.334.034H5.314c-.936 0-1.689 0-2.279-.079-.604-.081-1.113-.255-1.516-.658-.404-.404-.578-.912-.66-1.517C.78 7.69.781 6.937.781 6S.78 4.31.86 3.72c.082-.604.256-1.112.66-1.516.403-.404.912-.578 1.516-.66.59-.078 1.343-.077 2.28-.077h1.293l.734.004q.33.005.6.03c.37.035.695.11 1.004.281s.545.407.77.702c.22.287.453.658.737 1.114l.334.534c.238.38.438.699.573.976.141.289.234.572.234.892m-2.29-.096a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<g clipPath="url(#a)"><path fill="currentColor" d="M14.169 8.178c0-.404-.155-.801-.57-1.344-.422-.554-1.066-1.2-1.972-2.106l-1.22-1.22c-.522-.521-.89-.888-1.208-1.15-.31-.256-.545-.39-.79-.46s-.515-.083-.914-.03c-.41.054-.915.171-1.634.337l-.82.188c-.606.14-1.024.238-1.344.347-.308.106-.483.21-.615.342s-.236.307-.342.615c-.11.32-.206.738-.347 1.345l-.188.82c-.166.718-.283 1.224-.337 1.633-.053.399-.04.669.03.914s.204.48.46.79c.262.319.629.686 1.15 1.208l1.22 1.22c.907.906 1.551 1.55 2.106 1.973.543.414.94.569 1.344.569.403 0 .8-.155 1.343-.57.555-.422 1.2-1.066 2.106-1.972s1.55-1.551 1.973-2.106c.414-.542.569-.94.569-1.343m-2.175-.849a.501.501 0 0 1 .708.708L8.05 12.689a.5.5 0 0 1-.707-.707zM4.44 4.626a1.833 1.833 0 1 1 2.593 2.593A1.833 1.833 0 0 1 4.44 4.626m1.886.707a.834.834 0 1 0-1.179 1.179.834.834 0 0 0 1.18-1.18m8.843 2.845c0 .71-.293 1.318-.774 1.95-.474.62-1.175 1.32-2.061 2.206s-1.586 1.587-2.206 2.06c-.632.482-1.24.775-1.95.775s-1.319-.293-1.95-.774c-.62-.474-1.32-1.175-2.207-2.061l-1.22-1.22c-.508-.508-.915-.914-1.215-1.278-.307-.372-.527-.729-.649-1.152-.12-.422-.123-.842-.06-1.32.062-.467.192-1.028.353-1.728l.189-.819c.135-.587.245-1.065.376-1.445.134-.39.303-.72.58-.997s.606-.446.997-.58c.38-.13.858-.24 1.445-.376l.819-.189c.7-.161 1.26-.291 1.728-.353.478-.063.898-.06 1.32.06.423.122.78.342 1.152.649.364.3.77.707 1.278 1.216l1.22 1.22c.886.886 1.587 1.585 2.06 2.205.482.632.775 1.24.775 1.95"/></g><defs><clipPath id="a"><path fill="currentColor" d="M0 0h16v16H0z"/></clipPath></defs>`,
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

const TagOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

TagOutlinedIcon.displayName = "TagOutlinedIcon";

export default TagOutlinedIcon;
