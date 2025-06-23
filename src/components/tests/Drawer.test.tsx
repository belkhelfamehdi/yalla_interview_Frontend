import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Drawer from '../Drawer'
import { vi } from 'vitest'

describe('Drawer component', () => {
  it('applies translate-x-0 class when open', () => {
    const { container } = render(
      <Drawer isOpen={true} onClose={() => {}} title="Title">
        <div>Content</div>
      </Drawer>,
    )
    const drawer = container.firstChild as HTMLElement
    expect(drawer.className).toContain('translate-x-0')
  })

  it('applies translate-x-full class when closed', () => {
    const { container } = render(
      <Drawer isOpen={false} onClose={() => {}} title="Title">
        <div>Content</div>
      </Drawer>,
    )
    const drawer = container.firstChild as HTMLElement
    expect(drawer.className).toContain('translate-x-full')
  })

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn()
    render(
      <Drawer isOpen={true} onClose={onClose} title="Title">
        <div>Content</div>
      </Drawer>,
    )
    const button = screen.getByRole('button')
    await userEvent.click(button)
    expect(onClose).toHaveBeenCalled()
  })
})
