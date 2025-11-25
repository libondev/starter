export function parseJson<T>(
  json: string | undefined | null,
  defaultValueOrParser?: T,
): T | undefined {
  try {
    if (json == null || json === 'null')
      throw new Error('json is empty')

    return JSON.parse(json) as T
  } catch {
    return typeof defaultValueOrParser === 'function'
      ? defaultValueOrParser(json)
      : defaultValueOrParser
  }
}
