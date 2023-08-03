// @ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nrwl/next/plugins/with-nx');
const path = require('path');
module.exports = require('./sentry.server.config');

const withPWA = require('next-pwa')({
  dest: 'public',
  skipWaiting: true,
  maximumFileSizeToCacheInBytes: 3000000,
});

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  swcMinify: true,
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
    images: {
      allowFutureImage: true,
    },
  },
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  images: {
    domains: ['www.freelogovectors.net'],
  },
  env: {
    NEXT_PUBLIC_APP_BASE_URL: process.env.NEXT_PUBLIC_APP_BASE_URL,
    NEXT_PUBLIC_JOIN_NEWSLETTER_HOOK: process.env.NEXT_PUBLIC_JOIN_NEWSLETTER_HOOK,
  },
};

module.exports = withPWA(withNx(nextConfig));
