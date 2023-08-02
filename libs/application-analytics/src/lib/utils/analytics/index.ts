import Analytics from 'analytics';
import PostHog from './Posthog';
import googleAnalytics from '@analytics/google-analytics';

/* initialize analytics and load plugins */
const analytics = Analytics({
  app: 'alfred',
  debug: false,
  plugins: [
    // Google Plugin
    googleAnalytics({
      measurementIds: [process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS],
    }),
    // PostHog Plugin
    PostHog({
      token: process.env.NEXT_PUBLIC_POSTHOG_KEY as string,
      enabled: true,
    }),
  ],
});

/* export analytics for usage through the app */
export default analytics;
