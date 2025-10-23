/**
 * Преобразует строку размера иконки в число, если это возможно, иначе возвращает исходное значение.
 * @param {string | number} size - Размер иконки (строка или число)
 * @returns {string | number} Числовое значение или исходная строка
 */
export function parseIconSize(size: string | number): string | number {
  if (typeof size === "number") {
    return size;
  }

  if (!size) {
    return "";
  }

  const parsed = parseInt(size, 10);
  return isNaN(parsed) ? size : parsed;
}
