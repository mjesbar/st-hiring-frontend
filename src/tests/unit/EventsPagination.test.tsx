import { describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../utils/renderWithProviders'
import { EventsPagination } from '../../components/EventsPagination'

describe('EventsPagination', () => {
  it('calls onPageChange when a page is selected', async () => {
    const onPageChange = vi.fn()
    renderWithProviders(
      <EventsPagination page={1} pageSize={20} totalPages={3} onPageChange={onPageChange} onPageSizeChange={vi.fn()} />,
    )
    await userEvent.click(screen.getByRole('button', { name: /go to page 2/i }))
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('calls onPageSizeChange when the page size changes', async () => {
    const onPageSizeChange = vi.fn()
    renderWithProviders(
      <EventsPagination page={1} pageSize={20} totalPages={3} onPageChange={vi.fn()} onPageSizeChange={onPageSizeChange} />,
    )
    await userEvent.click(screen.getByRole('combobox', { name: /per page/i }))
    await userEvent.click(screen.getByRole('option', { name: '50' }))
    expect(onPageSizeChange).toHaveBeenCalledWith(50)
  })
})
