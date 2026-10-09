import type { ReactElement } from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { api } from '../../lib/api/api'
import { eventsPaginationReducer } from '../../states/eventsPaginationSlice'

/** Creates a fresh store for tests, optionally preloading events pagination state. */
export const createTestStore = (preloadedEvents?: { page: number; pageSize: number }) =>
  configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      eventsPagination: eventsPaginationReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
    preloadedState: preloadedEvents ? { eventsPagination: preloadedEvents } : undefined,
  })

/** Renders a component wrapped in a Redux Provider with a fresh test store. */
export const renderWithProviders = (ui: ReactElement, preloadedEvents?: { page: number; pageSize: number }) => {
  const store = createTestStore(preloadedEvents)
  return { store, ...render(<Provider store={store}>{ui}</Provider>) }
}
