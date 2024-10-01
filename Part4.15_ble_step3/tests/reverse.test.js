// tests/reverse.test.js
const { reverse } = require('../utils/for_testing');

test('reverse of a', () => {
  const result = reverse('a');
  expect(result).toBe('a');
});

test('reverse of react', () => {
  const result = reverse('react');
  expect(result).toBe('tcaer');
});

test('reverse of saippuakauppias (a palindrome)', () => {
  const result = reverse('saippuakauppias');
  expect(result).toBe('saippuakauppias'); // Palindrome remains the same
});

afterAll(async () => {
  await mongoose.connection.close();
});
