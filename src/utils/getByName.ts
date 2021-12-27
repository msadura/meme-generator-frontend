export function getByName<T extends { name: string }>(name: string, items?: T[]): T | undefined {
  return items?.find((i) => i.name === name);
}
