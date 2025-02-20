/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    testEnvironment: "node",
    setupFiles: ['<rootDir>/jest.setup.js', 'dotenv/config'],
    transform: {
        "^.+.tsx?$": ["ts-jest", {}],
    },
};