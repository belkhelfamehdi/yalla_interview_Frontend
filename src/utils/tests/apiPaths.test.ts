import { describe, it, expect } from 'vitest'
import { API_PATHS } from '../apiPaths'

describe('API_PATHS dynamic methods', () => {
  it('builds GET_ONE path', () => {
    expect(API_PATHS.SESSION.GET_ONE('123')).toBe('/api/sessions/123')
  })

  it('builds DELETE path', () => {
    expect(API_PATHS.SESSION.DELETE('abc')).toBe('/api/sessions/abc')
  })

  it('builds QUESTION PIN path', () => {
    expect(API_PATHS.QUESTION.PIN('id1')).toBe('/api/questions/id1/pin')
  })
})
