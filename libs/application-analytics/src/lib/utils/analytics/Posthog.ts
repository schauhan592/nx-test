/* eslint-disable @typescript-eslint/ban-types */
import posthog from 'posthog-js';

type Config = {
  token: string;
  enabled: boolean;
};

export default function PostHog(config: Config) {
  let isPostHogLoaded = false;

  return {
    name: 'posthog',

    initialize: (): void => {
      if (config.enabled && typeof window !== 'undefined') {
        posthog.init(config.token, { api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST });
        isPostHogLoaded = true;
      }
    },

    track: ({ payload }: any): void => {
      posthog.capture(payload.event, payload.properties);
    },

    page: ({ payload }: any): void => {
      posthog.capture('$pageview', payload.properties);
    },

    identify: ({
      payload,
    }: {
      payload: {
        userId: string;
        traits: {
          $set?: object;
          $set_once?: object;
        };
      };
    }): void => {
      const { userId } = payload;
      const { $set, $set_once } = payload.traits;

      if (userId) {
        posthog.identify(payload.userId, $set, $set_once);
      }
    },

    loaded: (): boolean => {
      return isPostHogLoaded;
    },
  };
}
