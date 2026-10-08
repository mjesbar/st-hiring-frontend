import { afterEach, describe, expect, it, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '../utils/renderWithProviders'
import { EventsPage } from '../../pages/EventsPage'

const eventsResponse = [
  {
    id: 1,
    name: 'Rock Night',
    date: '2026-05-01T20:00:00.000Z',
    location: 'Madrid',
    description: 'A great show',
    availableTickets: [],
    createdAt: '',
    updatedAt: '',
  },
]

const mockFetch = (body: unknown, headers: Record<string, string> = {}) =>
  vi.fn().mockResolvedValue(
    new Response(JSON.stringify(body), { status: 200, headers: { 'Content-Type': 'application/json', ...headers } }),
  )

describe('EventsPage', () => {
  afterEach(() => vi.restoreAllMocks())

  it('renders events returned by the API', async () => {
    vi.stubGlobal('fetch', mockFetch(eventsResponse, { 'X-Total-Count': '1', 'X-Total-Pages': '1' }))
    renderWithProviders(<EventsPage />)
    expect(await screen.findByText('Rock Night')).toBeInTheDocument()
  })

  it('shows an empty state when there are no events', async () => {
    vi.stubGlobal('fetch', mockFetch([], { 'X-Total-Count': '0', 'X-Total-Pages': '0' }))
    renderWithProviders(<EventsPage />)
    expect(await screen.findByText('No events found.')).toBeInTheDocument()
  })

  it('shows an error state when the request fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{}', { status: 500 })))
    renderWithProviders(<EventsPage />)
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent(/failed to load events/i))
  })
})
