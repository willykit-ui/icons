import * as allIcons from "../index";
import manifest from "../../icons/icons-manifest.json";

export interface IconInfo {
  name: string;
  componentName: string;
  component: React.ComponentType<any>;
  deprecated: boolean;
  tags: string[];
  category: string;
}

// Построение карты метаданных из манифеста
const metaMap = new Map<string, { tags: string[]; category: string }>();
for (const item of manifest.icons as any[]) {
  // item.name: e.g. "AlignBottom_Outlined_12px"
  const baseCleanName = item.name
    .replace(/[-_](small|medium|large|12px|16px|20px|12|16|20)$/i, "")
    .replace(/_/g, "");

  if (!metaMap.has(baseCleanName.toLowerCase())) {
    metaMap.set(baseCleanName.toLowerCase(), {
      tags: item.tags || [],
      category: item.category || "general",
    });
  }
}

// Create an object with icon names mapped to their components
const iconExports: Record<string, any> = {};
const iconList: IconInfo[] = [];

// Extract icon component names from the exports
Object.keys(allIcons).forEach((key) => {
  if (key.endsWith("Icon")) {
    const iconComponent = (allIcons as Record<string, any>)[key];
    const iconName = key.replace(/Icon$/, "");
    iconExports[iconName] = iconComponent;

    const meta = metaMap.get(iconName.toLowerCase());

    iconList.push({
      name: iconName,
      componentName: key,
      component: iconComponent,
      deprecated: Boolean(iconComponent?.deprecated),
      tags: meta?.tags || [],
      category: meta?.category || "general",
    });
  }
});

export const icons = iconExports;
export const iconsList = iconList.sort((a, b) => a.name.localeCompare(b.name));
export type { IconProps } from "../types";

// Export all icon components individually as well
export * from "../index";
