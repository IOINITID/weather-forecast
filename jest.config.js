module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: `./src/coverage`,
  coverageReporters: [
    `json-summary`,
    `text`,
    `lcov`
  ],
  transform: {
    "^.+\\.tsx?$": `ts-jest`,
    "^.+\\.js?$": `babel-jest`,
  },
  testRegex: `.test.(js?|jsx?|tsx?)$`,
  moduleFileExtensions: [
    `ts`,
    `tsx`,
    `js`,
    `jsx`,
    `json`,
    `node`
  ],
  moduleNameMapper: {
    "\\.svg": `<rootDir>/src/__mocks__/svgrMock.tsx`
  }
};
