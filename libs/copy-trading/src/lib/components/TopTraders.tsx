import { Link as MUILink, Box, Button, Grid, Stack, Typography } from '@mui/material';
import StackedSlider from './StackedSlider';
import { ITrader } from '../@types';
// import { useRouter } from 'next/router';
import Image from 'next/image';
interface TopTradersProps {
  data: ITrader[];
}
export default function TopTraders(props: TopTradersProps) {
  const { data } = props;
  // const { push } = useRouter();
  // const handleRedirect = () => {
  //   push('copy-trading/leaderboard');
  // };
  return (
    <Grid
      container
      item
      sx={{
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      <Grid
        xs={11}
        sm={8}
        md={7}
        lg={5}
        xl={5}
        sx={{
          width: { xs: '100%' },
          mb: { xs: '-40px', md: '0px' },
          padding: { xs: '20px 0 0 20px', md: '50px 0 50px 50px', lg: '80px 0 80px 120px' },
        }}
      >
        <Stack direction="column" spacing={4}>
          <Stack>
            <Typography variant="h2" sx={{ fontWeight: 100 }}>
              ONE CLICK <br />
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 800 }}>
              PRO TRADING.
            </Typography>
          </Stack>
          <Typography sx={{ fontSize: '20px' }} color="text.secondary" variant="body1">
            Alfred is a decentralized investment machine that allows you to follow the world’s best
            traders, and copy their trades with a single click. <br />
          </Typography>
          <Box
            sx={{
              position: 'relative',
              zIndex: '-1',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '0px',
              top: '97px',
              left: { xs: '-180px', sm: '-230px' },
              objectFit: 'contain',
              transformOrigin: 'center center',
            }}
          >
            <Image
              src={'/assets/Dot.png'}
              height={130}
              width={170}
              alt="Dots"
              style={{ backgroundSize: 'fit' }}
            />
          </Box>
          <MUILink
            href={`${process.env['NEXT_PUBLIC_APP_BASE_URL']}`}
            rel="noopener"
            target="_blank"
            underline="none"
            color="text.primary"
          >
            <Button
              variant="contained"
              sx={{
                fontSize: { xs: '14px', lg: '18px' },
                // borderRadius: '30px',
                fontWeight: '600',
                padding: '20px 0',
                width: { xs: '80%', md: '70%', lg: '60%' },
              }}
              size="large"
            >
              EXPLORE TOP TRADERS
            </Button>
          </MUILink>
          <Stack direction="row" spacing={5}>
            <Stack direction="column">
              <Typography variant="h3" fontWeight="bold">
                2K+
              </Typography>
              <Typography variant="body1">Pro Traders</Typography>
            </Stack>
            <Stack direction="column">
              <Typography variant="h3" fontWeight="bold" color="#4BD2A1">
                +55%
              </Typography>
              <Typography variant="body1">Avg Weekly Profit</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Grid>
      <Grid
        item
        xs={12}
        sm={10}
        md={10}
        lg={7}
        sx={{
          // border: '1px solid red',
          justifyContent: 'center',
          height: { lg: '100%' },
          padding: { xs: '0 40px 0 0', md: '80px  0' },
          overflowX: 'hidden',
        }}
      >
        <StackedSlider data={data} />
      </Grid>
    </Grid>
  );
}
