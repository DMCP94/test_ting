module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.ts$': 'ts-jest'
    },
    moduleFileExtensions: ['js', 'ts'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    testTimeout: 30000,
  };

  