import { render, screen } from '@testing-library/react'
import SpinnerLoader from '../SpinnerLoader'

describe('SpinnerLoader', () => {
  it('renders spinner svg', () => {
    render(<SpinnerLoader />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })
})
