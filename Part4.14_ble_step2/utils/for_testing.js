// utils/for_testing.js
const reverse = (string) => {
  return string.split('').reverse().join('')
}

const average = (array) => {
  if (array.length === 0) return 0;
  const sum = array.reduce((a, b) => a + b, 0);
  return sum / array.length;
};

module.exports = {
  reverse,
  average
}
