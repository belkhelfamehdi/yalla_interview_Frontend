import { render, screen } from '@testing-library/react'
import Navbar from '../Navbar'
import { MemoryRouter } from 'react-router-dom'

vi.mock('../../Cards/ProfileInfoCard', () => ({
  default: () => <div>profile</div>,
}))

describe('Navbar', () => {
  it('renders link and profile info', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link')).toHaveAttribute('href', '/dashboard')
    expect(screen.getByText('profile')).toBeInTheDocument()
  })
})
