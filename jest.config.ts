/*module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
};
*/

export default {
    testEnvironment: 'jsdom',
    testMatch: ['**/?(*.)test.[t|j]s?(x)'],
    resetMocks: true,
    clearMocks: true,
    moduleNameMapper: {
    },
    setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
    roots: ['<rootDir>/src'],
    coverageReporters: ['text-summary'],
    transform: {
      '^.+\\.(t)sx?$': [
        '@swc/jest',
        {
          sourceMaps: 'inline',
          jsc: {
            transform: {
              react: {
                runtime: 'automatic',
              },
            },
          },
        },
      ],
    },
    transformIgnorePatterns: ['/node_modules/(?!sinon)/.+\\.js$'],
    extensionsToTreatAsEsm: ['.ts', '.tsx', ],
    cacheDirectory: '<rootDir>/.jestcache',
  };
  