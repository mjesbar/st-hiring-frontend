import { describe, expect, it } from 'vitest'
import { settingsSchema } from '../../lib/settingsSchema'

describe('settingsSchema', () => {
  it('accepts valid values', async () => {
    await expect(
      settingsSchema.validate({ currency: 'USD', locale: 'en-US', timezone: 'UTC' }),
    ).resolves.toBeDefined()
  })

  it('rejects an empty currency', async () => {
    await expect(settingsSchema.validate({ currency: '', locale: 'en-US' })).rejects.toThrow('Currency is required')
  })

  it('rejects an empty locale', async () => {
    await expect(settingsSchema.validate({ currency: 'USD', locale: '  ' })).rejects.toThrow('Locale is required')
  })

  it('defaults the timezone to UTC', async () => {
    const value = await settingsSchema.validate({ currency: 'USD', locale: 'en-US' })
    expect(value.timezone).toBe('UTC')
  })
})
