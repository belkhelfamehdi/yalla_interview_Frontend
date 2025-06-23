import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SummaryCard from '../SummaryCard'
import { vi } from 'vitest'

const baseProps = {
  colors: { bgcolor: 'red' },
  role: 'Frontend Dev',
  topicToFocus: 'React',
  experience: 2,
  questions: 5,
  description: 'desc',
  lastUpdated: 'today',
}

describe('SummaryCard', () => {
  it('calls onSelect when card clicked', async () => {
    const onSelect = vi.fn()
    render(<SummaryCard {...baseProps} onSelect={onSelect} onDelete={vi.fn()} />)
    await userEvent.click(screen.getByText('Frontend Dev'))
    expect(onSelect).toHaveBeenCalled()
  })

  it('calls onDelete without triggering onSelect', async () => {
    const onDelete = vi.fn()
    const onSelect = vi.fn()
    render(<SummaryCard {...baseProps} onSelect={onSelect} onDelete={onDelete} />)
    await userEvent.click(screen.getByRole('button'))
    expect(onDelete).toHaveBeenCalled()
    expect(onSelect).not.toHaveBeenCalled()
  })

  it('displays initials from role', () => {
    render(<SummaryCard {...baseProps} onSelect={vi.fn()} onDelete={vi.fn()} />)
    expect(screen.getByText('FD')).toBeInTheDocument()
  })
})
