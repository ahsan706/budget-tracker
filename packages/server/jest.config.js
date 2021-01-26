// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // A path to a module which exports an async function that is triggered once before all test suites
  globalSetup: '<rootDir>/__tests__/setup.js',
  // A path to a module which exports an async function that is triggered once after all test suites
  globalTeardown: '<rootDir>/__tests__/teardown.js',
  setupFilesAfterEnv: ['<rootDir>/__tests__/setupAfterEnv.js'],
  // The test environment that will be used for testing
  testEnvironment: '<rootDir>/__tests__/environment.js',
  // The glob patterns Jest uses to detect test files
  testMatch: ['**/__tests__/**/*.test.js']
};
