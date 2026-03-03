import React from "react";
import * as IconComponents from "../index";

interface IconExampleProps {
  icon: string;
}

export const IconExample: React.FC<IconExampleProps> = ({ icon }) => {
  // Convert icon name to component name format
  // e.g., 'ArchiveOutlined' becomes 'ArchiveOutlinedIcon'
  const componentName = `${icon}Icon`;

  // Find the corresponding icon component
  const IconComponent = (
    IconComponents as Record<string, React.ComponentType<any>>
  )[componentName];

  if (!IconComponent) {
    console.warn(`Icon component not found: ${componentName}`);
    return <div>Icon not found: {icon}</div>;
  }

  // Render the icon component with proper props
  return React.createElement(IconComponent, { fontSize: "medium" });
};
