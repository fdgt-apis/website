module.exports = {
  collectCoverageFrom: [
    '**/*.js',
    '!**/node_modules/**',
	],
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
	rootDir: '.',
  setupFilesAfterEnv: ['<rootDir>/config/jest/setup.js'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  transform: {
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.svg$': '<rootDir>/config/jest/svgTransform.js',
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
}
