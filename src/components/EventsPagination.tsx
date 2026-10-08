import { FormControl, InputLabel, MenuItem, Pagination, Select, Stack } from '@mui/material'
import { MAX_PAGE_SIZE, DEFAULT_PAGE_SIZE } from '../lib/pagination'

const PAGE_SIZE_OPTIONS = [10, DEFAULT_PAGE_SIZE, 50, MAX_PAGE_SIZE]

interface EventsPaginationProps {
  page: number
  pageSize: number
  totalPages: number
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
}

export function EventsPagination({
  page,
  pageSize,
  totalPages,
  onPageChange,
  onPageSizeChange,
}: EventsPaginationProps) {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      alignItems="center"
      justifyContent="space-between"
    >
      <Pagination
        color="primary"
        count={Math.max(totalPages, 1)}
        page={page}
        onChange={(_event, value) => onPageChange(value)}
      />
      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel id="page-size-label">Per page</InputLabel>
        <Select
          labelId="page-size-label"
          label="Per page"
          value={pageSize}
          onChange={(event) => onPageSizeChange(Number(event.target.value))}
        >
          {PAGE_SIZE_OPTIONS.map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  )
}
