import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProfilePhotoSelector from '../ProfilePhotoSelector'
import { vi } from 'vitest'

// jsdom doesn't implement createObjectURL
(global as any).URL.createObjectURL = vi.fn(() => 'blob:url')

describe('ProfilePhotoSelector', () => {
  it('opens file dialog when upload button clicked', async () => {
    const setImage = vi.fn()
    const { container } = render(<ProfilePhotoSelector image={null} setImage={setImage} />)
    const input = container.querySelector('input[type="file"]') as HTMLInputElement
    const clickSpy = vi.spyOn(input, 'click')
    await userEvent.click(screen.getByRole('button'))
    expect(clickSpy).toHaveBeenCalled()
  })

  it('handles image upload and removal', async () => {
    const setImage = vi.fn()
    const file = new File(['1'], 'a.png', { type: 'image/png' })
    const { container, rerender } = render(
      <ProfilePhotoSelector image={null} setImage={setImage} />,
    )
    const input = container.querySelector('input[type="file"]') as HTMLInputElement
    await userEvent.upload(input, file)
    expect(setImage).toHaveBeenCalledWith(file)

    rerender(<ProfilePhotoSelector image={file} setImage={setImage} preview="blob:url" />)
    await userEvent.click(screen.getByRole('button'))
    expect(setImage).toHaveBeenCalledWith(null)
  })
})
