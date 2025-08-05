import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import Login from '../Auth/Login'
import { UserContext } from '../../context/userContext'
import { API_PATHS } from '../../utils/apiPaths'

const mockPost = vi.fn()

vi.mock('../../utils/axiosInstance', () => ({
  default: {
    post: mockPost,
  }
}))

describe('Login page integration', () => {
  it('submits credentials and updates user', async () => {
    mockPost.mockResolvedValue({ data: { token: 'token', name: 'John' } })
    const updateUser = vi.fn()

    render(
      <BrowserRouter>
        <UserContext.Provider value={{ user: null, loading: false, updateUser, clearUser: vi.fn() }}>
          <Login setCurrentPage={() => {}} />
        </UserContext.Provider>
      </BrowserRouter>,
    )

    await userEvent.type(screen.getByPlaceholderText('john@example.com'), 'john@example.com')
    await userEvent.type(screen.getByPlaceholderText('********'), 'pass123')
    await userEvent.click(screen.getByRole('button', { name: /login/i }))

    expect(mockPost).toHaveBeenCalledWith(API_PATHS.AUTH.LOGIN, {
      email: 'john@example.com',
      password: 'pass123',
    })
    expect(updateUser).toHaveBeenCalledWith({ token: 'token', name: 'John' })
  })
})
