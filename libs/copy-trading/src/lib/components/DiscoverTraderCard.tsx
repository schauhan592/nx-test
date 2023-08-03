import { separateNumberByComma, makeGradient, formatNumber } from '@alfred/alfred-common';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { truncateAddress } from '@sdf/base';
import { ITrader } from '../@types';
import { Link } from '@mui/material';

interface DiscoverTraderCardProps {
  data: ITrader;
  selectedChip: string;
}
export default function DiscoverTraderCard(props: DiscoverTraderCardProps) {
  const { selectedChip, data } = props;
  let filteredData;
  switch (selectedChip) {
    case 'Highest PNL':
      filteredData = {
        title: 'PNL',
        data: `${formatNumber(Number(data?.['gmx_top_traders_analytics.one_month_pnl_usd']))} USD`,
      };
      break;
    case 'Highest ROI':
      filteredData = {
        title: 'ROI',
        data: `${Number(data?.['gmx_top_traders_analytics.one_month_Pnl_percentage']).toFixed(
          2
        )} %`,
      };
      break;
    case 'Highest Winning Rate':
      filteredData = {
        title: 'WINNING RATE',
        data: `${Number(data?.['gmx_top_traders_analytics.winning_percentage']).toFixed(2) ?? 0} %`,
      };
      break;

    default:
      filteredData = {
        title: 'VOLUME',
        data: `${formatNumber(
          Number(data?.['gmx_top_traders_analytics.one_month_volume_usd'])
        )} USD`,
      };
      break;
  }

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        borderRadius: 2,
        height: 350,
        width: 270,
        p: 1,
      }}
    >
      <Stack direction="column" spacing={1}>
        <Box
          sx={{
            height: 200,
            width: 255,
            backgroundImage: `url(${makeGradient(data?.['gmx_top_traders_analytics.account'])})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            borderRadius: '10px',
            padding: 1.5,
          }}
        >
          <Box
            sx={{
              borderRadius: '10px',
              width: '100%',
              height: `70px`,
              padding: 1.5,
              backdropFilter: 'blur(1px)',
              backgroundColor: 'rgba(0,0,0, 0.1)',
            }}
          >
            <Typography
              sx={{
                fontSize: `12px !important`,
              }}
              variant="body1"
            >
              PNL 30d
            </Typography>
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: `24px !important`,
              }}
              variant="h3"
            >
              ${separateNumberByComma(data?.['gmx_top_traders_analytics.one_month_pnl_usd'], 2)}
            </Typography>
          </Box>
        </Box>
        <Stack direction="column" spacing={1} padding="7px">
          <Typography variant="caption" sx={{ color: 'text.secondary' }} fontWeight="bold">
            {truncateAddress(data?.['gmx_top_traders_analytics.account'])}
          </Typography>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2">{filteredData.title}</Typography>
            <Typography
              color="text.primary"
              variant="body2"
              sx={{
                fontWeight: 'bold',
                color: '#4BD2A1',
              }}
            >
              {filteredData.data ?? 0}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="center" padding="7px">
          <Link
            href={`${process.env['NEXT_PUBLIC_APP_BASE_URL']}/copy-trading/${data?.['gmx_top_traders_analytics.account']}`}
            target="_blank"
          >
            <Button
              fullWidth
              variant="outlined"
              size="small"
              style={{ height: '36px', fontSize: '12px', color: 'white' }}
            >
              View Trader Profile
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
}
