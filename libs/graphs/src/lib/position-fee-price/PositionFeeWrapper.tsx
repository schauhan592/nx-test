import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect, useRef } from 'react';
import { LiquidityDistributionData } from '../utils/generateChartData';
import PositionFeeGraph from './PositionFee';

interface PositionFeeGraphWrapperProps {
  height: number;
  width: number;
}

export default function PositionFeeGraphWrapper({ height, width }: PositionFeeGraphWrapperProps) {
  const refElement = useRef<HTMLDivElement>(null);
  useEffect(() => {
    new PositionFeeGraph(refElement.current, { data: LiquidityDistributionData, height, width });
  }, []);

  return (
    <Stack spacing={2}>
      <Box>
        <Typography variant="subtitle1">Position Fee</Typography>
      </Box>
      <div ref={refElement}></div>
    </Stack>
  );
}
