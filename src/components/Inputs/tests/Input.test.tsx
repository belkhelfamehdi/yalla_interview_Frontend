import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Input from '../Input'

describe('Input component', () => {
  it('renders label and placeholder', () => {
    render(
      <Input
        label="Password"
        value=""
        onChange={() => {}}
        type="password"
        placeholder="enter"
      />,
    )
    expect(screen.getByText('Password')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('enter')).toBeInTheDocument()
  })

  it('toggles password visibility', async () => {
    render(
      <Input label="Password" value="secret" onChange={() => {}} type="password" />,
    )
    const toggleButton = screen.getByRole('button')
    const input = screen.getByDisplayValue('secret') as HTMLInputElement

    expect(input.type).toBe('password')
    await userEvent.click(toggleButton)
    expect(input.type).toBe('text')
    await userEvent.click(toggleButton)
    expect(input.type).toBe('password')
  })
})