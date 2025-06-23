import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import QuestionCard from '../QuestionCard'
import { vi } from 'vitest'

vi.mock('../../../pages/InterviewPrep/components/AiResponsePreview', () => ({
  default: ({ content }: { content: string }) => <div>{content}</div>,
}))

describe('QuestionCard', () => {
  const baseProps = {
    question: 'What is React?',
    answer: 'Library',
    onLearnMore: vi.fn(),
    isPinned: false,
    onTogglePin: vi.fn(),
  }

  it('toggles expansion when question clicked', async () => {
    render(<QuestionCard {...baseProps} />)
    const btn = screen.getByRole('button', { name: 'What is React?' })
    await userEvent.click(btn)
    expect(screen.getByText('Library')).toBeInTheDocument()
  })

  it('calls onTogglePin when pin clicked', async () => {
    const onTogglePin = vi.fn()
    render(<QuestionCard {...baseProps} onTogglePin={onTogglePin} />)
    const pinBtn = screen.getAllByRole('button')[1]
    await userEvent.click(pinBtn)
    expect(onTogglePin).toHaveBeenCalled()
  })

  it('calls onLearnMore when learn more clicked', async () => {
    const onLearnMore = vi.fn()
    render(<QuestionCard {...baseProps} onLearnMore={onLearnMore} />)
    const learnBtn = screen.getByText(/learn more/i)
    await userEvent.click(learnBtn)
    expect(onLearnMore).toHaveBeenCalled()
  })
})
