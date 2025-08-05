import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'

import CreateSessionForm from '../Home/CreateSessionForm'
import { API_PATHS } from '../../utils/apiPaths'

const mockPost = vi.fn()

vi.mock('../../utils/axiosInstance', () => ({
  default: {
    post: mockPost,
    get: vi.fn(),
  }
}))

vi.mock('../../components/Loader/SpinnerLoader', () => ({ default: () => <div>load</div> }))

const navigateMock = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return { ...actual, useNavigate: () => navigateMock }
})

describe('CreateSessionForm integration', () => {
  it('creates session and navigates', async () => {
    mockPost
      .mockResolvedValueOnce({ data: [{ question: 'Q1', answer: 'A1' }] })
      .mockResolvedValueOnce({ data: { session: { _id: '10' } } })

    render(
      <MemoryRouter>
        <CreateSessionForm />
      </MemoryRouter>,
    )

    await userEvent.type(screen.getByPlaceholderText('e.g., Frontend Developer, UI/UX Designer, etc.'), 'FE')
    await userEvent.type(screen.getByPlaceholderText('e.g., 1 year, 3 years, 5+ years'), '2')
    await userEvent.type(screen.getByPlaceholderText('e.g., React, CSS, Algorithms, etc.'), 'React')
    await userEvent.type(screen.getByPlaceholderText('e.g., I want to focus on React and CSS.'), 'desc')
    await userEvent.click(screen.getByRole('button', { name: /create session/i }))

    expect(mockPost).toHaveBeenNthCalledWith(1, API_PATHS.AI.GENERATE_QUESTIONS, expect.objectContaining({
      role: 'FE',
      experience: '2',
      topicToFocus: 'React',
      numberOfQuestions: 10,
    }))
    expect(mockPost).toHaveBeenNthCalledWith(2, API_PATHS.SESSION.CREATE, expect.objectContaining({
      role: 'FE',
      experience: '2',
      topicToFocus: 'React',
      description: 'desc',
    }))
    expect(navigateMock).toHaveBeenCalledWith('/interview-prep/10')
  })
})
