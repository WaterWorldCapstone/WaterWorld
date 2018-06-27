const sum = require('./sum.js')

test('sum adds 1 and 2 and returns 3', () => {
  expect(sum(1, 2)).toBe(3)
})
