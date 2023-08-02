import Stack from '@mui/material/Stack';
import { AddressAvatar, separateNumberByComma } from '@alfred/alfred-common';
import { truncateAddress } from '@sdf/base';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { ITrader } from '../@types';
import Link from 'next/link';

export default function TopTradersSevenDaysCard(props: { index: number; data: ITrader }) {
  const { data } = props;
  return (
    <>
      <Stack direction="row" gap={3} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6">{props.index}</Typography>
        <Link href={`copy-trading/${data?.['gmx_top_traders_analytics.account']}`}>
          <Stack
            gap={2}
            direction="row"
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              cursor: 'pointer',
            }}
          >
            <Stack direction="row" gap={2}>
              <AddressAvatar
                address={data?.['gmx_top_traders_analytics.account']}
                size="lg"
                variant="rounded"
              />
              <Stack direction="column" gap={1}>
                <Typography sx={{ fontSize: '18px !important' }} variant="h6">
                  +$
                  {separateNumberByComma(data?.['gmx_top_traders_analytics.one_month_pnl_usd'], 2)}
                </Typography>
                <Typography color="text.secondary" variant="subtitle2">
                  {truncateAddress(data?.['gmx_top_traders_analytics.account'])}
                </Typography>
              </Stack>
            </Stack>
            <Typography variant="h6" color="#3FB68B">
              +{Number(data?.['gmx_top_traders_analytics.one_month_Pnl_percentage']).toFixed(2)}%
            </Typography>
          </Stack>
        </Link>
      </Stack>
      {props.index !== 5 && <Divider />}
    </>
  );
}
