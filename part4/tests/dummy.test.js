const listHelper = require('../utils/list_helper')

describe('dummy', () => {
  test('dummy returns 1', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})