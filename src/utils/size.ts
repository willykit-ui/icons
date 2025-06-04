export function parseIconSize(arg: string) {
  const num = Number(arg);
  return Number.isNaN(num) ? arg : num;
}
