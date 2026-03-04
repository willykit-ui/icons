import * as React from "react";
import type { IconProps } from "./types";

/**
 * VirtualizationAddOutlinedIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path fillRule="evenodd" d="M6.001.676c.481 0 .91.189 1.45.464a.45.45 0 0 1-.408.802c-.546-.278-.8-.366-1.042-.366-.15 0-.311.035-.551.134-.248.103-.549.26-.984.488l-.974.512c-.533.28-.902.473-1.176.656q-.133.09-.23.173L6 5.496l1.58-.789a.45.45 0 0 1 .402.805l-1.53.765v4.053l.101-.038c.248-.103.549-.26.984-.488l.974-.512c.533-.28.902-.473 1.176-.656.265-.177.411-.325.51-.494.193-.327.227-.745.23-1.816a.45.45 0 0 1 .9.001c-.002 1-.013 1.692-.354 2.272-.191.325-.453.563-.786.785-.323.215-.74.434-1.257.705l-.975.512c-.421.22-.763.4-1.058.522-.303.125-.586.203-.896.203s-.592-.078-.895-.203c-.295-.122-.637-.302-1.058-.522l-.975-.512c-.516-.27-.934-.49-1.257-.705-.333-.222-.595-.46-.786-.785C.84 8.275.755 7.926.715 7.52.676 7.124.676 6.636.676 6.029v-.056c0-.607 0-1.095.04-1.492.04-.405.123-.754.314-1.078s.453-.563.786-.785c.323-.215.74-.434 1.257-.705l.975-.512c.421-.22.763-.4 1.058-.522.303-.125.586-.203.895-.203M1.645 4.324a3 3 0 0 0-.034.246c-.034.343-.034.779-.034 1.403v.056c0 .624 0 1.06.034 1.403.033.332.094.54.194.71s.246.317.51.494c.275.183.644.377 1.177.656l.974.512c.435.228.736.385.984.488l.101.038V6.277z" clipRule="evenodd" fill="currentColor"/><path d="M9.5 1.3a.45.45 0 0 1 .45.451v1.05H11a.45.45 0 0 1 0 .9H9.95v1.05a.45.45 0 0 1-.9 0v-1.05H8a.45.45 0 0 1 0-.9h1.05V1.75a.45.45 0 0 1 .45-.45" fill="currentColor"/></g><defs><clipPath id="a"><rect width="12" height="12" rx="2" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path fillRule="evenodd" d="M8.002 1c.615 0 1.167.24 1.889.607a.5.5 0 0 1-.453.892C8.708 2.129 8.35 2 8.002 2c-.218 0-.447.051-.773.187-.336.138-.742.35-1.32.654l-1.3.682c-.709.372-1.206.634-1.577.881a3 3 0 0 0-.428.336l5.398 2.7 2.15-1.075a.5.5 0 0 1 .448.895L8.502 8.308v5.604a3 3 0 0 0 .273-.099c.336-.139.741-.35 1.32-.654l1.3-.682c.709-.372 1.206-.633 1.577-.881.36-.241.568-.448.71-.69.274-.465.317-1.052.32-2.472a.5.5 0 1 1 1 .002c-.003 1.341-.019 2.233-.457 2.977-.245.416-.582.723-1.018 1.014-.425.284-.978.573-1.668.935l-1.3.683c-.562.295-1.013.532-1.4.692-.398.165-.762.263-1.157.263s-.76-.098-1.156-.263c-.388-.16-.84-.397-1.402-.692l-1.3-.683c-.69-.362-1.242-.651-1.667-.935-.436-.291-.773-.598-1.018-1.014-.244-.415-.354-.864-.406-1.397-.052-.523-.051-1.167-.051-1.978v-.076c0-.81 0-1.455.05-1.978.053-.533.163-.982.407-1.397.245-.416.582-.723 1.018-1.014.425-.284.977-.573 1.668-.935l1.3-.683c.562-.295 1.013-.532 1.4-.692C7.244 1.098 7.608 1 8.003 1m-5.88 4.618a4 4 0 0 0-.075.464c-.046.463-.046 1.05-.046 1.88v.076c0 .83 0 1.417.046 1.88.044.452.13.743.273.987.143.243.35.45.711.69.371.248.868.51 1.576.882l1.301.682c.578.304.984.515 1.32.654q.149.06.273.1V8.307z" clipRule="evenodd" fill="currentColor"/><path d="M12.666 1.834a.5.5 0 0 1 .5.5v1.5h1.5a.5.5 0 1 1 0 1h-1.5v1.5a.5.5 0 1 1-1 0v-1.5h-1.5a.5.5 0 0 1 0-1h1.5v-1.5a.5.5 0 0 1 .5-.5" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path fillRule="evenodd" d="M10.003 1.324c.748 0 1.424.292 2.326.751a.55.55 0 0 1-.498.98c-.91-.462-1.372-.631-1.828-.631-.286 0-.583.068-.996.24-.424.174-.934.44-1.655.82l-1.625.853c-.884.464-1.51.793-1.978 1.105a3.6 3.6 0 0 0-.621.503l6.875 3.438 2.72-1.36a.55.55 0 0 1 .493.984l-2.663 1.33v7.152a4 4 0 0 0 .446-.154c.424-.175.934-.442 1.655-.82l1.625-.854c.884-.464 1.51-.793 1.978-1.105.456-.305.725-.57.912-.887.354-.6.406-1.358.41-3.128a.55.55 0 1 1 1.099.002c-.003 1.683-.027 2.775-.562 3.685-.298.507-.71.883-1.248 1.243-.527.352-1.214.712-2.078 1.165l-1.625.852c-.704.37-1.265.665-1.746.864-.49.203-.936.322-1.416.322s-.925-.12-1.416-.322c-.481-.2-1.042-.494-1.746-.864l-1.625-.852c-.864-.453-1.55-.813-2.078-1.165-.539-.36-.95-.736-1.248-1.244-.298-.505-.433-1.055-.498-1.715-.064-.65-.064-1.45-.064-2.465V9.95c0-1.015 0-1.816.064-2.465.065-.66.2-1.21.498-1.715.298-.507.709-.884 1.248-1.244.527-.352 1.214-.711 2.078-1.165L6.84 2.51c.704-.37 1.265-.665 1.746-.864.49-.202.935-.322 1.416-.322M2.6 6.912a4.4 4.4 0 0 0-.115.683c-.057.582-.058 1.32-.058 2.356v.096c0 1.036 0 1.774.058 2.356.057.572.163.947.35 1.266.187.317.457.582.913.887.468.312 1.094.641 1.978 1.105l1.625.854c.721.378 1.231.645 1.655.82q.246.1.446.154v-7.151z" clipRule="evenodd" fill="currentColor"/><path d="M15.833 2.367a.55.55 0 0 1 .55.55v1.95h1.95a.55.55 0 0 1 0 1.1h-1.95v1.95a.55.55 0 0 1-1.1 0v-1.95h-1.95a.55.55 0 1 1 0-1.1h1.95v-1.95a.55.55 0 0 1 .55-.55" fill="currentColor"/>`,
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

const VirtualizationAddOutlinedIcon = React.forwardRef<
  SVGSVGElement,
  IconProps
>((props, ref) => {
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
});

VirtualizationAddOutlinedIcon.displayName = "VirtualizationAddOutlinedIcon";

export default VirtualizationAddOutlinedIcon;
