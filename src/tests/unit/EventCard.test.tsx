import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../utils/renderWithProviders'
import { EventCard } from '../../components/EventCard'
import type { Event, Ticket } from '../../lib/types'

const ticket = (id: number, type: string): Ticket => ({
  id,
  eventId: 1,
  type,
  status: 'available',
  price: 50,
  createdAt: '',
  updatedAt: '',
})

const event: Event = {
  id: 1,
  name: 'Rock Night',
  date: '2026-05-01T20:00:00.000Z',
  location: 'Madrid',
  description: 'A great show',
  availableTickets: [ticket(10, 'VIP')],
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

  it('renders one chip per distinct ticket type with its count', () => {
    const tickets = [ticket(1, 'General'), ticket(2, 'General'), ticket(3, 'General'), ticket(4, 'VIP')]
    renderWithProviders(<EventCard event={{ ...event, availableTickets: tickets }} />)
    expect(screen.getByText('General x3')).toBeInTheDocument()
    expect(screen.getByText('VIP x1')).toBeInTheDocument()
    expect(screen.queryByText('General x1')).not.toBeInTheDocument()
  })

  it('shows a fallback when there are no tickets', () => {
    renderWithProviders(<EventCard event={{ ...event, availableTickets: [] }} />)
    expect(screen.getByText('No tickets available')).toBeInTheDocument()
  })
})
