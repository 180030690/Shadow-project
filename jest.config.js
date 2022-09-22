module.exports = {
    roots: [
        "<rootDir>/src/hbs-app"
    ],
    moduleDirectories: ["node_modules", "src"],
    "testEnvironment": "jsdom",
    collectCoverage: true,
    collectCoverageFrom: [
        "<rootDir>/src/hbs-app/fe-components/*/*/*.js",
        "!<rootDir>/src/hbs-app/fe-components/*/*/*.mock.js"
    ]
};