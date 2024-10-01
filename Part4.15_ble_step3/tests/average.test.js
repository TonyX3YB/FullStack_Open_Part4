// tests/average.test.js
const mongoose = require('mongoose');
const { average } = require('../utils/for_testing');

describe('average', () => {
  test('of an empty array is zero', () => {
    const result = average([]);
    expect(result).toBe(0);  // Correct Jest assertion
  });

  test('of one value is the value itself', () => {
    const result = average([1]);
    expect(result).toBe(1);
  });

  test('of many values is calculated correctly', () => {
    const result = average([1, 2, 3, 4, 5]);
    expect(result).toBe(3);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

