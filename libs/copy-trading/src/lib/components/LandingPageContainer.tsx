import Stack from '@mui/material/Stack';
import IntroducingBar from './Introducingbar';
import TopTraders from './TopTraders';
import Grid from '@mui/material/Grid';
import MasterTrader from './MasterTrader';
import TopTradersSevenDays from './TopTradersSevenDays';
import DiscoverTraders from './DiscoverTraders';
import Footer from './Footer';
import useGetAllTradersRanking from '../hooks/useGetAllTradersRanking';

export default function CopyTradingLandingPageContainer() {
  const { data } = useGetAllTradersRanking();
  return (
    <Grid container sx={{ alignItems: 'center !important' }}>
      <Stack
        direction="column"
        gap={3}
        sx={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}
      >
        <TopTraders data={data || []} />
        <IntroducingBar />
        <TopTradersSevenDays data={data || []} />
        <MasterTrader data={data || []} />
        <DiscoverTraders data={data || []} />
        <Footer data={data || []} />
      </Stack>
    </Grid>
  );
}
