import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import ProfileInfoCard from '../ProfileInfoCard'
import { UserContext } from '../../../context/userContext'
import { useNavigate } from 'react-router-dom'

// Define types
interface User {
  name?: string;
  profileImageUrl?: string;
  token: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  updateUser: (userData: User) => void;
  clearUser: () => void;
}

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: vi.fn(),
  }
})

const navigateMock = vi.fn()
;(useNavigate as unknown as ReturnType<typeof vi.fn>).mockReturnValue(navigateMock)

const renderWithContext = (value: UserContextType) =>
  render(
    <UserContext.Provider value={value}>
      <ProfileInfoCard />
    </UserContext.Provider>,
  )

describe('ProfileInfoCard', () => {
  it('returns null when no user is provided', () => {
    const { container } = renderWithContext({ user: null, loading: false, updateUser: vi.fn(), clearUser: vi.fn() })
    expect(container.firstChild).toBeNull()
  })

  it('displays user info and handles logout', async () => {
    const clearUser = vi.fn()
    const user = { name: 'Jane', profileImageUrl: 'img.png', token: 't' }
    renderWithContext({ user, loading: false, updateUser: vi.fn(), clearUser })

    expect(screen.getByText('Jane')).toBeInTheDocument()

    const clearSpy = vi.spyOn(Storage.prototype, 'clear')
    await userEvent.click(screen.getByRole('button', { name: /logout/i }))

    expect(clearSpy).toHaveBeenCalled()
    expect(clearUser).toHaveBeenCalled()
    expect(navigateMock).toHaveBeenCalledWith('/')

    clearSpy.mockRestore()
  })
})
