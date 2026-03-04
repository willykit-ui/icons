import * as React from "react";
import type { IconProps } from "./types";

/**
 * RulerOutlinedIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path fillRule="evenodd" d="M7.808.55c.35 0 .636.148.9.348.252.193.533.475.865.807l.723.724c.332.332.614.612.807.865.2.263.348.55.348.9 0 .349-.147.635-.348.899-.193.253-.475.533-.807.865l-4.338 4.339c-.332.332-.613.613-.866.806-.263.202-.55.348-.9.348-.349 0-.635-.147-.899-.348-.253-.192-.533-.474-.865-.806l-.723-.724c-.332-.332-.614-.612-.807-.865-.2-.263-.348-.55-.348-.9s.147-.635.348-.899c.193-.253.475-.533.807-.865l4.338-4.339c.332-.332.613-.614.866-.807.263-.2.55-.347.9-.347m0 .901c-.074 0-.17.024-.353.163a6 6 0 0 0-.504.46l.427.427a.45.45 0 0 1-.636.637l-.429-.429-.424.424.782.782a.45.45 0 0 1-.636.637l-.783-.782-.423.423.428.43a.45.45 0 0 1-.636.636l-.43-.429-.423.424.782.782a.45.45 0 0 1-.636.637L3.13 5.89l-.423.423.428.43a.45.45 0 0 1-.636.636l-.428-.428a6 6 0 0 0-.458.503c-.14.183-.163.28-.163.354s.023.17.163.353c.148.194.378.425.727.775l.724.723c.35.35.58.58.774.728.184.14.28.163.354.163s.17-.024.353-.163c.194-.148.425-.378.775-.728l4.34-4.338c.35-.35.58-.58.727-.774.14-.183.163-.28.163-.354s-.023-.17-.163-.353c-.148-.194-.378-.425-.727-.775l-.724-.723c-.35-.35-.58-.58-.774-.728-.184-.14-.28-.163-.354-.163" clipRule="evenodd" fill="currentColor"/></g><defs><clipPath id="a"><rect width="12" height="12" rx="5" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<g clipPath="url(#a)"><path fillRule="evenodd" d="M10.411.834c.436 0 .797.182 1.139.443.33.253.699.622 1.143 1.067l.964.965c.445.444.814.812 1.067 1.143.26.342.443.702.443 1.138s-.182.796-.443 1.139c-.253.33-.622.699-1.067 1.143l-5.785 5.785c-.444.445-.813.814-1.143 1.067-.343.26-.703.443-1.14.443-.435 0-.795-.182-1.137-.443-.33-.253-.699-.622-1.143-1.067l-.965-.964c-.445-.444-.814-.812-1.067-1.143-.26-.343-.443-.703-.443-1.139s.182-.796.443-1.139c.253-.33.622-.699 1.067-1.143l5.785-5.785c.444-.445.813-.814 1.143-1.067.343-.26.703-.443 1.14-.443m0 1c-.129 0-.279.045-.532.238-.206.157-.44.382-.752.692l.64.64a.5.5 0 1 1-.707.706l-.642-.641-.707.707 1.113 1.113a.5.5 0 1 1-.707.707L7.004 4.883l-.707.707.641.641a.5.5 0 1 1-.707.707l-.641-.641-.707.707 1.113 1.113a.5.5 0 1 1-.707.707L4.176 7.711l-.707.707.641.642a.5.5 0 1 1-.707.707l-.64-.64c-.309.312-.534.546-.69.752-.194.253-.239.403-.239.532 0 .13.045.279.238.532.202.265.514.579.979 1.043l.965.964c.464.465.778.777 1.043.979.253.193.402.238.53.238.13 0 .28-.045.533-.238.265-.202.579-.514 1.043-.979l5.785-5.785c.465-.464.777-.778.979-1.043.193-.253.238-.403.238-.532 0-.13-.045-.278-.238-.531-.202-.265-.514-.579-.979-1.043l-.964-.965c-.464-.465-.778-.777-1.043-.979-.253-.193-.403-.238-.532-.238" clipRule="evenodd" fill="currentColor"/></g><defs><clipPath id="a"><rect width="16" height="16" rx="5" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path fillRule="evenodd" d="M13.015 1.117c.52 0 .955.218 1.377.54.408.31.865.769 1.422 1.325l1.206 1.205c.556.557 1.014 1.014 1.326 1.422.321.422.539.857.539 1.378 0 .522-.218.956-.54 1.377-.31.409-.769.865-1.325 1.422L9.787 17.02c-.557.556-1.013 1.014-1.422 1.326-.42.32-.855.539-1.377.539-.521 0-.956-.218-1.378-.54-.408-.31-.865-.768-1.422-1.325l-1.205-1.206c-.557-.557-1.014-1.014-1.326-1.422-.321-.422-.54-.856-.54-1.377 0-.522.219-.957.54-1.378.312-.409.77-.865 1.326-1.422l7.232-7.232c.557-.556 1.013-1.014 1.422-1.326.42-.321.856-.539 1.378-.539m0 1.1c-.185 0-.388.067-.711.313-.273.208-.583.51-1 .924l.852.853a.55.55 0 0 1-.778.777l-.855-.855-.99.99 1.444 1.444a.55.55 0 0 1-.777.777L8.756 5.997l-.99.99.855.855a.55.55 0 0 1-.778.777l-.855-.854-.99.989 1.444 1.444a.55.55 0 0 1-.777.778L5.22 9.53l-.99.99.856.856a.55.55 0 0 1-.778.777l-.853-.852c-.415.417-.716.728-.924 1-.247.324-.313.527-.313.712s.067.386.313.71c.257.336.652.732 1.23 1.311l1.206 1.205c.579.58.975.974 1.311 1.23.323.247.526.313.71.313s.387-.066.71-.312c.336-.257.733-.652 1.312-1.23l7.231-7.232c.58-.58.974-.976 1.23-1.312.247-.323.313-.525.313-.71s-.066-.387-.312-.71c-.257-.336-.652-.732-1.23-1.311L15.035 3.76c-.579-.58-.975-.974-1.311-1.23-.323-.247-.526-.314-.71-.314" clipRule="evenodd" fill="currentColor"/>`,
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

const RulerOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

RulerOutlinedIcon.displayName = "RulerOutlinedIcon";

export default RulerOutlinedIcon;
