const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './', 
});

/** @type {import('jest').Config} */
const customJestConfig = {
  testEnvironment: 'node', 
  moduleNameMapper: {
    '^@/app/(.*)$': '<rootDir>/app/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], 
};

module.exports = createJestConfig(customJestConfig);
