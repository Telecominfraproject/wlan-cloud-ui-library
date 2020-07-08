module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.js'],
  moduleDirectories: ['node_modules', 'src'],
  snapshotSerializers: [],
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
  },
};
