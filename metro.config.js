// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
/* Update this on metro  */
config.resolver.extraNodeModules = require('node-libs-expo')

module.exports = config;
