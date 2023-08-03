import Stack from '@mui/material/Stack';
import GradientTraderCardWithIcon from './GradientTraderCardWithIcon';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import TopTradersThirtyDaysCard from './TopTradersThirtyDaysCard';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { formatNumber } from '@alfred/alfred-common';
import TopTradersSevenDaysCard from './TopTradersSevenDaysCard';
import { Link as MUILink, Grid, useMediaQuery, useTheme } from '@mui/material';
import { ITrader } from '../@types';
import getFilteredData from '../hooks/useGetFilter';
import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
interface TopTraderSevenDaysProps {
  data: ITrader[];
}
export default function TopTradersSevenDays(props: TopTraderSevenDaysProps) {
  const { data } = props;
  const [topFourfilteredTrader, setTopFourfilteredTrader] = useState<ITrader[]>([]);
  const [topSevenfilteredTrader, setTopSevenfilteredTrader] = useState<ITrader[]>([]);
  // const { push } = useRouter();
  useEffect(() => {
    const filteredData = getFilteredData({
      data: data,
      column: 'gmx_top_traders_analytics.one_month_Pnl_percentage',
      sort: 'desc',
    });
    setTopSevenfilteredTrader(filteredData?.slice(0, 5));
    setTopFourfilteredTrader(filteredData?.slice(6, 10));
  }, [data]);
  const theme = useTheme();
  const isFullHd = useMediaQuery('(min-width:1280px)');
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));
  // const handleCopyRedirect = (address: string) => {
  //   push(`copy-trading/${address}`);
  // };
  return (
    <Grid container>
      <Stack
        direction="row"
        width="100%"
        gap={{ xs: 7, lg: 4, xl: 7 }}
        sx={{
          flexDirection: isLg ? 'row' : 'column',
          padding: isFullHd ? '0 120px ' : { xs: '0 120px', lg: '0 50px', xl: '0 120px' },
          alignItems: { xs: 'center', xl: 'space-between' },
        }}
      >
        <Stack direction="row" gap={4} sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
          {topFourfilteredTrader.length >= 3 && (
            <Stack
              direction="column"
              gap={5}
              sx={{
                height: { xs: '550px', sm: 'inherit' },
                transform: { xs: 'scale(0.8)', sm: 'scale(.9)', md: 'scale(1)' },
              }}
            >
              <GradientTraderCardWithIcon
                icon={false}
                size={'extraLarge'}
                data={topFourfilteredTrader[0]}
              />
              <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  {/* <NextLink
                  href={`/copy-trading/${topFourfilteredTrader[0]?.['gmx_top_traders_analytics.account']},`}
                  passHref
                >
                  <a rel="noopener">
                    <Box sx={{ cursor: 'pointer' }}>
                      <AddressAvatar
                        address={topFourfilteredTrader[0]?.['gmx_top_traders_analytics.account']}
                        size="lg"
                        variant="rounded"
                      />
                    </Box>
                  </a>
                </NextLink> */}
                  <MUILink
                    href={`${process.env['NEXT_PUBLIC_APP_BASE_URL']}/copy-trading/${topFourfilteredTrader[0]?.['gmx_top_traders_analytics.account']}`}
                    rel="noopener"
                    target="_blank"
                    underline="none"
                  >
                    <Box sx={{ cursor: 'pointer' }}>
                      <Typography color="text.secondary" variant="body2">
                        P&L 30d
                      </Typography>
                      <Typography variant="h5" color="#4BD2A1">
                        +$
                        {formatNumber(
                          Number(
                            topFourfilteredTrader[0]?.[
                              'gmx_top_traders_analytics.one_month_volume_usd'
                            ]
                          )
                        )}
                      </Typography>
                    </Box>
                  </MUILink>
                </Stack>
                <Stack sx={{ marginRight: '20px' }}>
                  <MUILink
                    href={`${process.env['NEXT_PUBLIC_APP_BASE_URL']}/copy-trading/${topFourfilteredTrader[0]?.['gmx_top_traders_analytics.account']}`}
                    rel="noopener"
                    target="_blank"
                    underline="none"
                    color="text.primary"
                  >
                    <Button
                      variant="contained"
                      sx={{
                        color: 'white',
                        width: '150px',
                        // borderRadius: '20px',
                        height: '40px',
                        mr: '-20px',
                        fontSize: '15px',
                        fontWeight: 300,
                      }}
                    >
                      Copy
                    </Button>
                  </MUILink>
                </Stack>
              </Stack>
            </Stack>
          )}
          <Stack
            direction="column"
            gap={4}
            sx={{
              height: { xs: '450px', sm: 'inherit' },
              marginTop: { xs: '-100px', sm: '0px' },
              transform: { xs: 'scale(0.8)', sm: 'scale(.9)', md: 'scale(1)' },
            }}
          >
            {topFourfilteredTrader.slice(1, 4).map((trader) => (
              <TopTradersThirtyDaysCard
                key={trader?.['gmx_top_traders_analytics.account']}
                icon={false}
                size={'extraSmall'}
                data={trader}
              />
            ))}
          </Stack>
        </Stack>
        {isLg && (
          <Divider
            orientation="vertical"
            color="#2D2D3D"
            sx={{ height: '525px', width: '.2px', mt: '5px', opacity: '.5' }}
          />
        )}
        <Stack
          sx={{
            height: { xs: '40%', lg: '90%' },
            width: { xs: '100vw', sm: '500px', md: '800px', lg: '420px' },
            transform: { xs: 'scale(0.85)', sm: 'scale(1)' },
            marginBottom: { xs: '-80px', sm: '20px' },
          }}
        >
          <Typography variant="h5">TOP TRADERS OVER</Typography>
          <Typography color="text.secondary" variant="body1">
            Last 7 days
          </Typography>
          <Stack
            sx={{
              height: isLg ? '100%' : '550px',
              justifyContent: 'space-evenly',
              alignItems: 'space-around',
              mb: { xs: '20px', md: '-80px' },
            }}
          >
            {topSevenfilteredTrader.map((trader, index) => (
              <TopTradersSevenDaysCard
                key={trader?.['gmx_top_traders_analytics.account']}
                data={trader}
                index={index + 1}
              />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Grid>
  );
}
