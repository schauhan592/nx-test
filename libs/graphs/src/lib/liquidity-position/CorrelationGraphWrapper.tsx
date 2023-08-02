import { CorrelationDataPoints, Pool } from '@alfred/alfred-common';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect, useRef, useState } from 'react';
import D3CorrelationChart from './D3CorrelationGraph';

interface CorrelationGraphProps {
  data:
    | {
        points: CorrelationDataPoints[];
        xpery: string;
      }
    | undefined;
  height?: number;
  width?: number;
  position: Pool;
  rangeValue: number[];
  isFullRange: boolean;
}

export default function CorrelationGraph({
  data,
  height = 294,
  width = 500,
  position,
  rangeValue,
  isFullRange,
}: CorrelationGraphProps) {
  const refElement = useRef<HTMLDivElement>(null);
  const [correlationChart, setCorrelationChart] = useState<D3CorrelationChart | null>(null);

  useEffect(() => {
    if (correlationChart !== null) correlationChart?.destroy();
    initialiseGraph();

    return () => {
      correlationChart?.destroy();
    };
  }, [data]);

  useEffect(() => {
    if (correlationChart) {
      correlationChart.updateMinMaxPriceRange(rangeValue[0], rangeValue[1], isFullRange);
    }
  }, [rangeValue, isFullRange]);

  function initialiseGraph() {
    setCorrelationChart(
      new D3CorrelationChart(refElement.current, {
        width,
        height,
        data: data?.points || [],
        minRange: rangeValue[0],
        maxRange: rangeValue[1],
        mostActivePrice: Number(position?.tickData?.currentPrice),
      })
    );
  }

  return (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography variant="subtitle1">
          {`${position?.token0?.symbol}/${position?.token1?.symbol}`} Correlation
        </Typography>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          (1 Month)
        </Typography>
      </Stack>
      <div ref={refElement}></div>
    </Stack>
  );
}
