import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DiscoverTraderCard from './DiscoverTraderCard';
import { Button, Chip, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { ITrader } from '../@types';
import getFilteredData from '../hooks/useGetFilter';
import { useRouter } from 'next/router';

const StyledFilledChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.secondary,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

interface DiscoverTraderProps {
  data: ITrader[];
}
const map = {
  'Highest PNL': 'gmx_top_traders_analytics.one_month_pnl_usd',
  'Highest ROI': 'gmx_top_traders_analytics.one_month_Pnl_percentage',
  'Highest Winning Rate': 'gmx_top_traders_analytics.winning_percentage',
  'Highest Volume': 'gmx_top_traders_analytics.one_month_volume_usd',
};
export default function DiscoverTraders(props: DiscoverTraderProps) {
  const { data } = props;
  const [filteredData, setFilteredData] = useState<ITrader[] | null>(null);
  const { push } = useRouter();
  const [selectedChip, setSelectedChip] = useState<
    'Highest PNL' | 'Highest ROI' | 'Highest Winning Rate' | 'Highest Volume'
  >('Highest PNL');
  useEffect(() => {
    const filteredFourTrader = getFilteredData({
      data: data,
      column: map[selectedChip ?? 'Highest PNL'],
      sort: 'desc',
    })?.slice(0, 4);
    setFilteredData(filteredFourTrader);
  }, [selectedChip, data]);

  const handleChipClick = (
    label: 'Highest PNL' | 'Highest ROI' | 'Highest Winning Rate' | 'Highest Volume'
  ) => {
    setSelectedChip(label);
  };
  const handleMoreTrader = () => {
    push('copy-trading/leaderboard');
  };
  return (
    <Stack
      sx={{
        padding: { xs: '20px 20px', sm: '20px 80px', lg: '20px 30px', xl: '20px 100px' },
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        // border: '1px solid white',
      }}
    >
      <Grid container spacing={3} sx={{ justifyContent: 'center', width: '100%' }}>
        <Grid item sm={12} md={12} lg={12}>
          <Typography variant="h2" fontWeight="100" mb={1}>
            DISCOVER MORE
          </Typography>
          <Typography variant="h2" fontWeight="700" mb={1}>
            PRO TRADERS
          </Typography>
        </Grid>
        <Grid item sm={12} md={12} lg={12}>
          <Stack gap={1} direction="row" sx={{ flexWrap: 'wrap', mb: '10px' }}>
            <StyledFilledChip
              label="Highest PNL"
              variant={selectedChip === 'Highest PNL' ? 'filled' : 'outlined'}
              onClick={() => handleChipClick('Highest PNL')}
              sx={
                selectedChip === 'Highest PNL'
                  ? { backgroundColor: 'primary.main', color: 'white' }
                  : {}
              }
            />
            <StyledFilledChip
              label="Highest ROI"
              variant={selectedChip === 'Highest ROI' ? 'filled' : 'outlined'}
              onClick={() => handleChipClick('Highest ROI')}
              sx={
                selectedChip === 'Highest ROI'
                  ? { backgroundColor: 'primary.main', color: 'white' }
                  : {}
              }
            />
            <StyledFilledChip
              label="Highest Volume"
              variant={selectedChip === 'Highest Volume' ? 'filled' : 'outlined'}
              onClick={() => handleChipClick('Highest Volume')}
              sx={
                selectedChip === 'Highest Volume'
                  ? { backgroundColor: 'primary.main', color: 'white' }
                  : {}
              }
            />
            <StyledFilledChip
              label="Highest Winning Rate"
              variant={selectedChip === 'Highest Winning Rate' ? 'filled' : 'outlined'}
              onClick={() => handleChipClick('Highest Winning Rate')}
              sx={
                selectedChip === 'Highest Winning Rate'
                  ? { backgroundColor: 'primary.main', color: 'white' }
                  : {}
              }
            />
          </Stack>
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{
            width: '100%',
            // border: '1px solid red',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: { xs: 'center', sm: 'space-between' },
          }}
          sm={12}
          md={12}
          lg={12}
        >
          {filteredData?.map((trader) => (
            <Grid key={`filter-${trader?.['gmx_top_traders_analytics.account']}`} item>
              <DiscoverTraderCard data={trader} selectedChip={selectedChip} />
            </Grid>
          ))}
        </Grid>
        <Grid item sm={12} md={12} lg={12} mt={3}>
          <Stack alignItems="center">
            <Button
              variant="outlined"
              size="large"
              sx={{ color: 'white', mr: '20px' }}
              onClick={handleMoreTrader}
            >
              More Traders
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
