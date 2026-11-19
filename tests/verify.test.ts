import { describe, expect, it } from 'vitest'
import { IsValidEmail, IsValidJSON, isValidHttpUrl, isValidPassword } from '../src/utils/verify'

describe('verify', () => {
  it('validates email', () => {
    expect(IsValidEmail('a@b.com')).toBe(true)
    expect(IsValidEmail('bad')).toBe(false)
    expect(IsValidEmail('a@b')).toBe(false)
  })

  it('validates JSON objects', () => {
    expect(IsValidJSON('{"a":1}')).toBe(true)
    expect(IsValidJSON('[1,2]')).toBe(true)
    expect(IsValidJSON('"str"')).toBe(false)
    expect(IsValidJSON('not-json')).toBe(false)
  })

  it('validates http(s) urls', () => {
    expect(isValidHttpUrl('https://example.com')).toBe(true)
    expect(isValidHttpUrl('http://localhost:3000')).toBe(true)
    expect(isValidHttpUrl('ftp://x')).toBe(false)
    expect(isValidHttpUrl('not a url')).toBe(false)
  })

  it('validates password strength', () => {
    expect(isValidPassword('Abcdef1!')).toBe(true)
    expect(isValidPassword('short1!A')).toBe(true)
    expect(isValidPassword('nouppercase1!')).toBe(false)
    expect(isValidPassword('NOLOWERCASE1!')).toBe(false)
    expect(isValidPassword('NoNumber!')).toBe(false)
    expect(isValidPassword('NoSymbol1')).toBe(false)
    expect(isValidPassword('Ab1!')).toBe(false)
  })
})
