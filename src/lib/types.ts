export type TicketStatus = 'available' | 'sold' | 'reserved'

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
  availableTickets: number
  soldTickets: number
  reservedTickets: number
  tickets?: Ticket[]
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
