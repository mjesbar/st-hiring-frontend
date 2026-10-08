export type TicketStatus = 'available' | 'unavailable'

export interface Ticket {
  id: number
  eventId: number
  type: string
  status: TicketStatus
  price: number
  createdAt: string
  updatedAt: string
}

export interface Event {
  id: number
  name: string
  date: string
  location: string
  description: string
  availableTickets: Ticket[]
  createdAt: string
  updatedAt: string
}

export interface Settings {
  currency: string
  locale: string
  timezone: string
  updatedAt: string
}

export interface EventsQueryArgs {
  page: number
  pageSize: number
}

export interface PaginatedEvents {
  data: Event[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
