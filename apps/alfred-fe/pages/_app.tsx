import * as Sentry from '@sentry/browser';
import { Integrations } from '@sentry/tracing';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { SnackbarProvider } from 'notistack';
import { Fragment, useEffect, useState } from 'react';

import { analytics } from '@alfred/application-analytics';
import { useRouter } from 'next/router';
import { ctThemePalette, ctThemeTypo, lpThemePalette, lpThemeTypo } from '../theme';
import '../theme/global.css';
import { getSettingsDefault } from '../theme/utils';

const WalletProvider = dynamic(() => import('@alfred/wallets').then((mod) => mod.WalletProvider), {
  ssr: false,
});

const Web3Provider = dynamic(() => import('@alfred/wallets').then((mod) => mod.Web3Provider), {
  ssr: false,
});

const TransactionMonitorProvider = dynamic(
  () => import('@alfred/alfred-common').then((mod) => mod.TransactionMonitorProvider),
  {
    ssr: false,
  }
);

const HistoryProvider = dynamic(() => import('@sdf/base').then((mod) => mod.HistoryProvider), {
  ssr: false,
});

const SettingsProvider = dynamic(() => import('@sdf/base').then((mod) => mod.SettingsProvider), {
  ssr: false,
});

const ThemeProvider = dynamic(() => import('@sdf/base').then((mod) => mod.ThemeProvider), {
  ssr: false,
});

Sentry.init({
  enabled: process.env.NODE_ENV === 'production',
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing(), new Sentry.Replay()],
  tracesSampleRate: 1.0,
});

function CustomApp({ Component, pageProps }) {
  const { pathname } = useRouter();
  const isCopyTradeSection = pathname.split('/')[1] === 'copy-trading';

  const getLayout = Component.getLayout ?? ((page) => page);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: 1,
            retryDelay: 3000,
          },
        },
      })
  );

  useEffect(() => {
    if (analytics && process.env.NODE_ENV === 'production') {
      analytics.page();
    }
  }, []);

  const theme = { ctThemePalette, ctThemeTypo, lpThemePalette, lpThemeTypo };

  return (
    <Fragment>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </Head>
      <SettingsProvider
        defaultSettings={{ ...getSettingsDefault(), themeMode: isCopyTradeSection ? 'ct' : 'lp' }}
      >
        <ThemeProvider themeConfig={{ ...theme }}>
          <SnackbarProvider>
            <HistoryProvider>
              <Web3Provider>
                <WalletProvider>
                  <QueryClientProvider client={queryClient}>
                    <TransactionMonitorProvider>
                      <Hydrate state={pageProps.dehydratedState}>
                        {getLayout(<Component {...pageProps} />)}
                      </Hydrate>
                    </TransactionMonitorProvider>
                  </QueryClientProvider>
                </WalletProvider>
              </Web3Provider>
            </HistoryProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </SettingsProvider>
    </Fragment>
  );
}

export default CustomApp;
