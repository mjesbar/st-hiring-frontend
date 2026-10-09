import { api } from './api'
import type { Event, EventsQueryArgs, PaginatedEvents } from '../types'
import { clampPage, clampPageSize, parseHeaderNumber } from '../pagination'

export const eventsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getEvents: build.query<PaginatedEvents, EventsQueryArgs>({
      query: ({ page, pageSize }) => ({
        url: 'events',
        params: { page: clampPage(page), pageSize: clampPageSize(pageSize) },
      }),
      transformResponse: (data: Event[], meta): PaginatedEvents => {
        const headers = meta?.response?.headers
        const pageSize = headers ? parseHeaderNumber(headers, 'X-Page-Size', data.length) : data.length
        return {
          data,
          total: headers ? parseHeaderNumber(headers, 'X-Total-Count', data.length) : data.length,
          page: headers ? parseHeaderNumber(headers, 'X-Page', 1) : 1,
          pageSize,
          totalPages: headers ? parseHeaderNumber(headers, 'X-Total-Pages', 1) : 1,
        }
      },
      providesTags: ['Events'],
    }),
  }),
})

export const { useGetEventsQuery } = eventsApi
