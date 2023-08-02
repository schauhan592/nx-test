const { withSentryConfig } = require('@sentry/nextjs');
const webpack = require('webpack');

const SentryWebpackPluginOptions = {
  // Additional configuration options for Sentry
};

const moduleExports = {
  webpack: (config, options) => {
    const { isServer } = options;
    if (!isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser';
    }

    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.SENTRY_RELEASE': JSON.stringify(process.env.SENTRY_RELEASE),
      })
    );

    return config;
  },
};

module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
