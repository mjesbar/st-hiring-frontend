import { describe, expect, it } from 'vitest'
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from '../../lib/pagination'
import { eventsPaginationReducer, setPage, setPageSize } from '../../states/eventsPaginationSlice'

describe('eventsPaginationSlice', () => {
  it('uses the default pagination state', () => {
    expect(eventsPaginationReducer(undefined, { type: 'init' })).toEqual({
      page: DEFAULT_PAGE,
      pageSize: DEFAULT_PAGE_SIZE,
    })
  })

  it('sets the page', () => {
    const state = eventsPaginationReducer(undefined, setPage(3))
    expect(state.page).toBe(3)
  })

  it('clamps the page size and resets to the first page', () => {
    const state = eventsPaginationReducer({ page: 4, pageSize: DEFAULT_PAGE_SIZE }, setPageSize(MAX_PAGE_SIZE + 50))
    expect(state).toEqual({ page: DEFAULT_PAGE, pageSize: MAX_PAGE_SIZE })
  })
})
