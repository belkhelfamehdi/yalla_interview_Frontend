import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import Modal from '../Modal'

describe('Modal component', () => {
  it('does not render when closed', () => {
    const { container } = render(
      <Modal isOpen={false} onClose={() => {}}>
        <div>Content</div>
      </Modal>,
    )
    expect(container.firstChild).toBeNull()
  })

  it('renders children and handles close', async () => {
    const onClose = vi.fn()
    render(
      <Modal isOpen={true} onClose={onClose} title="Test">
        <div>Content</div>
      </Modal>,
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
    const button = screen.getByRole('button')
    await userEvent.click(button)
    expect(onClose).toHaveBeenCalled()
  })
})