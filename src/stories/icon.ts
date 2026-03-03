import * as allIcons from "../index";

// Create an object with icon names mapped to their components
const iconExports: Record<string, any> = {};

// Extract icon component names from the exports
Object.keys(allIcons).forEach((key) => {
  if (key.endsWith("Icon")) {
    // Remove 'Icon' suffix to get the base name
    const iconName = key.replace(/Icon$/, "");
    iconExports[iconName] = allIcons[key as keyof typeof allIcons];
  }
});

export const icons = iconExports;
export type { IconProps } from "../types";

// Export all icon components individually as well
export * from "../index";
