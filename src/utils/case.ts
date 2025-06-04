export function toComponentName(str: string, mode: string): string {
  const parts = str.split(/[-_ ]+/).map(capitalize);

  switch (mode) {
    case "pascal":
      return parts.join("");
    case "camel":
      return parts[0].toLowerCase() + parts.slice(1).join("");
    case "kebab":
      return str.toLowerCase().replace(/_/g, "-");
    case "snake":
      return str.toLowerCase().replace(/-/g, "_");
    default:
      return parts.join("");
  }
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
