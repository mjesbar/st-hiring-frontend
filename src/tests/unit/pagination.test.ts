import { describe, expect, it } from 'vitest'
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, clampPage, clampPageSize, parseHeaderNumber } from '../../lib/pagination'

describe('clampPageSize', () => {
  it('returns the value when within range', () => {
    expect(clampPageSize(25)).toBe(25)
  })

  it('clamps above the maximum', () => {
    expect(clampPageSize(500)).toBe(MAX_PAGE_SIZE)
  })

  it('clamps below one', () => {
    expect(clampPageSize(0)).toBe(1)
  })

  it('falls back to the default for invalid input', () => {
    expect(clampPageSize(Number.NaN)).toBe(DEFAULT_PAGE_SIZE)
  })
})

describe('clampPage', () => {
  it('returns the value when positive', () => {
    expect(clampPage(3)).toBe(3)
  })

  it('falls back to the default for invalid input', () => {
    expect(clampPage(0)).toBe(DEFAULT_PAGE)
  })
})

describe('parseHeaderNumber', () => {
  it('parses a numeric header', () => {
    const headers = new Headers({ 'X-Total-Count': '42' })
    expect(parseHeaderNumber(headers, 'X-Total-Count', 0)).toBe(42)
  })

  it('falls back when the header is missing', () => {
    expect(parseHeaderNumber(new Headers(), 'X-Total-Count', 7)).toBe(7)
  })

  it('falls back when the header is not numeric', () => {
    const headers = new Headers({ 'X-Total-Count': 'abc' })
    expect(parseHeaderNumber(headers, 'X-Total-Count', 7)).toBe(7)
  })
})
