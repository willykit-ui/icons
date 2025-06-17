/**
 * Форматы преобразования имён компонентов.
 */
export type CaseFormat = "pascal" | "camel" | "kebab" | "snake";

/**
 * Разбивает строку на слова по разделителям и границам регистра.
 * @param {string} str - Исходная строка
 * @returns {string[]} Массив слов
 */
function splitWords(str: string): string[] {
  // Разбиваем по - _ пробелам и по границе между строчными и заглавными
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_\-\s]+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean);
}

/**
 * Делает первую букву заглавной, остальные строчными.
 * @param {string} s - Слово
 * @returns {string} Слово с заглавной буквой
 */
function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

/**
 * Преобразует имя компонента в указанный формат (PascalCase, camelCase, kebab-case, snake_case).
 * @param {string} name - Имя компонента
 * @param {CaseFormat} format - Формат преобразования
 * @returns {string} Преобразованное имя
 */
export function toComponentName(name: string, format: CaseFormat): string {
  const words = splitWords(name);
  switch (format) {
    case "pascal":
      return words.map(capitalize).join("");
    case "camel":
      return words
        .map((w, i) => (i === 0 ? w.toLowerCase() : capitalize(w)))
        .join("");
    case "kebab":
      return words.map((w) => w.toLowerCase()).join("-");
    case "snake":
      return words.map((w) => w.toLowerCase()).join("_");
    default:
      return name;
  }
}
