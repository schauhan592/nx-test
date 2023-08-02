import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { ITrader } from '../@types';
import Link from 'next/link';
import { Link as MUILink } from '@mui/material';
import getFilteredData from '../hooks/useGetFilter';
// import { useWallet } from '@alfred/wallets';
interface MasterTraderProps {
  data: ITrader[];
}

export default function Footer(props: MasterTraderProps) {
  const [subscribeEmail, setSubscribeEmail] = useState<string>('Enter your email address');
  const [topTraderAddress, setTopTraderAddress] = useState<ITrader>();
  const { data } = props;
  // const { account } = useWallet();
  useEffect(() => {
    const filteredData = getFilteredData({
      data: data,
      column: 'gmx_top_traders_analytics.one_month_Pnl_percentage',
      sort: 'desc',
    });
    setTopTraderAddress(filteredData[0]);
  }, [data]);
  const Links = [
    { url: '/copy-trading/leaderboard', text: 'Top Traders', type: 'nextLink' },
    { url: '/copy-trading/leaderboard', text: 'DeFi Strategies (NEW!)', type: 'nextLink' },
    {
      url: `/copy-trading/${topTraderAddress?.['gmx_top_traders_analytics.account']}`,
      text: 'Trader of the Day',
      type: 'nextLink',
    },
    { url: 'https://deqode.gitbook.io/alfred-walk-through', text: 'Resources', type: 'MUILink' },
    { url: 'mailto:mkhan@deqode.com', text: 'Get Help', type: 'MUILink' },
    { url: '/copy-trading/privacy-policy', text: 'Privacy Policy', type: 'nextLink' },
    { url: '/copy-trading/terms-of-use', text: 'Terms of Use', type: 'nextLink' },
  ];
  const SocialLinks = [
    { url: 'https://www.instagram.com/alfred.capital/', icon: <InstagramIcon /> },
    { url: 'https://twitter.com/alfred_capital', icon: <TwitterIcon /> },
    { url: 'https://in.linkedin.com/company/alfredcapital', icon: <LinkedInIcon /> },
  ];
  // const MyAccountLinks = [
  //   { url: `copy-trading/dashboard?mode=analytics&account=${account}`, text: 'Profile' },
  //   { url: `copy-trading/dashboard?mode=trades&account=${account}`, text: 'Settings' },
  // ];

  function handleSubmit() {
    console.log('subscribed');
  }
  return (
    <Grid
      sm={12}
      lg={12}
      sx={{
        backgroundColor: 'background.paper',
        padding: { xs: '80px 20px', sm: '80px 80px', md: '80px 120px' },
        width: '100%',
      }}
    >
      <Stack gap={5} sx={{ flexDirection: 'column', alignItems: 'center' }}>
        <Grid sm={12} lg={12}>
          <Stack
            gap={3}
            sx={{
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Grid xs={12} lg={7}>
              <Stack
                gap={12}
                sx={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Grid xs={6} lg={7}>
                  <Stack sx={{ justifyContent: 'center', flexDirection: 'column' }}>
                    <Typography sx={{ mb: '12px' }} variant="h3">
                      Alfred
                    </Typography>
                    <Typography sx={{ mb: '20px' }} variant="body2" color="text.secondary">
                      The world’s first non-custodial copytrading tool that allows you to copy the
                      moves of top traders in real time.
                    </Typography>
                    <Stack gap={3} sx={{ flexDirection: 'row' }}>
                      {SocialLinks.map(({ url, icon }) => (
                        <MUILink
                          key={url}
                          href={url}
                          rel="noopener"
                          target="_blank"
                          underline="none"
                          color="white"
                          sx={{ mb: '4px' }}
                        >
                          {icon}
                        </MUILink>
                      ))}
                    </Stack>
                  </Stack>
                </Grid>
                <Grid xs={6} lg={5}>
                  <Stack>
                    <Typography sx={{ mb: '20px', fontWeight: 'bold' }} variant="h5">
                      Alfred
                    </Typography>
                    {Links.map(({ url, text, type }) =>
                      type === 'nextLink' ? (
                        <Link key={url} href={url} passHref>
                          <a rel="noopener">
                            <Typography
                              sx={{ mb: '7px', cursor: 'pointer' }}
                              variant="body2"
                              color="text.secondary"
                            >
                              {text}
                            </Typography>
                          </a>
                        </Link>
                      ) : (
                        <MUILink
                          key={url}
                          href={url}
                          rel="noopener"
                          target="_blank"
                          underline="none"
                          color="white"
                          sx={{ mb: '7px' }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            {text}
                          </Typography>
                        </MUILink>
                      )
                    )}
                  </Stack>
                </Grid>
              </Stack>
            </Grid>
            <Grid xs={12} lg={5}>
              <Stack sx={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                {/*NOTE: don't remove */}
                {/* <Grid sm={4} lg={4}>
                  <Stack>
                    <Typography sx={{ mb: '20px', fontWeight: 'bold' }} variant="body1">
                      My Account
                    </Typography>
                    {MyAccountLinks.map(({ url, text }) => (
                      <Button
                        onClick={() => {
                          if (!account) {
                            handleOpenConnectModal();
                          }
                        }}
                        sx={{
                          textAlign: 'left',
                          alignItems: 'flex-start',
                          justifyContent: 'center',
                        }}
                        key={url}
                        // href={url}
                        // passHref
                      >
                        <Typography
                          sx={{ mb: '7px', cursor: 'pointer' }}
                          variant="caption"
                          color="text.secondary"
                        >
                          {text}
                        </Typography>
                      </Button>
                    ))}
                  </Stack>
                </Grid> */}
                <Grid xs={12} lg={10} sx={{ width: '100%' }}>
                  <Stack sx={{ alignItems: 'flex-start' }}>
                    <Typography sx={{ mb: '20px', fontWeight: 'bold' }} variant="h5">
                      Stay in the loop
                    </Typography>
                    <Typography sx={{ mb: '20px' }} variant="body2" color="text.secondary">
                      Join our mailing list to stay in the loop with our newest feature releases,
                      and tips and tricks for navigating the crypto trading world.
                    </Typography>
                    <TextField
                      onFocus={() => {
                        if (subscribeEmail === 'Enter your email address') setSubscribeEmail('');
                      }}
                      onBlur={() => {
                        if (subscribeEmail === '') setSubscribeEmail('Enter your email address');
                      }}
                      sx={{
                        width: '90%',
                        minWidth: '300px',
                      }}
                      id="subscribe"
                      placeholder="Enter your email address "
                      value={subscribeEmail}
                      onChange={(e) => {
                        setSubscribeEmail(e.target.value);
                      }}
                      InputProps={{
                        style: {
                          padding: '0 10px',
                          fontSize: '13px',
                          color: '#000',
                          background: '#fff',
                          borderRadius: '25px',
                          border: 'none !important',
                        },
                        endAdornment: (
                          <Button
                            sx={{
                              width: '200px',
                              borderRadius: '20px',
                              height: '100%',
                              backgroundColor: 'primary.main',
                              color: 'text.primary',
                              fontSize: '12px',
                              fontWeight: 'bold',
                              padding: '8px 10px',
                              '&:hover': {
                                backgroundColor: 'primary.main',
                              },
                            }}
                            onClick={handleSubmit}
                          >
                            Subscribe Now
                          </Button>
                        ),
                      }}
                    />
                  </Stack>
                </Grid>
              </Stack>
            </Grid>
          </Stack>
        </Grid>
        <Divider light sx={{ width: '100%', bgcolor: 'text.secondary' }} />
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="space-between"
          sx={{ height: '80px' }}
        >
          <Typography variant="caption" color="text.secondary">
            The term 'investment machine' and its derivatives are not indicative of the nature of
            the product and are merely used as marketing tagline.
          </Typography>
          <Typography sx={{ mt: '20px' }} variant="body2">
            Copyright © 2023 | Deqode Labs
          </Typography>
        </Stack>
      </Stack>
    </Grid>
  );
}
