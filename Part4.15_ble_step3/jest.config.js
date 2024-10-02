export default {
    transform: {
      '^.+\\.js$': 'babel-jest',  // Babel is used to transpile ES modules
    },
    testEnvironment: 'node',  // Use the Node.js environment for tests
  };
  