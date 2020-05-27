module.exports = {
  moduleDirectories: ['node_modules', 'src'],
  snapshotSerializers: [],
  // moduleNameMapper: {
  //   '^.+\\.(css|less|scss)$': 'babel-jest',
  // },
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
  },
};
