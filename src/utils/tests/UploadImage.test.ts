import uploadImage from '../UploadImage'
import { API_PATHS } from '../apiPaths'
import axiosInstance from '../axiosInstance'
import { vi } from 'vitest'

vi.mock('../axiosInstance')

const mockedAxios = vi.mocked(axiosInstance)

describe('uploadImage', () => {
  it('posts form data to upload endpoint', async () => {
    mockedAxios.post.mockResolvedValue({ data: 'ok' })
    const file = new File(['1'], 'a.png', { type: 'image/png' })
    const data = await uploadImage(file)
    expect(mockedAxios.post).toHaveBeenCalled()
    const call = mockedAxios.post.mock.calls[0]
    expect(call[0]).toBe(API_PATHS.IMAGE.UPLOAD_IMAGE)
    expect(call[1] instanceof FormData).toBe(true)
    expect(data).toBe('ok')
  })
})
