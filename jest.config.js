module.exports = {
  moduleFileExtensions: ["vue", "js", "json", "jsx"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.vue$": "vue3-jest",
    "^.+\\js$": "babel-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!axios)/"],
  coveragePathIgnorePatterns: ["/node_modules/", "/tests/"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^axios$": require.resolve("axios"),
  },
};
