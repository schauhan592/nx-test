import { AddressAvatar, makeGradient, separateNumberByComma } from '@alfred/alfred-common';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { truncateAddress } from '@sdf/base';
import { ITrader } from '../@types';

export interface GradientCardProps {
  icon: boolean;
  size: string;
  data: ITrader;
}

export default function GradientTraderCardWithIcon(props: GradientCardProps) {
  const { data } = props;
  let heightWidth: number;
  const width = 380;
  switch (props.size) {
    case 'extraLarge':
      heightWidth = 410;
      break;
    case 'extraSmall':
      heightWidth = 145;
      break;
    case 'large':
      heightWidth = 280;
      break;
    case 'medium':
      heightWidth = 240;
      break;
    default:
      heightWidth = 200;
      break;
  }
  return (
    <Stack>
      <Box
        sx={{
          height: heightWidth,
          width: props.size === 'extraLarge' ? width : heightWidth,
          backgroundImage: `url(${makeGradient(data?.['gmx_top_traders_analytics.account'])})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          borderRadius: props.size === 'extraLarge' ? '20px' : '10px',
          p: heightWidth / 120,
          display: 'flex',
          alignItems: 'space-between',
          position: 'relative',
          justifyContent: props.icon ? 'space-between' : 'flex-end',
          flexDirection: 'column',
        }}
      >
        {props.icon && (
          <Box
            sx={{
              borderRadius: '10px',
              width: '100%',
              height: `${heightWidth / 3}px`,
              padding: heightWidth / 120,
              backdropFilter: 'blur(1px)',
              backgroundColor: 'rgba(0,0,0, 0.1)',
            }}
          >
            <Typography
              sx={{
                fontSize: `${heightWidth / 19}px !important`,
              }}
              variant="body1"
            >
              PNL 30d
            </Typography>
            <Typography
              sx={{
                fontSize: `${heightWidth / 10}px !important`,
              }}
              variant="h3"
            >
              ${separateNumberByComma(data?.['gmx_top_traders_analytics.one_month_pnl_usd'], 2)}
            </Typography>
          </Box>
        )}
        {props.size === 'extraLarge' && (
          <Stack gap={1} direction="row" sx={{ alignItems: 'center', marginBottom: '200px' }}>
            <AddressAvatar
              address={data?.['gmx_top_traders_analytics.account']}
              size="md"
              variant="rounded"
            />
            <Typography color="text.primary" variant="body1">
              {truncateAddress(data?.['gmx_top_traders_analytics.account'])}
            </Typography>
          </Stack>
        )}
        <Box
          sx={{
            borderRadius: props.size === 'extraLarge' ? '10px ' : '5px',
            width: props.icon ? '60%' : '100%',
            height: props.icon ? `${heightWidth / 6.5}px` : 'initial',
            padding: props.size === 'extraLarge' ? '20px ' : '10px',
            backdropFilter: 'blur(1px)',
            backgroundColor: 'rgba(0,0,0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          {props.icon ? (
            <Typography
              color="text.primary"
              variant="body1"
              sx={{ fontSize: `${heightWidth / 18}px !important` }}
            >
              {truncateAddress(data?.['gmx_top_traders_analytics.account'])}
            </Typography>
          ) : (
            <>
              <Typography
                sx={{
                  fontSize: props.size === 'extraLarge' ? '15px !important' : '10px !important',
                }}
                variant="body1"
              >
                ROI 30d
              </Typography>
              <Typography
                sx={{
                  fontSize: props.size === 'extraLarge' ? '35px !important' : '15px !important',
                }}
                variant="h3"
              >
                +{Number(data?.['gmx_top_traders_analytics.one_month_Pnl_percentage']).toFixed(2)}%
              </Typography>
            </>
          )}
        </Box>
        {props.icon && (
          <Box
            sx={{
              position: 'absolute',
              bottom: '-15px',
              right: '-15px',
              border: '3px solid #2D2D3D',
              borderRadius: '50%',
            }}
          >
            <AddressAvatar
              address={data?.['gmx_top_traders_analytics.account']}
              size="lg"
              variant="rounded"
            />
          </Box>
        )}
      </Box>
    </Stack>
  );
}
