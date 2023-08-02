import { useWallet } from '@alfred/wallets';
import LinearProgress from '@mui/material/LinearProgress';
import { TLink } from '@sdf/base';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

const ConnectWalletDialog = dynamic(() => import('../components/ConnectModal'));

const WrongNetwork = dynamic(() => import('../components/WrongNetwork'));

const LandingPageLayout = dynamic(() => import('./LandingPageLayout'), {
  loading: () => <LinearProgress />,
});
const StrategyPageLayout = dynamic(() => import('./StrategyPageLayout'), {
  loading: () => <LinearProgress />,
});
const CopyTradeDashboardLayout = dynamic(
  () => import('./CopyTradingLayout/CopyTradingDashboardLayout'),
  {
    loading: () => <LinearProgress />,
  }
);

const CopyTradingLandingPageLayout = dynamic(
  () => import('./CopyTradingLayout/CopyTradingLandingPage'),
  {
    loading: () => <LinearProgress />,
  }
);
const CopyTradingLayout = dynamic(() => import('./CopyTradingLayout/CopyTradingLayout'), {
  loading: () => <LinearProgress />,
});

const CopyTradingDetailsLayout = dynamic(
  () => import('./CopyTradingLayout/CopyTradingDetailsLayout'),
  {
    loading: () => <LinearProgress />,
  }
);

const Page = dynamic(() => import('@sdf/base').then((lib) => lib.Page), {
  loading: () => <LinearProgress />,
});

interface LayoutSwitchProps {
  variant?:
    | 'landingpage'
    | 'strategy'
    | 'copy-trading'
    | 'copy-trading-details'
    | 'copy-trade-dashboard'
    | 'copy-trading-landing-page';
  children: ReactNode;
  breadCrumbLinks?: TLink[];
  heading?: string;
  subHeading?: string;
}

interface LayoutProps extends LayoutSwitchProps {
  title: string;
  meta?: ReactNode;
}

function LayoutSwitch({ variant = 'landingpage', children, ...others }: LayoutSwitchProps) {
  const { pathname } = useRouter();

  if (variant === 'strategy') {
    return <StrategyPageLayout {...others}>{children}</StrategyPageLayout>;
  }
  if (variant === 'copy-trading-landing-page') {
    return <CopyTradingLandingPageLayout {...others}>{children} </CopyTradingLandingPageLayout>;
  }

  if (variant === 'copy-trading') {
    return <CopyTradingLayout {...others}>{children} </CopyTradingLayout>;
  }

  if (variant === 'copy-trade-dashboard') {
    return <CopyTradeDashboardLayout {...others}>{children}</CopyTradeDashboardLayout>;
  }

  if (variant === 'copy-trading-details') {
    return <CopyTradingDetailsLayout {...others}>{children} </CopyTradingDetailsLayout>;
  }

  return <LandingPageLayout> {children} </LandingPageLayout>;
}

export default function Layout({
  variant = 'landingpage',
  children,
  title,
  meta,
  ...others
}: LayoutProps) {
  const { isConnectModalOpen, handleCloseConnectModal } = useWallet();

  return (
    <Page title={title} meta={meta}>
      <LayoutSwitch variant={variant} {...others}>
        <ConnectWalletDialog isOpen={isConnectModalOpen} closeModal={handleCloseConnectModal} />
        <WrongNetwork />
        {children}
      </LayoutSwitch>
    </Page>
  );
}
