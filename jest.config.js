const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './', // raíz de tu proyecto Next.js
});

/** @type {import('jest').Config} */
const customJestConfig = {
  testEnvironment: 'jsdom', // puedes usar node si solo haces pruebas de lógica
  moduleNameMapper: {
    '^@/app/(.*)$': '<rootDir>/app/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], 
};

module.exports = createJestConfig(customJestConfig);
