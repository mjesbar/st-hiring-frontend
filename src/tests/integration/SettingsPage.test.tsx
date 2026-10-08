import { afterEach, describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../utils/renderWithProviders'
import { SettingsPage } from '../../pages/SettingsPage'

const settings = { currency: 'EUR', locale: 'es-ES', timezone: 'Europe/Madrid', updatedAt: '' }

describe('SettingsPage', () => {
  afterEach(() => vi.restoreAllMocks())

  it('loads existing settings into the form', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(JSON.stringify(settings), { status: 200 })),
    )
    renderWithProviders(<SettingsPage />)
    expect(await screen.findByDisplayValue('EUR')).toBeInTheDocument()
    expect(screen.getByDisplayValue('es-ES')).toBeInTheDocument()
  })

  it('falls back to defaults when settings are missing', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{}', { status: 500 })))
    renderWithProviders(<SettingsPage />)
    expect(await screen.findByDisplayValue('USD')).toBeInTheDocument()
    expect(screen.getByText(/showing defaults/i)).toBeInTheDocument()
  })

  it('submits updated settings', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(JSON.stringify(settings), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify(settings), { status: 200 }))
    vi.stubGlobal('fetch', fetchMock)
    renderWithProviders(<SettingsPage />)

    const currency = await screen.findByDisplayValue('EUR')
    await userEvent.clear(currency)
    await userEvent.type(currency, 'GBP')
    await userEvent.click(screen.getByRole('button', { name: /save/i }))

    expect(await screen.findByText('Settings saved.')).toBeInTheDocument()
  })
})
