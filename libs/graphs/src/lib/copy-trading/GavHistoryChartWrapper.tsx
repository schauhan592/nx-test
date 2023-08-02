import { CircularProgress, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { NoDataFound } from '@sdf/base';
import { useEffect, useState } from 'react';
import D3GavHistoryChart from './D3GavChart';
import { unix } from 'moment';

interface GavHistoryChartWrapperProps {
  data: { x: number; y: number }[];
  loading: boolean;
  height: number;
  width: number;
  gav?: number;
}

export default function GavHistoryChartWrapper(props: GavHistoryChartWrapperProps) {
  const { gav, data, loading } = props ?? {};
  const [chart, setChart] = useState<D3GavHistoryChart | null>(null);

  const initialiseGraph = () => {
    setChart(new D3GavHistoryChart({ ...props }));
  };

  useEffect(() => {
    initialiseGraph();
    return () => {
      if (chart && chart?.destroy) {
        chart?.destroy();
        setChart(null);
      }
    };
  }, [props]);
  return (
    <Stack spacing={4} direction="column">
      <Stack direction="row" spacing={0} alignItems="baseline">
        <Typography variant="h4">Gross Asset Value{gav !== 0 && gav ? ':' : ''}</Typography>
        <Typography variant="h4" sx={{ ml: 2 }}>
          {gav?.toFixed(2)}
        </Typography>
        {gav !== 0 && gav && (
          <Typography variant="body1" sx={{ ml: 0.3 }}>
            USDC
          </Typography>
        )}
      </Stack>

      {props?.loading ? (
        <CircularProgress />
      ) : props?.data && props?.data.length !== 0 ? (
        <div style={{ paddingLeft: '24px' }} id={'gav-chart'}></div>
      ) : (
        <NoDataFound />
      )}
      {data.length != 0 && !loading && (
        <Stack direction="row" justifyContent="center">
          <Typography variant="body1" sx={{ ml: 10, mt: -9, color: 'text.secondary' }}>
            {' '}
            Last updated: {unix(data[data.length - 1]?.x / 1000).fromNow()}{' '}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}
