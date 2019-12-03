module.exports = {
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json"
    }
  },
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.js$": "babel-jest"
  },
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"],
  testMatch: ["**/*.spec.(ts|js)"],
  testEnvironment: "node",
  testResultsProcessor: "jest-sonar-reporter",
  collectCoverageFrom: [
    "src/**/*.(ts)",
    "!src/index.ts",
    "!src/types/morgan-body.d.ts",
    "!src/**/**/entities/index.ts",
    "!src/libs/Swagger.ts",
    "!src/repositories/BaseRepository.ts"
  ],
  verbose: true
};
