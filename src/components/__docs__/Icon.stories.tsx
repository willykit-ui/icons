import React, { useState } from "react";
import * as icons from "../../index";
import { getBaseIconName } from "../../utils/utils";

export default {
  title: "Icons/All Icons",
};

const iconEntries = Object.entries(icons);

const groupNames = ["filled", "outlined"];

function getGroup(name: string) {
  if (name.toLowerCase().includes("filled")) return "filled";
  if (name.toLowerCase().includes("outlined")) return "outlined";
  return "other";
}

export const AllIcons = () => {
  const [selectedGroup, setSelectedGroup] = useState(groupNames[0]);
  const [search, setSearch] = useState("");
  const [copyCode, setCopyCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const filteredIcons = iconEntries.filter(
    ([key]) => getGroup(key) === selectedGroup,
  );
  const matchingIcons = filteredIcons.filter(([key]) =>
    key.toLowerCase().includes(search.toLowerCase()),
  );

  const handleIconClick = (key: string) => {
    setCopyCode(`<${key} />`);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (copyCode) {
      await navigator.clipboard.writeText(copyCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#fff",
        color: "#000",
        fontFamily: "sans-serif",
        borderRadius: "12px",
        border: "1px solid #ddd",
        display: "flex",
        maxHeight: "95vh",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar */}
        <div style={{ width: "180px", marginRight: "20px" }}>
          <h3 style={{ fontSize: "16px", marginBottom: "10px" }}>
            Фильтр стиля
          </h3>
          {groupNames.map((group) => (
            <div key={group} style={{ marginBottom: "10px" }}>
              <label style={{ cursor: "pointer" }}>
                <input
                  type="radio"
                  value={group}
                  checked={selectedGroup === group}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  style={{ marginRight: "8px" }}
                />
                {group.charAt(0).toUpperCase() + group.slice(1)}
              </label>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div style={{ flexGrow: 1 }}>
          <div
            style={{
              padding: "12px 16px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              backgroundColor: "#f9f9f9",
            }}
          >
            <span role="img" aria-label="search" style={{ marginRight: "8px" }}>
              🔍
            </span>
            <input
              type="text"
              placeholder="Поиск..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: "14px",
              }}
            />
          </div>

          <p style={{ fontSize: "14px", marginBottom: "12px", color: "#555" }}>
            найдено {matchingIcons.length}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
              gap: "20px",
            }}
          >
            {matchingIcons.map(([key, Icon]) => {
              if (!Icon) return null;
              return (
                <div
                  key={key}
                  style={{ textAlign: "center", cursor: "pointer" }}
                  onClick={() => handleIconClick(key)}
                  title="Показать код для копирования"
                >
                  <Icon width={32} height={32} />
                  <div
                    style={{
                      fontSize: "12px",
                      marginTop: "8px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {getBaseIconName(key)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Блок для копирования кода */}
      {copyCode && (
        <div
          style={{
            marginTop: "24px",
            padding: "16px",
            background: "#f4f4f4",
            borderRadius: "8px",
            border: "1px solid #ccc",
            maxWidth: "600px",
            alignSelf: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <code
            style={{
              fontSize: "15px",
              background: "#fff",
              padding: "4px 8px",
              borderRadius: "4px",
            }}
          >
            {copyCode}
          </code>
          <button
            onClick={handleCopy}
            style={{
              padding: "6px 14px",
              borderRadius: "4px",
              border: "none",
              background: copied ? "#4caf50" : "#1976d2",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 500,
              fontSize: "14px",
              transition: "background 0.2s",
            }}
          >
            {copied ? "Скопировано!" : "Скопировать"}
          </button>
        </div>
      )}
    </div>
  );
};
