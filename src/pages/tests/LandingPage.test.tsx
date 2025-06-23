import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'

import LandingPage from '../LandingPage'
import { UserContext } from '../../context/userContext'

vi.mock('../Auth/Login', () => ({ default: () => <div>login</div> }))
vi.mock('../Auth/SignUp', () => ({ default: () => <div>signup</div> }))
vi.mock('../../components/Modal', () => ({
  default: ({ isOpen, children }: any) => (isOpen ? <div data-testid='modal'>{children}</div> : null),
}))
vi.mock('../../components/Cards/ProfileInfoCard', () => ({ default: () => <div>profile</div> }))

const navigateMock = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual: any = await vi.importActual('react-router-dom')
  return { ...actual, useNavigate: () => navigateMock }
})

describe('LandingPage integration', () => {
  it('opens auth modal when unauthenticated', async () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ user: null, loading: false, updateUser: vi.fn(), clearUser: vi.fn() }}>
          <LandingPage />
        </UserContext.Provider>
      </MemoryRouter>,
    )

    await userEvent.click(screen.getByRole('button', { name: /get started/i }))
    expect(screen.getByTestId('modal')).toBeInTheDocument()
  })

  it('navigates to dashboard when user exists', async () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ user: { token: 't' }, loading: false, updateUser: vi.fn(), clearUser: vi.fn() }}>
          <LandingPage />
        </UserContext.Provider>
      </MemoryRouter>,
    )

    await userEvent.click(screen.getByRole('button', { name: /get started/i }))
    expect(navigateMock).toHaveBeenCalledWith('/dashboard')
  })
})
