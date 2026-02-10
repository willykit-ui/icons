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
      __html: `<path fillRule="evenodd" d="M13.014 1.168c.506 0 .93.21 1.347.528.405.31.859.765 1.417 1.323l1.205 1.206c.558.558 1.013 1.01 1.322 1.416.318.416.53.841.53 1.347s-.212.93-.53 1.347c-.309.405-.764.859-1.322 1.417L9.75 16.983c-.558.559-1.011 1.014-1.417 1.323-.416.318-.84.529-1.346.529s-.931-.211-1.348-.53c-.405-.308-.858-.764-1.416-1.322l-1.206-1.205c-.558-.558-1.013-1.011-1.322-1.417-.318-.416-.528-.84-.529-1.346 0-.507.21-.931.529-1.348.309-.405.764-.859 1.322-1.417l7.232-7.231c.558-.559 1.011-1.014 1.416-1.323.417-.318.842-.528 1.348-.528m0 1c-.2 0-.413.073-.741.323-.283.216-.606.53-1.041.963l.889.889a.5.5 0 0 1-.707.707l-.891-.89-1.06 1.06 1.479 1.48a.5.5 0 1 1-.707.706l-1.48-1.48-1.06 1.061.89.89a.5.5 0 0 1-.707.708l-.89-.89-1.06 1.06 1.479 1.48a.5.5 0 1 1-.707.706l-1.48-1.48-1.06 1.062.89.89a.5.5 0 0 1-.707.707l-.888-.889c-.434.436-.748.76-.964 1.042-.25.328-.324.542-.324.742s.074.412.324.74c.259.34.656.738 1.234 1.316l1.206 1.205c.578.579.977.976 1.317 1.235.327.25.54.324.74.324s.412-.074.74-.324c.34-.26.738-.656 1.316-1.235l7.232-7.231c.578-.578.975-.977 1.234-1.316.25-.328.324-.541.324-.74 0-.2-.074-.413-.324-.74-.259-.34-.656-.74-1.234-1.317L15.07 3.726c-.578-.578-.977-.976-1.317-1.235-.327-.25-.54-.323-.74-.323" clipRule="evenodd" fill="currentColor"/>`,
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
