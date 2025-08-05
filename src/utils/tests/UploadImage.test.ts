import uploadImage from '../UploadImage'
import { API_PATHS } from '../apiPaths'
import { vi } from 'vitest'

const mockPost = vi.fn()

vi.mock('../axiosInstance', () => ({
  default: {
    post: mockPost,
  }
}))

describe('uploadImage', () => {
  it('posts form data to upload endpoint', async () => {
    mockPost.mockResolvedValue({ data: 'ok' })
    const file = new File(['1'], 'a.png', { type: 'image/png' })
    const data = await uploadImage(file)
    expect(mockPost).toHaveBeenCalled()
    const call = mockPost.mock.calls[0]
    expect(call[0]).toBe(API_PATHS.IMAGE.UPLOAD_IMAGE)
    expect(call[1] instanceof FormData).toBe(true)
    expect(data).toBe('ok')
  })
})
