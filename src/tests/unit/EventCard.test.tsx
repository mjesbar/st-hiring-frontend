import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../utils/renderWithProviders'
import { EventCard } from '../../components/EventCard'
import type { Event } from '../../lib/types'

const event: Event = {
  id: 1,
  name: 'Rock Night',
  date: '2026-05-01T20:00:00.000Z',
  location: 'Madrid',
  description: 'A great show',
  availableTickets: 3,
  soldTickets: 1,
  reservedTickets: 0,
  createdAt: '',
  updatedAt: '',
}

describe('EventCard', () => {
  it('renders the event details', () => {
    renderWithProviders(<EventCard event={event} />)
    expect(screen.getByText('Rock Night')).toBeInTheDocument()
    expect(screen.getByText(/Madrid/)).toBeInTheDocument()
    expect(screen.getByText('A great show')).toBeInTheDocument()
  })

  it('renders only the available chip', () => {
    renderWithProviders(<EventCard event={event} />)
    expect(screen.getByText('Available x3')).toBeInTheDocument()
    expect(screen.queryByText(/Sold/)).not.toBeInTheDocument()
    expect(screen.queryByText(/Reserved/)).not.toBeInTheDocument()
  })

  it('shows a fallback when there are no available tickets', () => {
    renderWithProviders(<EventCard event={{ ...event, availableTickets: 0 }} />)
    expect(screen.getByText('No tickets available')).toBeInTheDocument()
  })
})
