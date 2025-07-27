// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    // The files that contain tests.
    testMatch: ["**/src/**/__tests__/**/*.test.ts"],

    // Automatically restore mocks between every test
    restoreMocks: true,

    // Automatically clear mock calls and instances between every test
    clearMocks: true,

    // Automatically reset mock state between every test
    resetMocks: true,

    // The directory where Jest should output its coverage files
    coverageDirectory: "coverage",

    // The test environment that will be used for testing
    testEnvironment: "node",

    // Setting this allows the use of fake timers for functions such as "setTimeout"
    fakeTimers: {
        enableGlobally: true,
    },

    setupFilesAfterEnv: ["jest-extended/all"],

    prettierPath: null,
};
