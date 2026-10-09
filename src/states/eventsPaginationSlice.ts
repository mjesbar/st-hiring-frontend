import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, clampPage, clampPageSize } from '../lib/pagination'

export interface EventsPaginationState {
  page: number
  pageSize: number
}

const initialState: EventsPaginationState = {
  page: DEFAULT_PAGE,
  pageSize: DEFAULT_PAGE_SIZE,
}

const eventsPaginationSlice = createSlice({
  name: 'eventsPagination',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = clampPage(action.payload)
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = clampPageSize(action.payload)
      state.page = DEFAULT_PAGE
    },
  },
})

export const { setPage, setPageSize } = eventsPaginationSlice.actions
export const eventsPaginationReducer = eventsPaginationSlice.reducer
