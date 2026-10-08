import { Alert, Box, CircularProgress, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../states/store'
import { useGetEventsQuery } from '../lib/api/events'
import { EventList } from '../components/EventList'
import { EventsPagination } from '../components/EventsPagination'
import { setPage, setPageSize } from '../states/eventsPaginationSlice'

export function EventsPage() {
  const dispatch = useAppDispatch()
  const { page, pageSize } = useAppSelector((state) => state.eventsPagination)
  const { data, isLoading, isError } = useGetEventsQuery({ page, pageSize })

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (isError) {
    return <Alert severity="error">Failed to load events. Is the backend running?</Alert>
  }

  if (!data || data.data.length === 0) {
    return (
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography color="text.secondary">No events found.</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      <Box sx={{ flex: 1, minHeight: 0, overflowY: 'auto', pr: 1 }}>
        <EventList events={data.data} />
      </Box>
      <Box sx={{ flexShrink: 0, pt: 2 }}>
        <EventsPagination
          page={data.page}
          pageSize={data.pageSize}
          totalPages={data.totalPages}
          onPageChange={(value) => dispatch(setPage(value))}
          onPageSizeChange={(value) => dispatch(setPageSize(value))}
        />
      </Box>
    </Box>
  )
}
