export default {
  testEnvironment: 'jsdom',
  testMatch: ['**/?(*.)test.[t|j]s?(x)'],
  resetMocks: true,
  clearMocks: true,
  snapshotSerializers: ["enzyme-to-json/serializer"],
  setupFilesAfterEnv: ['<rootDir>/test/jest.setupFilesAfterEnv.ts'],
  setupFiles: ["<rootDir>/test/jest.setup.ts"],
  roots: ['<rootDir>/src'],
  coverageReporters: ['text-summary'],
  transform: {
    '^.+\\.(t|j)sx?$': [
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
  moduleNameMapper: {
    "^ckeditor5$": "<rootDir>/node_modules/ckeditor5/dist/ckeditor5.js",
    "^ckeditor5-premium-features$":
      "<rootDir>/node_modules/ckeditor5-premium-features/dist/ckeditor5-premium-features.js",
  },
  transformIgnorePatterns: ["/node_modules/(?!sinon)/.+\\.js$"],
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  cacheDirectory: "<rootDir>/.jestcache",
};
