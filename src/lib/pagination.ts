export const DEFAULT_PAGE = 1
export const DEFAULT_PAGE_SIZE = 20
export const MAX_PAGE_SIZE = 100

/** Clamps a page size to the backend-supported range. */
export const clampPageSize = (pageSize: number): number => {
  const value = Number.isFinite(pageSize) ? Math.trunc(pageSize) : DEFAULT_PAGE_SIZE
  return Math.min(Math.max(value, 1), MAX_PAGE_SIZE)
}

/** Clamps a page number to a positive integer. */
export const clampPage = (page: number): number => {
  const value = Number.isFinite(page) ? Math.trunc(page) : DEFAULT_PAGE
  return Math.max(value, 1)
}

/** Reads a numeric pagination header, falling back when absent or invalid. */
export const parseHeaderNumber = (headers: Headers, name: string, fallback: number): number => {
  const raw = headers.get(name)
  if (raw === null) return fallback
  const value = Number(raw)
  return Number.isFinite(value) && value >= 0 ? value : fallback
}
