/**
 * Возвращает базовое имя иконки без префикса Icon и суффиксов Filled/Outlined, разделяя слова пробелами.
 * @param {string} name - Имя компонента иконки (например, IconDownloadFilled)
 * @returns {string} Базовое имя (например, Download)
 */
export function getBaseIconName(name: string): string {
  return name
    .replace(/^Icon/, "")
    .replace(/(Filled|Outlined)$/i, "")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .trim();
}
