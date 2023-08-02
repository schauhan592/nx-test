import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import Layout from '../layouts';

// const CopyTradingContextProvider = dynamic(() =>
//   import('@alfred/copy-trading').then((mod) => mod.CopyTradingContextProvider)
// );

const CopyTradingLandingPageContainer = dynamic(() =>
  import('@alfred/copy-trading').then((mod) => mod.CopyTradingLandingPageContainer)
);

const heading = 'Leaderboard';
const subHeading = 'Click on copy, sit back, and watch the profits flow in.';

CopyTradingLandingPage.getLayout = function getLayout(children: ReactNode) {
  return (
    <Layout
      title="Copy Trading"
      variant="copy-trading-landing-page"
      heading={heading}
      subHeading={subHeading}
    >
      {children}
    </Layout>
  );
};

export default function CopyTradingLandingPage() {
  return <CopyTradingLandingPageContainer />;
}
