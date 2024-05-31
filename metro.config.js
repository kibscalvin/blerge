const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// Custom resolver options
const resolver = {
  sourceExts: ['jsx', 'js', 'ts', 'tsx', 'json', 'cjs'], // Add or remove extensions as needed
};

// Merge custom resolver with default configuration
const config = {
  resolver: resolver,
};

module.exports = mergeConfig(defaultConfig, config);
