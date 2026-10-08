import { Card, CardContent, Chip, Stack, Typography } from '@mui/material'
import type { Event, Ticket } from '../lib/types'

interface EventCardProps {
  event: Event
}

const formatDate = (value: string): string => {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString()
}

/** Counts available tickets per type, preserving first-seen order. */
const countTicketsByType = (tickets: Ticket[]): Array<{ type: string; count: number }> => {
  const counts = new Map<string, number>()
  for (const ticket of tickets) {
    counts.set(ticket.type, (counts.get(ticket.type) ?? 0) + 1)
  }
  return Array.from(counts, ([type, count]) => ({ type, count }))
}

export function EventCard({ event }: EventCardProps) {
  const ticketCounts = countTicketsByType(event.availableTickets)

  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Typography variant="h6" component="h2" gutterBottom>
          {event.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {formatDate(event.date)} · {event.location}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {event.description}
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 'auto', justifyContent: 'flex-end' }}>
          {ticketCounts.length === 0 ? (
            <Chip size="small" label="No tickets available" />
          ) : (
            ticketCounts.map(({ type, count }) => (
              <Chip key={type} size="small" color="primary" label={`${type} x${count}`} />
            ))
          )}
        </Stack>
      </CardContent>
    </Card>
  )
}
