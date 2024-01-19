import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  moduleFileExtensions: ["js", "ts"],
  coverageProvider: "v8",
  testMatch: ["<rootDir>/src/**/__test__/*.test.(js|jsx|ts|tsx)"],
};

export default config;
