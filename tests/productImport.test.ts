import { describe, expect, it } from 'vitest'
import { parseKeyValueText, parseProductImport, pickImportField } from '../src/utils/productImport'

describe('productImport', () => {
  it('parses key-value text', () => {
    const data = parseKeyValueText('title: Widget\nslug: widget\n')
    expect(data.title).toBe('Widget')
    expect(data.slug).toBe('widget')
  })

  it('parses JSON import payload', () => {
    const data = parseProductImport(JSON.stringify({ title: 'A', options: [{ name: 'Size', value: 'M' }] }))
    expect(data.title).toBe('A')
    expect(data.options?.[0]?.name).toBe('Size')
  })

  it('picks first present field', () => {
    expect(pickImportField({ Title: 'X' }, 'title', 'Title')).toBe('X')
  })
})
