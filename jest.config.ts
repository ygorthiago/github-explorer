/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/(pages|components)/**/*'],
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "\\.d\\.ts$",
    '/node_modules/',
    '<rootDir>/src/index.js',
    'index.ts',
  ],
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|js|tsx|jsx)$": [
      "@swc/jest",
      {
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: true,
            decorators: true,
          },
          keepClassNames: true,
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
            react: {
              runtime: "automatic",
            },
          },
        },
        module: {
          type: "commonjs",
          noInterop: false,
        },
      },
    ],
  },
};
