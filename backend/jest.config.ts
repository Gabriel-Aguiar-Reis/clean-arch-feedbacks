import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest/presets/default',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: [
    '**/test/unit/**/*.spec.ts',
    '**/test/integration/**/*.spec.ts',
    '**/test/e2e/**/*.spec.ts'
  ],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.json'
      }
    ]
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  rootDir: '.'
}
export default config
