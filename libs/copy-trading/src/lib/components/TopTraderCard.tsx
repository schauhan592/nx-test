import { AddressAvatar, formatNumber, separateNumberByComma } from '@alfred/alfred-common';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Link as MUILink, Button, Divider, Typography } from '@mui/material';
import { truncateAddress } from '@sdf/base';
import { ITrader } from '../@types';
// import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function TopTraderCard(props: any) {
  const trader: ITrader = props.data[props.dataIndex];
  const [data, setData] = useState<ITrader>();
  useEffect(() => {
    if (trader) {
      setData(trader);
    }
  }, [trader]);
  const heightWidth = 430;
  // const { push } = useRouter();
  // const handleRedirect = () => {
  //   push(`copy-trading/${data?.['gmx_top_traders_analytics.account']}`);
  // };
  return (
    <Stack>
      <Box
        sx={{
          height: heightWidth,
          width: heightWidth,
          backgroundColor: '#333345',
          backgroundImage: '/assets/background.png',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          borderRadius: '30px',
          p: 3,
          display: 'flex',
          userSelect: 'none',
        }}
      >
        <Stack direction="column" justifyContent="space-between" sx={{ flex: 1 }}>
          <Stack
            direction="row"
            sx={{ backgroundColor: 'transparent', padding: '10px', alignItems: 'center' }}
            spacing={2}
          >
            <AddressAvatar
              address={data?.['gmx_top_traders_analytics.account'] || ''}
              size={'md'}
            />
            <Typography variant="h5">
              {truncateAddress(data?.['gmx_top_traders_analytics.account'] || '')}
            </Typography>
          </Stack>
          <Stack direction="column" spacing={1} alignItems="center" justifyContent="center">
            <Typography variant="body1">PNL 30d</Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#4BD2A1' }}>
              +$
              {separateNumberByComma(
                data?.['gmx_top_traders_analytics.one_month_pnl_usd'] || '',
                2
              )}
            </Typography>
          </Stack>
          <Divider />
          <Stack direction="column" spacing={2}>
            <Stack
              direction="row"
              sx={{
                padding: '20px 30px',
                borderRadius: '8px',
              }}
              spacing={5}
              justifyContent="space-between"
            >
              <Stack direction="column" alignItems="center" justifyContent="center">
                <Typography variant="caption">ROI 30d</Typography>
                <Typography variant="h6" color="#4BD2A1">
                  +{Number(data?.['gmx_top_traders_analytics.one_month_Pnl_percentage']).toFixed(2)}
                  %
                </Typography>
              </Stack>
              <Divider orientation="vertical" />
              <Stack direction="column" alignItems="center" justifyContent="center">
                <Typography variant="caption">Winning Rate</Typography>
                <Typography variant="h6" color="primary.main">
                  +{Number(data?.['gmx_top_traders_analytics.winning_percentage']).toFixed(2)}%
                </Typography>
              </Stack>
            </Stack>
            <MUILink
              href={`${process.env['NEXT_PUBLIC_APP_BASE_URL']}/copy-trading/${data?.['gmx_top_traders_analytics.account']}`}
              rel="noopener"
              target="_blank"
              underline="none"
            >
              <Button
                variant="contained"
                sx={{
                  width: '100%',
                  borderRadius: '30px',
                  bgcolor: 'white',
                  color: '#fff',
                  padding: '30px 0',
                  background: '#5973FE',
                  boxShadow:
                    '0px 0px 0px 24px rgba(35, 46, 101, 0.12), 0px 0px 0px 16px rgba(35, 46, 101, 0.25), 0px 0px 0px 8px rgba(35, 46, 101, 0.50), 6px -6px 8px 0px rgba(0, 0, 0, 0.25) inset, -2px 6px 8px 0px rgba(241, 234, 234, 0.15) inset',
                  '&:hover': {
                    boxShadow:
                      '0px 0px 0px 24px rgba(35, 46, 101, 0.12), 0px 0px 0px 16px rgba(35, 46, 101, 0.25), 0px 0px 0px 8px rgba(35, 46, 101, 0.50), 6px -6px 8px 0px rgba(0, 0, 0, 0.25) inset, -2px 6px 8px 0px rgba(241, 234, 234, 0.15) inset',
                  },
                  fontSize: '18px',
                  fontWeight: '600',
                }}
              >
                COPY THIS TRADER
              </Button>
            </MUILink>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
