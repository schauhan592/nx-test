import Stack from '@mui/material/Stack';
import GradientTraderCardWithIcon from './GradientTraderCardWithIcon';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { ITrader } from '../@types';
import getFilteredData from '../hooks/useGetFilter';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
interface MasterTraderProps {
  data: ITrader[];
}
export default function MasterTrader(props: MasterTraderProps) {
  const { data } = props;
  const [filteredTrader, setFilteredTrader] = useState<ITrader[]>([]);

  useEffect(() => {
    setFilteredTrader(
      getFilteredData({
        data: data,
        column: 'gmx_top_traders_analytics.one_month_Pnl_percentage',
        sort: 'desc',
      })?.slice(0, 3)
    );
  }, [data]);

  const theme = useTheme();
  const { push } = useRouter();
  const isSmallerThanLg = useMediaQuery(theme.breakpoints.down('lg'));
  const handleRedirect = () => {
    push('copy-trading/leaderboard');
  };

  return (
    <Grid container>
      <Stack
        sx={{
          height: { xs: '900px', lg: '700px' },
          width: '100%',
          justifyContent: { xs: 'center', lg: 'space-evenly' },
          alignItems: 'center',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        {filteredTrader?.length >= 3 && (
          <Stack
            direction="row"
            sx={{
              height: { xs: '400px', sm: '700px', lg: '600px' },
              minWidth: '600px',
              justifyContent: 'space-around',
              alignItems: 'center',
              transform: { xs: 'scale(0.62)', sm: 'scale(.8)', md: 'scale(.9)', lg: 'scale(1)' },
            }}
          >
            <Stack
              sx={{
                height: '520px',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}
            >
              <GradientTraderCardWithIcon data={filteredTrader[0]} icon={true} size={'large'} />
              <GradientTraderCardWithIcon data={filteredTrader[1]} icon={true} size={'small'} />
            </Stack>
            <GradientTraderCardWithIcon data={filteredTrader[2]} icon={true} size={'medium'} />
          </Stack>
        )}
        <Stack
          sx={{
            width: { xs: '92%', sm: '80%', md: '60%', lg: '40%' },
            height: '70%',
            justifyContent: 'space-evenly',
            alignItems: isSmallerThanLg ? 'center' : 'flex-start',
            textAlign: isSmallerThanLg ? 'center' : 'left',
          }}
        >
          <Typography variant="h2" sx={{ fontWeight: 100 }}>
            WORLD'S BIGGEST TRADERS WORK FOR YOU,
            <Box sx={{ fontWeight: 700 }} display="inline">
              {' '}
              FOR FREE.
            </Box>
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: '18px' }}>
            Thousands of traders, each with a unique risk appetite, profit-making strategies and
            on-chain track record, are available for you to copy. You may pick one or two, or build
            your own master trading team of 50+ traders to “work” for you - simultaneously.
          </Typography>
          <Button
            sx={{
              // borderRadius: '30px',
              width: { xs: '300px', sm: '420px' },
              height: '60px',
              fontSize: { xs: '12px', sm: '15px', md: '20px' },
              fontWeight: '700',
              textTransform: 'none',
            }}
            onClick={handleRedirect}
            variant="contained"
          >
            Try Copying a Master Trader Now
          </Button>
        </Stack>
      </Stack>
    </Grid>
  );
}
