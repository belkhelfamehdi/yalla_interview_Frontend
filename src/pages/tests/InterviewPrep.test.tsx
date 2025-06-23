import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { vi } from 'vitest'

import InterviewPrep from '../InterviewPrep/InterviewPrep'
import { UserContext } from '../../context/userContext'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'

vi.mock('../../utils/axiosInstance')
vi.mock('../../components/layouts/Navbar', () => ({ default: () => <div>nav</div> }))
vi.mock('../InterviewPrep/components/AiResponsePreview', () => ({ default: ({ content }: any) => <div>{content}</div> }))

const mockedAxios = vi.mocked(axiosInstance)

describe('InterviewPrep page integration', () => {
  it('loads session and shows explanation drawer', async () => {
    mockedAxios.get.mockResolvedValue({ data: { session: {
      _id: '1',
      role: 'FE',
      topicToFocus: 'React',
      experience: '2',
      description: 'desc',
      updatedAt: '',
      questions: [{ _id: 'q1', question: 'Q1', answer: 'A1', isPinned: false }],
    } } })
    mockedAxios.post.mockResolvedValue({ data: { title: 'Title', explanation: 'Exp' } })

    render(
      <MemoryRouter initialEntries={['/interview-prep/1']}>
        <UserContext.Provider value={{ user: { token: 't' }, loading: false, updateUser: vi.fn(), clearUser: vi.fn() }}>
          <Routes>
            <Route path='/interview-prep/:sessionId' element={<InterviewPrep />} />
          </Routes>
        </UserContext.Provider>
      </MemoryRouter>,
    )

    expect(await screen.findByText('Q1')).toBeInTheDocument()

    await userEvent.click(screen.getByText(/learn more/i))
    expect(mockedAxios.post).toHaveBeenCalledWith(API_PATHS.AI.GENERATE_EXPLANATION, { question: 'Q1' })
    expect(await screen.findByText('Exp')).toBeInTheDocument()
  })
})
