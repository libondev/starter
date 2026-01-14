export function toArray(value: any) {
  if (!value) {return []}

  if (Array.isArray(value)) {return value}

  if (value instanceof Set) {return Array.from(value)}

  return [value]
}
