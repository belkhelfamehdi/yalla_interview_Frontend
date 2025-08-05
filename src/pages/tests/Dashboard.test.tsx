import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'

import Dashboard from '../Home/Dashboard'
import { UserContext } from '../../context/userContext'

const mockGet = vi.fn()

vi.mock('../../utils/axiosInstance', () => ({
  default: {
    get: mockGet,
    post: vi.fn(),
  }
}))

vi.mock('../../components/layouts/Navbar', () => ({ default: () => <div>nav</div> }))
vi.mock('../Home/CreateSessionForm', () => ({ default: () => <div>form</div> }))
vi.mock('../../components/Modal', () => ({
  default: ({ isOpen, children }: { isOpen: boolean; children: React.ReactNode }) => (isOpen ? <div data-testid='modal'>{children}</div> : null),
}))
vi.mock('../../components/Cards/SummaryCard', () => ({
  default: ({ role, onSelect, onDelete }: { role: string; onSelect: () => void; onDelete: () => void }) => (
    <div onClick={onSelect}>
      <span>{role}</span>
      <button onClick={e => { e.stopPropagation(); onDelete() }}>delete</button>
    </div>
  ),
}))

const navigateMock = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return { ...actual, useNavigate: () => navigateMock }
})

describe('Dashboard page integration', () => {
  it('fetches sessions and handles interactions', async () => {
    mockGet.mockResolvedValue({ data: { sessions: [{ _id: '1', role: 'FE', topicToFocus: 'React', experience: 1, questions: [], description: 'desc', updatedAt: '' }] } })

    render(
      <MemoryRouter>
        <UserContext.Provider value={{ user: { token: 't' }, loading: false, updateUser: vi.fn(), clearUser: vi.fn() }}>
          <Dashboard />
        </UserContext.Provider>
      </MemoryRouter>,
    )

    expect(await screen.findByText('FE')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: /add new/i }))
    expect(screen.getByTestId('modal')).toBeInTheDocument()

    await userEvent.click(screen.getByText('FE'))
    expect(navigateMock).toHaveBeenCalledWith('/interview-prep/1')
  })
})
