# Journal

# Features

- Events list with pagination: `GET /events` is consumed through RTK Query (`src/lib/api/events.ts`) and rendered by `src/pages/EventsPage.tsx`. The backend returns a bare array plus pagination metadata in response headers (`X-Total-Count`, `X-Page`, `X-Page-Size`, `X-Total-Pages`); `transformResponse` merges both into a single `PaginatedEvents` object.

- Pagination controls: `src/components/EventsPagination.tsx` renders an MUI `Pagination` plus a "Per page" `Select` (10, 20, 50, 100). Page and page size live in Redux (`src/states/eventsPaginationSlice.ts`) and are clamped client-side (`src/lib/pagination.ts`) so the backend never receives `pageSize > 100`.

- Event cards: `src/components/EventCard.tsx` shows name, date, location and description, and renders a single `Available xN` chip from the event's `availableTickets` count. Events with no available tickets show a `No tickets available` fallback. `src/components/EventList.tsx` lays the cards out in a responsive MUI `Grid` (1/2/3 columns).

- Scrollable list with pinned pagination: `EventsPage` is a flex column where the list scrolls (`overflowY: auto`) and the pagination bar stays visible (`flexShrink: 0`). The app shell (`src/App.tsx`) uses `height: 100vh` so the scroll region is bounded.

- Settings form: `src/pages/SettingsPage.tsx` reads `GET /settings` and updates via `POST /settings` (`src/lib/api/settings.ts`). The form (`src/components/SettingsForm.tsx`) uses Formik with a Yup schema (`src/lib/settingsSchema.ts`): `currency` and `locale` required, `timezone` optional (defaults to `UTC`). When no settings exist the backend returns `500`, which is treated as "not configured" and the form falls back to `USD / en-US / UTC`. Success and error feedback is shown with MUI `Alert`.

- App shell: `src/App.tsx` provides an `AppBar` with MUI `Tabs` to switch between Events and Settings. No router dependency is used.

- State management: Redux Toolkit store (`src/states/store.ts`) with two reducers — the RTK Query cache (`api.reducer`) for server state and `eventsPagination` for client-only pagination state. Typed `useAppDispatch` / `useAppSelector` hooks are exported from the same file.

- Theming and providers: `src/main.tsx` wraps the app in `Provider` (Redux) and `ThemeProvider` + `CssBaseline` (MUI). `src/theme.ts` defines a light theme with the brand primary color.

- Testing: Vitest + React Testing Library + `@testing-library/jest-dom` + `user-event`, configured in `vitest.config.ts` (merged with `vite.config.ts`) using the `happy-dom` environment. Tests live in `src/tests` (`unit/`, `integration/`, `utils/`), with a `renderWithProviders` helper that builds a fresh store per test.

# Bugs

- `@testing-library/dom` was not installed automatically (Yarn 3 does not install peer deps), so `jest-dom` failed to import. Added it as a dev dependency.

# Performance

- Server state is cached by RTK Query per `(page, pageSize)` argument, so revisiting a page within `keepUnusedDataFor` (default 60s) renders from cache without a new request.

- The events list no longer requests the ticket array: the backend returns the three status counts by default, so the card renders from scalars instead of grouping a ticket list client-side.

- `pageSize` is clamped to `MAX_PAGE_SIZE` (100) before the request, avoiding a guaranteed `500` from the backend.

# Code quality

- Feature-based structure: `pages/` (route-level views), `components/` (presentational), `states/` (Redux), `lib/` (framework-agnostic logic and API), `tests/` (unit + integration).

- The pagination slice was renamed from `eventsSlice` to `eventsPaginationSlice` to make its narrow purpose explicit — it owns only client pagination state, not events data.

- Removed the placeholder `App.tsx` inline styles and the conflicting global CSS (`color-scheme`, `body` flex centering) that fought MUI; `src/index.css` is now a minimal reset.

- Strict TypeScript (`strict`, `noUnusedLocals`, `noUnusedParameters`) and ESLint with `--max-warnings 0`; `yarn lint`, `yarn build` and `yarn test` all pass.
