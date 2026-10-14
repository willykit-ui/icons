import React, { useState, useMemo, useRef, useEffect } from "react";
import { iconsList, IconInfo } from "./icon";

type FilterMode = "all" | "active" | "deprecated";

export const IconsGallery: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterMode>("all");
  const [selectedSize, setSelectedSize] = useState<
    "small" | "medium" | "large"
  >("medium");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [copiedName, setCopiedName] = useState<string | null>(null);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) {
        clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    iconsList.forEach((i) => {
      if (i.category) set.add(i.category);
    });
    return ["all", ...Array.from(set).sort()];
  }, []);

  const filteredIcons = useMemo(() => {
    const q = search.trim().toLowerCase();
    return iconsList.filter((item) => {
      // Фильтр по статусу
      if (filter === "active" && item.deprecated) return false;
      if (filter === "deprecated" && !item.deprecated) return false;

      // Фильтр по категории
      if (selectedCategory !== "all" && item.category !== selectedCategory)
        return false;

      // Поиск по имени, компоненту, тегам и категории
      if (!q) return true;
      const matchName = item.name.toLowerCase().includes(q);
      const matchComp = item.componentName.toLowerCase().includes(q);
      const matchCat = item.category.toLowerCase().includes(q);
      const matchTags = item.tags.some((t) => t.toLowerCase().includes(q));

      return matchName || matchComp || matchCat || matchTags;
    });
  }, [search, filter, selectedCategory]);

  const activeCount = useMemo(
    () => iconsList.filter((i) => !i.deprecated).length,
    [],
  );
  const deprecatedCount = useMemo(
    () => iconsList.filter((i) => i.deprecated).length,
    [],
  );

  const handleCopy = (componentName: string) => {
    const jsxCode = `<${componentName} />`;
    navigator.clipboard?.writeText(jsxCode);
    setCopiedName(jsxCode);
    if (copyTimerRef.current) {
      clearTimeout(copyTimerRef.current);
    }
    copyTimerRef.current = setTimeout(() => {
      setCopiedName(null);
    }, 2500);
  };

  return (
    <div
      style={{
        fontFamily: "system-ui, -apple-system, sans-serif",
        color: "#1A3747",
      }}
    >
      {/* Панель управления и поиска */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px",
          background: "#f8fafc",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          marginBottom: "24px",
        }}
      >
        {/* Поле поиска */}
        <div
          style={{ position: "relative", flex: "1 1 280px", minWidth: "240px" }}
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Поиск по названию иконки..."
            style={{
              width: "100%",
              padding: "10px 14px",
              fontSize: "14px",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#94a3b8",
                fontSize: "16px",
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Фильтры по статусу */}
        <div style={{ display: "flex", gap: "6px" }}>
          <button
            onClick={() => setFilter("all")}
            style={{
              padding: "8px 12px",
              fontSize: "13px",
              fontWeight: 500,
              borderRadius: "6px",
              border: "1px solid #cbd5e1",
              background: filter === "all" ? "#1A3747" : "#fff",
              color: filter === "all" ? "#fff" : "#475569",
              cursor: "pointer",
            }}
          >
            Все ({iconsList.length})
          </button>
          <button
            onClick={() => setFilter("active")}
            style={{
              padding: "8px 12px",
              fontSize: "13px",
              fontWeight: 500,
              borderRadius: "6px",
              border: "1px solid #cbd5e1",
              background: filter === "active" ? "#10b981" : "#fff",
              color: filter === "active" ? "#fff" : "#475569",
              cursor: "pointer",
            }}
          >
            Актуальные ({activeCount})
          </button>
          <button
            onClick={() => setFilter("deprecated")}
            style={{
              padding: "8px 12px",
              fontSize: "13px",
              fontWeight: 500,
              borderRadius: "6px",
              border: "1px solid #cbd5e1",
              background: filter === "deprecated" ? "#ef4444" : "#fff",
              color: filter === "deprecated" ? "#fff" : "#475569",
              cursor: "pointer",
            }}
          >
            Устаревшие ({deprecatedCount})
          </button>
        </div>

        {/* Выбор категории */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "13px",
            color: "#64748b",
          }}
        >
          <span>Категория:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: "6px 10px",
              fontSize: "13px",
              borderRadius: "6px",
              border: "1px solid #cbd5e1",
              background: "#fff",
              color: "#334155",
              cursor: "pointer",
              outline: "none",
            }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "Все категории" : cat}
              </option>
            ))}
          </select>
        </div>

        {/* Выбор размера для предпросмотра */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "13px",
            color: "#64748b",
          }}
        >
          <span>Размер:</span>
          {(["small", "medium", "large"] as const).map((sz) => (
            <button
              key={sz}
              onClick={() => setSelectedSize(sz)}
              style={{
                padding: "6px 10px",
                fontSize: "12px",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
                background: selectedSize === sz ? "#3b82f6" : "#fff",
                color: selectedSize === sz ? "#fff" : "#475569",
                cursor: "pointer",
              }}
            >
              {sz === "small" ? "12px" : sz === "medium" ? "16px" : "20px"}
            </button>
          ))}
        </div>
      </div>

      {/* Статистика поиска */}
      <div style={{ marginBottom: "16px", fontSize: "14px", color: "#64748b" }}>
        Найдено: <strong>{filteredIcons.length}</strong> иконок
      </div>

      {/* Сетка иконок */}
      {filteredIcons.length === 0 ? (
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            background: "#f8fafc",
            borderRadius: "12px",
            color: "#94a3b8",
          }}
        >
          По запросу «{search}» ничего не найдено
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
            gap: "16px",
          }}
        >
          {filteredIcons.map((item: IconInfo) => {
            const IconComp = item.component;
            return (
              <div
                key={item.name}
                onClick={() => handleCopy(item.componentName)}
                title={
                  item.deprecated
                    ? `⚠️ [DEPRECATED] Иконка устарела.\nТеги: ${item.tags.join(", ")}\nКатегория: ${item.category}\nКликните для копирования <${item.componentName} />`
                    : `Теги: ${item.tags.join(", ")}\nКатегория: ${item.category}\nКликните для копирования <${item.componentName} />`
                }
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "16px 8px 12px",
                  borderRadius: "10px",
                  border: item.deprecated
                    ? "1px dashed #f87171"
                    : "1px solid #e2e8f0",
                  background: item.deprecated ? "#fff1f2" : "#ffffff",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  opacity: item.deprecated ? 0.75 : 1,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0,0,0,0.06)";
                  if (item.deprecated) e.currentTarget.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  if (item.deprecated) e.currentTarget.style.opacity = "0.75";
                }}
              >
                {/* Бейдж Deprecated */}
                {item.deprecated && (
                  <span
                    style={{
                      position: "absolute",
                      top: "6px",
                      right: "6px",
                      fontSize: "9px",
                      fontWeight: 700,
                      padding: "2px 5px",
                      background: "#ef4444",
                      color: "#ffffff",
                      borderRadius: "4px",
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                    }}
                  >
                    deprecated
                  </span>
                )}

                {/* Сама иконка */}
                <div
                  style={{
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "8px",
                    color: item.deprecated ? "#991b1b" : "#1A3747",
                  }}
                >
                  <IconComp fontSize={selectedSize} />
                </div>

                {/* Название */}
                <span
                  style={{
                    fontSize: "11px",
                    textAlign: "center",
                    wordBreak: "break-word",
                    color: item.deprecated ? "#b91c1c" : "#334155",
                    textDecoration: item.deprecated ? "line-through" : "none",
                    lineHeight: "1.25",
                  }}
                >
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Плавающий Toast с уведомлением о копировании */}
      {copiedName && (
        <div
          style={{
            position: "fixed",
            bottom: "28px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 20px",
            background: "#1A3747",
            color: "#ffffff",
            borderRadius: "10px",
            boxShadow:
              "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)",
            fontSize: "14px",
            fontWeight: 500,
            animation: "fadeInUp 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              background: "#10b981",
              color: "#ffffff",
              fontSize: "12px",
              fontWeight: 700,
            }}
          >
            ✓
          </span>
          <span>
            Скопировано:{" "}
            <code
              style={{
                color: "#93c5fd",
                background: "rgba(255,255,255,0.1)",
                padding: "2px 6px",
                borderRadius: "4px",
              }}
            >
              {copiedName}
            </code>
          </span>
        </div>
      )}
    </div>
  );
};
