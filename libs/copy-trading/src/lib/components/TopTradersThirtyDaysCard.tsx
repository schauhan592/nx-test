import Stack from '@mui/material/Stack';
import GradientTraderCardWithIcon, { GradientCardProps } from './GradientTraderCardWithIcon';
import Typography from '@mui/material/Typography';
import { truncateAddress } from '@sdf/base';
import { AddressAvatar, separateNumberByComma } from '@alfred/alfred-common';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

export default function TopTradersThirtyDaysCard(props: GradientCardProps) {
  const { data } = props;
  const { push } = useRouter();
  const handleCopyRedirect = (address: string) => {
    push(`copy-trading/${address}`);
  };
  return (
    <Stack direction="row" gap={3}>
      <GradientTraderCardWithIcon icon={props.icon} size={props.size} data={data} />
      <Stack
        sx={{
          height: { xs: '100%', sm: '150px', md: '100%' },
          width: '160px',
          justifyContent: 'space-around',
          alignItems: 'space-between',
        }}
      >
        <Typography color="text.secondary" variant="body2">
          P&L 30d
        </Typography>
        <Typography variant="h6" >
          +${separateNumberByComma(data?.['gmx_top_traders_analytics.one_month_pnl_usd'], 2)}
        </Typography>
        <Stack gap={1} direction="row" justifyContent="flex-start" alignItems="center">
          <AddressAvatar
            address={data?.['gmx_top_traders_analytics.account']}
            size="sm"
            variant="rounded"
          />
          {/* <Box
            sx={{
              border: '1px solid #3FB68B',
              borderRadius: '5px',
              padding: '3px 5px',
              alignItems: 'center',
            }}
          >
            <Typography color="#3FB68B" variant="caption">
              +132.77%
            </Typography>
          </Box> */}

          <Typography color="text.primary" variant="body2">
            {truncateAddress(data?.['gmx_top_traders_analytics.account'])}
          </Typography>
        </Stack>
        <Button
          variant="contained"
          onClick={() => {
            handleCopyRedirect(data?.['gmx_top_traders_analytics.account']);
          }}
          sx={{
            color: 'white',
            width: '100%',
            // borderRadius: '20px',
            height: '40px',
            mt: '5px',
            fontSize: '15px',
            fontWeight: 300,
          }}
        >
          Copy
        </Button>
      </Stack>
    </Stack>
  );
}
