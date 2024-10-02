export default {
  transform: {
    '^.+\\.js$': 'babel-jest',  // Babel is used to transpile ES modules
  },
  testEnvironment: 'node',  // Use the Node.js environment for tests
  testTimeout: 100000,  // Increase Jest timeout to 20 seconds (20000ms)
};
