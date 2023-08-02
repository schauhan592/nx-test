import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import Layout from '../../../layouts';
import { Box, Typography } from '@mui/material';
export const termsOfUseText = `<h1>Terms of Use -</h1>
<br><h4>Effective Date: 17-07-23</h4><br>

<h2>Introduction</h2>
<p>Welcome to Alfred! These Terms of Use govern your use of our decentralized investment platform ("Alfred"). By accessing or using Alfred, you agree to be bound by these Terms of Use. If you do not agree with any part of these terms, please refrain from using Alfred.</p><br>

<h2>Use of Alfred</h2>
<ol type="a">
  <li>
    <strong> Eligibility:</strong><br>
    You must be at least 18 years old and have the legal capacity to enter into a contract to use Alfred.
  </li>
  <li>
    <strong> Account Creation:</strong><br>
    You are responsible for maintaining the confidentiality of your wallet and for any activities that occur under your wallet.
  </li>
  <li>
    <strong> Prohibited Activities:</strong><br>
    You agree not to engage in the following activities while using Alfred:<br>
    &emsp; &bull; Violating any applicable laws or regulations<br>
    &emsp; &bull; Interfering with Alfred's functionality or security<br>
    &emsp; &bull; Transmitting malicious software or harmful code<br>
    &emsp; &bull; Impersonating any individual or entity<br>
    &emsp; &bull; Engaging in any activity that could harm Alfred or its users
  </li>
</ol>
<br>

<h2>Intellectual Property</h2>
<ol type="a">
  <li>
    <strong> Ownership:</strong><br>
    Alfred and all its content, including but not limited to graphics, logos, trademarks, and software, are the property of Deqode Solutions Pvt. Ltd. or its licensors and are protected by intellectual property laws.
  </li>
  <li>
    <strong> License:</strong><br>
    By using Alfred, Deqode Solutions Pvt. Ltd. grants you a limited, non-exclusive, and non-transferable license to access and use Alfred for its intended purposes. You may not reproduce, modify, distribute, or create derivative works based on Alfred's content without our prior written consent.
  </li>
</ol>
<br>

<h2>Disclaimer of Warranties</h2>
<ol type="a">
  <li>
    <strong> Alfred is provided "as is":</strong><br>
    without any warranties, express or implied. Deqode Solutions Pvt. Ltd. makes no representations or guarantees regarding the accuracy, reliability, or suitability of the platform for your specific needs.
  </li>
  <li>
    <strong> No warranty of error-free or uninterrupted use:</strong><br>
    Deqode Solutions Pvt. Ltd. does not warrant that Alfred will be error-free, secure, or uninterrupted. Your use of Alfred is at your own risk.
  </li>
</ol>
<br>

<h2>Limitation of Liability</h2>
<ol type="a">
  <li>
    <strong> Indirect, incidental, consequential, or punitive damages:</strong><br>
    Deqode Solutions Pvt. Ltd. and its affiliates shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of Alfred.
  </li>
  <li>
    <strong> Maximum liability:</strong><br>
    In no event shall Deqode Solutions Pvt. Ltd.'s total liability for any claim related to Alfred exceed the fees (if any) paid by you to Deqode Solutions Pvt. Ltd. during the preceding six months.
  </li>
</ol>
<br>

<h2>Indemnification</h2>
<p>You agree to indemnify and hold harmless Deqode Solutions Pvt. Ltd. and its affiliates from any claims, damages, liabilities, costs, or expenses arising from your use of Alfred or any breach of these Terms of Use.</p><br>

<h2>Modification of Terms</h2>
<p>Deqode Solutions Pvt. Ltd. reserves the right to modify these Terms of Use at any time. Any changes will be effective upon posting the revised terms on Alfred. Your continued use of Alfred after the changes become effective constitutes your acceptance of the revised Terms of Use.</p><br>

<h2>Termination</h2>
<p>Deqode Solutions Pvt. Ltd. may terminate your access to Alfred at any time, with or without cause. Upon termination, you must cease all use of Alfred and destroy any materials obtained from it.</p><br>

<h2>Governing Law and Jurisdiction</h2>
<p>These Terms of Use shall be governed by and construed in accordance with the laws of UAE. Any disputes arising out of or in connection with these Terms of Use shall be subject to the exclusive jurisdiction of the courts in UAE.</p><br>

<h2>Contact Us</h2>
<p>If you have any questions or concerns regarding these Terms of Use or your use of Alfred, please contact us at <a style="color:powderblue;" href="mailto:mkhan@deqode.com">mkhan@deqode.com</a>.</p>
`;

const CopyTradingContextProvider = dynamic(() =>
  import('@alfred/copy-trading').then((mod) => mod.CopyTradingContextProvider)
);

const heading = 'Leaderboard';
const subHeading = 'Click on copy, sit back, and watch the profits flow in.';

TermsOfUse.getLayout = function getLayout(children: ReactNode) {
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

export default function TermsOfUse() {
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
        <div dangerouslySetInnerHTML={{ __html: termsOfUseText }} />
      </Typography>
    </Box>
  );
}
