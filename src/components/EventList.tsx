import { Grid } from '@mui/material'
import type { Event } from '../lib/types'
import { EventCard } from './EventCard'

interface EventListProps {
  events: Event[]
}

export function EventList({ events }: EventListProps) {
  return (
    <Grid container spacing={2}>
      {events.map((event) => (
        <Grid key={event.id} item xs={12} sm={6} md={4}>
          <EventCard event={event} />
        </Grid>
      ))}
    </Grid>
  )
}
