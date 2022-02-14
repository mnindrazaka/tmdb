module.exports = {
  roots: ["<rootDir>"],
  collectCoverage: true,
  clearMocks: true,
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./jest.setup.js"],
};
