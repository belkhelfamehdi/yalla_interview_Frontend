import { describe, it, expect } from 'vitest'
import { validateEmail, getInitials } from '../helper'

describe('validateEmail', () => {
  it('returns true for valid email', () => {
    expect(validateEmail('test@example.com')).toBe(true)
  })

  it('returns false for invalid email', () => {
    expect(validateEmail('invalid-email')).toBe(false)
  })
})

describe('getInitials', () => {
  it('returns initials for two words', () => {
    expect(getInitials('John Doe')).toBe('JD')
  })

  it('returns first letter when single word', () => {
    expect(getInitials('John')).toBe('J')
  })

  it('returns empty string when title is empty', () => {
    expect(getInitials('')).toBe('')
  })
})
