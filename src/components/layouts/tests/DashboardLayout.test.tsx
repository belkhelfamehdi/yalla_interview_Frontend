import { render, screen } from '@testing-library/react'
import DashboardLayout from '../DashboardLayout'
import { UserContext } from '../../../context/userContext'
import { vi } from 'vitest'

vi.mock('../Navbar', () => ({ default: () => <div>nav</div> }))

const renderWithUser = (user: any) =>
  render(
    <UserContext.Provider value={{ user, loading: false, updateUser: vi.fn(), clearUser: vi.fn() }}>
      <DashboardLayout>
        <div>child</div>
      </DashboardLayout>
    </UserContext.Provider>,
  )

describe('DashboardLayout', () => {
  it('shows children when user exists', () => {
    renderWithUser({ token: 't' })
    expect(screen.getByText('child')).toBeInTheDocument()
  })

  it('hides children when no user', () => {
    const { queryByText } = renderWithUser(null)
    expect(queryByText('child')).toBeNull()
  })
})
