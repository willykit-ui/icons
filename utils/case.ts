export type FilenameCase = "pascal" | "camel" | "kebab" | "snake";

/**
 * Преобразует строку в PascalCase
 * "arrow-left" -> "ArrowLeft"
 * "user_profile" -> "UserProfile"
 * "home icon" -> "HomeIcon"
 */
export function toPascalCase(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9]+/g, " ") // Заменяем все не-алфавитно-цифровые символы на пробелы
    .split(" ")
    .filter(Boolean) // Убираем пустые элементы
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

/**
 * Преобразует строку в camelCase
 * "arrow-left" -> "arrowLeft"
 * "user_profile" -> "userProfile"
 */
export function toCamelCase(str: string): string {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

/**
 * Преобразует строку в kebab-case
 * "ArrowLeft" -> "arrow-left"
 * "userProfile" -> "user-profile"
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2") // Добавляем дефис между строчной и заглавной
    .replace(/[^a-zA-Z0-9]+/g, "-") // Заменяем все не-алфавитно-цифровые символы на дефисы
    .toLowerCase()
    .replace(/^-+|-+$/g, ""); // Убираем дефисы в начале и конце
}

/**
 * Преобразует строку в snake_case
 * "ArrowLeft" -> "arrow_left"
 * "user-profile" -> "user_profile"
 */
export function toSnakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1_$2") // Добавляем подчеркивание между строчной и заглавной
    .replace(/[^a-zA-Z0-9]+/g, "_") // Заменяем все не-алфавитно-цифровые символы на подчеркивания
    .toLowerCase()
    .replace(/^_+|_+$/g, ""); // Убираем подчеркивания в начале и конце
}

/**
 * Преобразует строку в указанный case для использования в именах компонентов
 */
export function toComponentName(str: string, caseType: FilenameCase): string {
  switch (caseType) {
    case "pascal":
      return toPascalCase(str);
    case "camel":
      return toCamelCase(str);
    case "kebab":
      return toKebabCase(str);
    case "snake":
      return toSnakeCase(str);
    default:
      return str; // При неизвестном формате возвращаем исходную строку
  }
}

/**
 * Валидирует имя компонента
 */
export function validateComponentName(name: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Проверяем, что имя не пустое
  if (!name || name.trim().length === 0) {
    errors.push("Component name cannot be empty");
  }

  // Проверяем, что имя начинается с буквы
  if (name && !/^[a-zA-Z]/.test(name)) {
    errors.push("Component name must start with a letter");
  }

  // Проверяем, что имя содержит только допустимые символы
  if (name && !/^[a-zA-Z0-9_-]+$/.test(name)) {
    errors.push(
      "Component name can only contain letters, numbers, hyphens, and underscores",
    );
  }

  // Проверяем зарезервированные слова JavaScript/React
  const reservedWords = [
    "break",
    "case",
    "catch",
    "class",
    "const",
    "continue",
    "debugger",
    "default",
    "delete",
    "do",
    "else",
    "export",
    "extends",
    "finally",
    "for",
    "function",
    "if",
    "import",
    "in",
    "instanceof",
    "new",
    "return",
    "super",
    "switch",
    "this",
    "throw",
    "try",
    "typeof",
    "var",
    "void",
    "while",
    "with",
    "yield",
    "enum",
    "implements",
    "interface",
    "let",
    "package",
    "private",
    "protected",
    "public",
    "static",
    "await",
    "async",
    "React",
    "Component",
    "Fragment",
  ];

  if (reservedWords.includes(name.toLowerCase())) {
    errors.push(
      `"${name}" is a reserved word and cannot be used as component name`,
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Создает безопасное имя компонента из строки
 */
export function createSafeComponentName(
  str: string,
  caseType: FilenameCase = "pascal",
): string {
  // Убираем все небезопасные символы и преобразуем
  const cleaned = str
    .replace(/[^a-zA-Z0-9\s-_]/g, "") // Убираем специальные символы
    .replace(/^\d+/, "") // Убираем цифры в начале
    .trim();

  if (!cleaned) {
    return "Icon"; // Fallback имя
  }

  let componentName = toComponentName(cleaned, caseType);

  // Если имя начинается с цифры, добавляем префикс
  if (/^\d/.test(componentName)) {
    componentName = `Icon${componentName}`;
  }

  // Проверяем валидность и исправляем если нужно
  const validation = validateComponentName(componentName);
  if (!validation.isValid) {
    // Если имя невалидное, используем безопасный fallback
    componentName = `Icon${toPascalCase(cleaned)}`;
  }

  return componentName;
}

/**
 * Генерирует варианты имен для компонента
 */
export function generateComponentNameVariants(
  baseName: string,
): Record<FilenameCase, string> {
  return {
    pascal: createSafeComponentName(baseName, "pascal"),
    camel: createSafeComponentName(baseName, "camel"),
    kebab: createSafeComponentName(baseName, "kebab"),
    snake: createSafeComponentName(baseName, "snake"),
  };
}

/**
 * Извлекает базовое имя из пути к файлу
 */
export function extractBaseNameFromPath(filePath: string): string {
  const fileName = filePath.split("/").pop() || "";
  const nameWithoutExt = fileName.replace(/\.[^.]+$/, "");

  // Убираем размеры и модификаторы из имени
  return nameWithoutExt
    .replace(/[-_](small|medium|large|sm|md|lg|\d+)$/i, "")
    .replace(/[-_]icon$/i, ""); // Убираем суффикс "icon" если есть
}

/**
 * Разбивает строку на слова по разделителям и границам регистра
 */
export function splitWords(str: string): string[] {
  if (!str) return [];

  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Добавляем пробел между строчной и заглавной
    .replace(/[^a-zA-Z0-9]+/g, " ") // Заменяем все не-алфавитно-цифровые символы на пробелы
    .split(" ")
    .filter(Boolean); // Убираем пустые элементы
}

/**
 * Делает первую букву заглавной, остальные строчными
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
