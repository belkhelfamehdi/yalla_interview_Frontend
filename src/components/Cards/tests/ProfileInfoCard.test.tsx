import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProfileInfoCard from '../ProfileInfoCard'
import { UserContext } from '../../../context/userContext'
import { vi } from 'vitest'
import { useNavigate } from 'react-router-dom'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<any>('react-router-dom')
  return {
    ...actual,
    useNavigate: vi.fn(),
  }
})

const navigateMock = vi.fn()
;(useNavigate as unknown as vi.Mock).mockReturnValue(navigateMock)

const renderWithContext = (value: any) =>
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

    const clearSpy = vi.spyOn(window.localStorage.__proto__, 'clear')
    await userEvent.click(screen.getByRole('button', { name: /logout/i }))

    expect(clearSpy).toHaveBeenCalled()
    expect(clearUser).toHaveBeenCalled()
    expect(navigateMock).toHaveBeenCalledWith('/')

    clearSpy.mockRestore()
  })
})
