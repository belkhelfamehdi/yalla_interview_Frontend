import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import LandingPage from '../LandingPage'
import { UserContext } from '../../context/userContext'

describe('LandingPage end-to-end flow', () => {
  it('opens login modal when clicking Get Started', async () => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ user: null, loading: false, updateUser: vi.fn(), clearUser: vi.fn() }}>
          <LandingPage />
        </UserContext.Provider>
      </BrowserRouter>,
    )

    await userEvent.click(screen.getByRole('button', { name: /get started/i }))
    expect(screen.getByText(/welcome back/i)).toBeInTheDocument()
  })
})
