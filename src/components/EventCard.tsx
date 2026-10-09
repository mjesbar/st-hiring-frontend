import { Card, CardContent, Chip, Stack, Typography } from '@mui/material'
import type { Event } from '../lib/types'

interface EventCardProps {
  event: Event
}

const formatDate = (value: string): string => {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString()
}

export function EventCard({ event }: EventCardProps) {
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
          {event.availableTickets > 0 ? (
            <Chip size="small" color="primary" label={`Available x${event.availableTickets}`} />
          ) : (
            <Chip size="small" label="No tickets available" />
          )}
        </Stack>
      </CardContent>
    </Card>
  )
}
