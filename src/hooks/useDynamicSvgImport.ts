import * as allIcons from "../assets/icons";
import React from "react";

type IconIndexSignature = {
    [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export function useDynamicSvgImport(iconName: string) {
    const SvgIcon = (allIcons as IconIndexSignature)[iconName] || null;

    return { SvgIcon };
}
