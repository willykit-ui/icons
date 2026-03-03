import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import ArchiveOutlinedIcon from "../ArchiveOutlinedIcon.js";

const meta: Meta<typeof ArchiveOutlinedIcon> = {
  title: "Design System/Icons/ArchiveOutlinedIcon",
  component: ArchiveOutlinedIcon,
  tags: ["autodocs"],
  argTypes: {
    fontSize: {
      control: {
        type: "radio",
        options: ["small", "medium", "large", 12, 16, 20, 24, 32, 48],
      },
      description: "Размер иконки",
      defaultValue: { summary: "medium" },
    },
    color: {
      control: { type: "color" },
      description: "Цвет иконки",
      defaultValue: { summary: "currentColor" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ArchiveOutlinedIcon>;

// Базовый пример
export const Basic: Story = {
  args: {
    fontSize: "medium",
    color: "currentColor",
  },
};

// Пример с разными размерами
export const WithDifferentSizes: Story = {
  render: (args) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "flex-start",
      }}
    >
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <span>Small:</span>
        <ArchiveOutlinedIcon {...args} fontSize="small" />
      </div>
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <span>Medium:</span>
        <ArchiveOutlinedIcon {...args} fontSize="medium" />
      </div>
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <span>Large:</span>
        <ArchiveOutlinedIcon {...args} fontSize="large" />
      </div>
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <span>Custom 32px:</span>
        <ArchiveOutlinedIcon {...args} fontSize={32} />
      </div>
    </div>
  ),
};

// Пример с разными цветами
export const WithDifferentColors: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <span>Primary:</span>
        <ArchiveOutlinedIcon {...args} color="#1890ff" />
      </div>
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <span>Success:</span>
        <ArchiveOutlinedIcon {...args} color="#52c41a" />
      </div>
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <span>Error:</span>
        <ArchiveOutlinedIcon {...args} color="#ff4d4f" />
      </div>
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <span>Warning:</span>
        <ArchiveOutlinedIcon {...args} color="#faad14" />
      </div>
    </div>
  ),
};

// Пример использования в интерактивном режиме
export const Interactive: Story = {
  args: {
    fontSize: "medium",
    color: "#1890ff",
  },
};
