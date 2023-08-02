/* eslint-disable */
export default {
  displayName: 'alfred-common',
  preset: '../../jest.preset.js',
  moduleNameMapper: {
    '\\.(png)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.[tj]sx?$': ['@swc/jest', { jsc: { transform: { react: { runtime: 'automatic' } } } }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/alfred-common',
};
