import { AddressAvatar, formatNumber, separateNumberByComma } from '@alfred/alfred-common';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Button, Divider, Typography } from '@mui/material';
import { truncateAddress } from '@sdf/base';
import { ITrader } from '../@types';
import { useRouter } from 'next/router';
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
  const { push } = useRouter();
  const handleRedirect = () => {
    push(`copy-trading/${data?.['gmx_top_traders_analytics.account']}`);
  };
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
            <Typography variant="body1">P&L 30d</Typography>
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
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
                <Typography variant="caption">30d P&L</Typography>
                <Typography variant="h6">
                  +USD {formatNumber(Number(data?.['gmx_top_traders_analytics.one_month_pnl_usd']))}
                </Typography>
              </Stack>
              <Divider orientation="vertical" />
              <Stack direction="column" alignItems="center" justifyContent="center">
                <Typography variant="caption">30d Roi</Typography>
                <Typography variant="h6" color="#4BD2A1">
                  +{Number(data?.['gmx_top_traders_analytics.one_month_Pnl_percentage']).toFixed(2)}
                  %
                </Typography>
              </Stack>
            </Stack>
            <Button
              variant="contained"
              sx={{
                borderRadius: '30px',
                bgcolor: 'white',
                color: 'blue',
                padding: '30px 0',
                '&:hover': { bgcolor: 'white' },
                fontSize: '18px',
                fontWeight: '600',
              }}
              onClick={handleRedirect}
            >
              COPY THIS TRADER
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
