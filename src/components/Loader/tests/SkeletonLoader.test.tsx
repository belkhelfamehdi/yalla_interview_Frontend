import { render, screen } from '@testing-library/react'
import SkeletonLoader from '../SkeletonLoader'

describe('SkeletonLoader', () => {
  it('renders with status role', () => {
    render(<SkeletonLoader />)
    expect(screen.getAllByRole('status').length).toBeGreaterThan(0)
  })
})
