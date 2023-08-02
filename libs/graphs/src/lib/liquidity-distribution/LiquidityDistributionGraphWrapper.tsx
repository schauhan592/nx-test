import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect, useRef } from 'react';
import { LiquidityDistributionData } from '../utils/generateChartData';
import LiquidityDistribution from './LiquidityDistributionGraph';

interface LiquidityDistributionGraphProps {
  height: number;
  width: number;
}

export default function LiquidityDistributionGraph({
  height,
  width,
}: LiquidityDistributionGraphProps) {
  const refElement = useRef<HTMLDivElement>(null);
  useEffect(() => {
    new LiquidityDistribution(refElement.current, {
      data: LiquidityDistributionData,
      height,
      width,
    });
  }, []);

  return (
    <Stack spacing={2}>
      <Box>
        <Typography variant="subtitle1">Liquidity Distribution</Typography>
      </Box>
      <div ref={refElement}></div>
    </Stack>
  );
}
