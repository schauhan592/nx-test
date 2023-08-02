import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import Layout from '../../../layouts';
import { Box, Typography } from '@mui/material';
export const privacyPolicyText = ` <h1>Privacy Policy -</h1>
<br> <h4>Effective Date: 17-07-23</h4>
<br>

<h2>Introduction</h2>
<p>Welcome to Alfred! This Privacy Policy outlines how we collect, use, and protect your personal information when you use our decentralized investment machine platform ("Alfred").<br>
We are committed to safeguarding your privacy and ensuring the security of your data.</p><br>

<h2>Information We Collect</h2>
<ol type="a">
  <li>
    <strong> Personal Information:</strong><br>
    We may collect the wallet address that you use to connect with Alfred.
  </li>
  <li>
    <strong> Usage Data:</strong><br>
    We may collect non-personal information about your interactions with Alfred, such as your IP address, device information, browser type, and usage patterns.
  </li>
  <li>
    <strong> Cookies and Similar Technologies:</strong><br>
    Alfred may use cookies and similar technologies to enhance your experience and collect usage data. You can manage your cookie preferences through your browser settings.
  </li>
</ol>
<br>

<h2>How We Use Your Information</h2>
<ol type="a">
  <li>
    <strong> Providing Services:</strong><br>
    We use your personal information to operate Alfred, process transactions, and provide customer support.
  </li>
  <li>
    <strong> Improve User Experience:</strong><br>
    We may analyze usage data to enhance Alfred's functionality, performance, and user interface.
  </li>
  <li>
    <strong> Communication:</strong><br>
    We may use your email address to send you important updates, newsletters, and promotional materials. You can opt-out of marketing communications at any time.
  </li>
</ol>
<br>

<h2>Data Sharing and Disclosure</h2>
<ol type="a">
  <li>
    <strong> Third-Party Service Providers:</strong><br>
    We may share your personal information with third-party service providers to facilitate Alfred's operation, such as hosting, payment processing, and analytics.
  </li>
  <li>
    <strong> Legal Compliance:</strong><br>
    We may disclose your information if required by law or to protect our rights, privacy, safety, or property.
  </li>
</ol>
<br>

<h2>Your Choices</h2>
<ol type="a">
  <li>
    <strong> Account Settings:</strong><br>
    You can review and update your personal information in your Alfred account settings.
  </li>
  <li>
    <strong> Opt-Out:</strong><br>
    You can opt-out of marketing communications by following the instructions in our emails or contacting us directly.
  </li>
</ol>
<br>

<h2>Data Security</h2>
<p>We employ industry-standard security measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet or electronic storage is entirely secure.</p><br>

<h2>Children's Privacy</h2>
<p>Alfred is not intended for individuals under the age of 18. We do not knowingly collect personal information from children.<br>
If you are a parent or guardian and believe your child has provided personal information to us, please contact us to request deletion.</p><br>

<h2>Changes to this Privacy Policy</h2>
<p>We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the "Effective Date" will be updated accordingly.<br>
Please review this policy periodically.</p><br>

<h2>Contact Us</h2>
<p>If you have any questions or concerns regarding this Privacy Policy or our data practices, please contact us at <a style="color:powderblue;" href="mailto:mkhan@deqode.com">mkhan@deqode.com</a>.</p>
`;

const CopyTradingContextProvider = dynamic(() =>
  import('@alfred/copy-trading').then((mod) => mod.CopyTradingContextProvider)
);

const heading = 'Leaderboard';
const subHeading = 'Click on copy, sit back, and watch the profits flow in.';

PrivacyPolicy.getLayout = function getLayout(children: ReactNode) {
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

export default function PrivacyPolicy() {
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
        <div dangerouslySetInnerHTML={{ __html: privacyPolicyText }} />
      </Typography>
    </Box>
  );
}
