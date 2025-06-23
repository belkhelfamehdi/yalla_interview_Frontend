import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DeleteAlertContent from '../DeleteAlertContent'
import { vi } from 'vitest'

describe('DeleteAlertContent component', () => {
  it('renders provided content', () => {
    render(<DeleteAlertContent content="Are you sure?" onDelete={() => {}} />)
    expect(screen.getByText('Are you sure?')).toBeInTheDocument()
  })

  it('calls onDelete when button is clicked', async () => {
    const onDelete = vi.fn()
    render(<DeleteAlertContent content="Delete it" onDelete={onDelete} />)
    const button = screen.getByRole('button', { name: /delete/i })
    await userEvent.click(button)
    expect(onDelete).toHaveBeenCalled()
  })
})
