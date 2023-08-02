import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import Layout from '../../../layouts';
import { Box, Typography } from '@mui/material';
export const aboutText = `<h1>About Alfred -</h1>
<br>
<p>Alfred serves as a decentralized investment tool, enabling you to effortlessly track and mimic the trading approaches of the most skilled individuals worldwide. Our aim is to provide support for those who find the complexities of investment daunting, particularly newcomers to the finance realm.
</p>
<br>
<p>Imagine the ease of duplicating the trades executed by successful traders. With Alfred, there's no need to spend excessive time scrutinizing charts or worrying about making accurate investment choices. Our platform seamlessly connects you with a diverse community of proficient traders, granting you immediate access to their invaluable expertise. By following their lead, you can automatically mirror their trades and reap the benefits of real-time insights.</p>
<br>
<p>Security and transparency take precedence in our operations. Alfred operates on the blockchain, ensuring that every trade is securely and immutably recorded. You retain complete control over your funds, obviating the necessity for intermediaries.</p>
<br>
<p>Whether you possess extensive investment experience and seek portfolio diversification or you're a novice searching for guidance, Alfred empowers you. Our unwavering commitment is to foster transparency, accessibility, and profitability in the realm of investment.
</p>
<br>
<p>Take the leap and join Alfred today to encounter the future of decentralized finance. Unleash your true potential in the financial markets and embark on a transformative investment expedition alongside us.
</p>
<br>
`;

const CopyTradingContextProvider = dynamic(() =>
  import('@alfred/copy-trading').then((mod) => mod.CopyTradingContextProvider)
);

const heading = 'Leaderboard';
const subHeading = 'Click on copy, sit back, and watch the profits flow in.';

About.getLayout = function getLayout(children: ReactNode) {
  return (
    <Layout
      title="Copy Trading"
      variant="copy-trading-landing-page"
      heading={heading}
      subHeading={subHeading}
    >
      <CopyTradingContextProvider>{children}</CopyTradingContextProvider>
    </Layout>
  );
};

export default function About() {
  return (
    <Box
      sx={{
        width: '100%',
        padding: { xs: '25px', sm: '50px', lg: '120px' },
        overflow: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="body1" sx={{ color: 'text.primary' }}>
        <div dangerouslySetInnerHTML={{ __html: aboutText }} />
      </Typography>
    </Box>
  );
}
