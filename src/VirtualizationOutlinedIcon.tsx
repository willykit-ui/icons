import * as React from "react";
import type { IconProps } from "./types";

/**
 * VirtualizationOutlinedIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path d="M10.55 5.972c0-.64 0-1.088-.035-1.44a3 3 0 0 0-.04-.266L6.45 6.278v4.18q.057-.02.12-.046c.255-.105.564-.267 1.01-.5l1-.525c.546-.287.924-.486 1.206-.674.273-.182.424-.334.527-.51.105-.177.168-.39.202-.733.034-.352.035-.8.035-1.44zM6 1.452c-.157 0-.323.036-.57.138-.255.105-.564.267-1.01.5l-1 .525c-.546.287-.924.486-1.206.674q-.147.1-.251.19L6 5.498l4.036-2.019a3 3 0 0 0-.25-.19c-.282-.188-.66-.387-1.206-.674l-1-.524a14 14 0 0 0-1.01-.501c-.247-.102-.413-.139-.57-.139M1.45 6.03c0 .64 0 1.088.035 1.44.034.342.097.556.202.733.103.176.255.328.527.51.282.188.66.387 1.206.674l1 .524c.446.234.755.396 1.01.501q.063.026.12.046v-4.18L1.523 4.266q-.023.119-.038.266c-.034.352-.035.8-.035 1.44zm10 0c0 .622 0 1.122-.04 1.528-.04.415-.127.77-.321 1.101-.195.332-.463.575-.803.802-.33.22-.759.445-1.288.723l-1 .524c-.432.227-.782.411-1.084.536-.31.128-.598.207-.914.207s-.604-.079-.914-.207c-.302-.125-.652-.31-1.084-.536l-1-.524c-.53-.278-.958-.502-1.288-.723-.34-.227-.608-.47-.803-.802-.194-.33-.28-.686-.321-1.101C.55 7.152.55 6.652.55 6.03v-.058c0-.623 0-1.122.04-1.528.04-.415.127-.771.321-1.101.195-.332.463-.575.803-.802.33-.22.759-.445 1.288-.723l1-.524c.432-.227.782-.411 1.084-.536C5.396.63 5.684.55 6 .55s.604.079.914.207c.302.125.652.31 1.084.536l1 .524c.53.278.958.502 1.288.723.34.227.608.47.803.802.194.33.28.686.321 1.101.04.406.04.905.04 1.528z" fill="currentColor"/></g><defs><clipPath id="a"><rect width="12" height="12" rx="2" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M14.002 7.962c0-.83 0-1.417-.046-1.88a4 4 0 0 0-.075-.463L8.502 8.31v5.603a3 3 0 0 0 .273-.099c.336-.139.741-.35 1.32-.654l1.3-.682c.709-.372 1.206-.633 1.577-.881.36-.241.568-.448.71-.69.145-.245.23-.536.274-.988.046-.463.046-1.05.046-1.88zM8.002 2c-.218 0-.447.051-.773.187-.336.138-.742.35-1.32.654l-1.3.682c-.709.372-1.206.634-1.577.881a3 3 0 0 0-.43.337l5.399 2.7 5.4-2.7a3 3 0 0 0-.43-.337c-.37-.247-.867-.509-1.575-.88l-1.301-.683c-.579-.304-.984-.516-1.32-.654C8.45 2.05 8.22 2 8.002 2m-6 6.038c0 .83 0 1.417.046 1.88.044.452.13.743.273.987.143.243.35.45.711.69.371.248.868.51 1.576.882l1.301.682c.578.304.984.515 1.32.654q.149.06.273.1V8.308l-5.38-2.69c-.03.135-.057.286-.074.463-.046.463-.046 1.05-.046 1.88zm13 0c0 .81 0 1.455-.05 1.978-.053.533-.163.982-.407 1.397-.245.416-.582.723-1.018 1.014-.425.284-.978.573-1.668.935l-1.3.683c-.562.295-1.013.532-1.4.692-.398.165-.762.263-1.157.263s-.76-.098-1.156-.263c-.388-.16-.84-.397-1.402-.692l-1.3-.683c-.69-.362-1.242-.651-1.667-.935-.436-.291-.773-.598-1.018-1.014-.244-.415-.354-.864-.406-1.397-.052-.523-.051-1.167-.051-1.978v-.076c0-.81 0-1.455.05-1.978.053-.533.163-.982.407-1.397.245-.416.582-.723 1.018-1.014.425-.284.977-.573 1.668-.935l1.3-.683c.562-.295 1.013-.532 1.4-.692C7.244 1.098 7.608 1 8.003 1s.759.098 1.156.263c.388.16.84.397 1.402.692l1.3.683c.69.362 1.242.651 1.667.935.436.291.773.598 1.018 1.014.244.415.354.864.406 1.397.052.523.051 1.167.051 1.978z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M17.498 9.953c0-1.02 0-1.748-.058-2.324a4 4 0 0 0-.128-.728L10.5 10.31v7.12c.148-.038.311-.09.496-.167.42-.174.923-.437 1.633-.81l1.6-.84c.87-.456 1.488-.781 1.95-1.09.453-.303.723-.568.91-.887.19-.32.297-.698.352-1.264.057-.576.058-1.305.058-2.324zM9.998 2.5c-.29 0-.587.069-.997.238-.42.174-.923.437-1.633.81l-1.6.84c-.87.456-1.488.781-1.95 1.09a3.5 3.5 0 0 0-.657.543L10 9.44l6.836-3.42a3.5 3.5 0 0 0-.656-.542c-.463-.31-1.082-.635-1.951-1.091l-1.6-.84c-.71-.373-1.213-.636-1.633-.81-.41-.17-.708-.238-.997-.238m-7.5 7.547c0 1.02 0 1.748.058 2.324.055.566.162.943.351 1.264.188.319.458.584.91.886.463.31 1.082.635 1.952 1.091l1.6.84c.71.373 1.212.636 1.632.81.186.076.349.13.498.169v-7.122l-6.816-3.41a4 4 0 0 0-.127.73c-.057.576-.058 1.305-.058 2.324zm16 0c0 1 0 1.786-.062 2.423-.064.646-.196 1.18-.485 1.672-.29.492-.69.858-1.217 1.21-.517.346-1.19.698-2.042 1.145l-1.6.84c-.694.364-1.244.654-1.715.849-.48.198-.913.314-1.379.314s-.898-.116-1.379-.314c-.471-.195-1.021-.485-1.716-.85l-1.6-.839c-.85-.447-1.524-.8-2.041-1.145-.528-.352-.927-.718-1.217-1.21-.29-.491-.42-1.025-.484-1.672-.063-.637-.063-1.423-.063-2.423v-.094c0-1 0-1.786.063-2.423.063-.647.195-1.18.484-1.672.29-.492.69-.858 1.217-1.21.517-.346 1.19-.698 2.042-1.145l1.6-.84c.694-.364 1.244-.654 1.715-.849.48-.198.913-.314 1.379-.314s.898.116 1.379.314c.471.195 1.021.485 1.716.85l1.6.839c.85.447 1.524.8 2.041 1.144.528.353.927.72 1.217 1.211s.42 1.025.485 1.672c.062.637.062 1.423.062 2.423z" fill="currentColor"/>`,
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

const VirtualizationOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

VirtualizationOutlinedIcon.displayName = "VirtualizationOutlinedIcon";

export default VirtualizationOutlinedIcon;
