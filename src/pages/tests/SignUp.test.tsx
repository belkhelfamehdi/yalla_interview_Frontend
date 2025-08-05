import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'

import SignUp from '../Auth/SignUp'
import { UserContext } from '../../context/userContext'
import { API_PATHS } from '../../utils/apiPaths'
import uploadImage from '../../utils/UploadImage'

const mockPost = vi.fn()

vi.mock('../../utils/axiosInstance', () => ({
  default: {
    post: mockPost,
  }
}))

vi.mock('../../utils/UploadImage')
vi.mock('../../components/Inputs/ProfilePhotoSelector', () => ({
  default: ({ setImage }: { setImage: (file: File | null) => void }) => (
    <input type="file" data-testid="photo-input" onChange={e => setImage(e.target.files?.[0] ?? null)} />
  ),
}))

const mockedUpload = vi.mocked(uploadImage)

describe('SignUp page integration', () => {
  it('submits form data and updates user', async () => {
    mockPost.mockResolvedValue({ data: { token: 't', name: 'Jane' } })
    const updateUser = vi.fn()

    render(
      <BrowserRouter>
        <UserContext.Provider value={{ user: null, loading: false, updateUser, clearUser: vi.fn() }}>
          <SignUp setCurrentPage={() => {}} />
        </UserContext.Provider>
      </BrowserRouter>,
    )

    await userEvent.type(screen.getByPlaceholderText('John Doe'), 'Jane Doe')
    await userEvent.type(screen.getByPlaceholderText('john@example.com'), 'jane@example.com')
    await userEvent.type(screen.getByPlaceholderText('********'), 'pass')
    await userEvent.click(screen.getByRole('button', { name: /sign up/i }))

    expect(mockPost).toHaveBeenCalledWith(API_PATHS.AUTH.REGISTER, {
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'pass',
      profileImageUrl: '',
    })
    expect(updateUser).toHaveBeenCalledWith({ token: 't', name: 'Jane' })
  })

  it('uploads image when selected', async () => {
    mockedUpload.mockResolvedValue({ imageUrl: 'img.png' })
    mockPost.mockResolvedValue({ data: { token: 'z', name: 'Jane' } })
    const updateUser = vi.fn()

    render(
      <BrowserRouter>
        <UserContext.Provider value={{ user: null, loading: false, updateUser, clearUser: vi.fn() }}>
          <SignUp setCurrentPage={() => {}} />
        </UserContext.Provider>
      </BrowserRouter>,
    )

    const file = new File(['1'], 'a.png', { type: 'image/png' })
    await userEvent.upload(screen.getByTestId('photo-input'), file)
    await userEvent.type(screen.getByPlaceholderText('John Doe'), 'Jane Doe')
    await userEvent.type(screen.getByPlaceholderText('john@example.com'), 'jane@example.com')
    await userEvent.type(screen.getByPlaceholderText('********'), 'pass')
    await userEvent.click(screen.getByRole('button', { name: /sign up/i }))

    expect(mockedUpload).toHaveBeenCalledWith(file)
    expect(mockPost).toHaveBeenCalledWith(API_PATHS.AUTH.REGISTER, expect.objectContaining({
      profileImageUrl: 'img.png',
    }))
  })
})
