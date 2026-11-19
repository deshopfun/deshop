export type ProductImportPayload = Record<string, unknown> & {
  title?: string
  Title?: string
  options?: Array<{ name?: string; value?: string }>
}

export function parseKeyValueText(text: string): Record<string, string> {
  const result: Record<string, string> = {}
  const lines = text.split(/\r?\n/)
  let currentKey = ''
  let currentValue: string[] = []

  const flush = () => {
    if (currentKey) {
      result[currentKey] = currentValue.join('\n').trim()
    }
    currentKey = ''
    currentValue = []
  }

  for (const line of lines) {
    const match = line.match(/^([A-Za-z0-9_]+)\s*[:：]\s*(.*)$/)
    if (match) {
      flush()
      currentKey = match[1]
      currentValue = [match[2]]
    } else if (currentKey) {
      currentValue.push(line)
    }
  }
  flush()
  return result
}

export function parseProductImport(raw: string): ProductImportPayload {
  try {
    return JSON.parse(raw) as ProductImportPayload
  } catch {
    return parseKeyValueText(raw) as ProductImportPayload
  }
}

export function pickImportField(data: ProductImportPayload, ...keys: string[]): string {
  for (const key of keys) {
    const value = data[key]
    if (value !== undefined && value !== null && value !== '') {
      return String(value).trim()
    }
  }
  return ''
}
