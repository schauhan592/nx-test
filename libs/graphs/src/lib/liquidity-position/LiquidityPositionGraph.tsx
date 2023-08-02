import { AssetsDistributionDetails, Pool } from '@alfred/alfred-common';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect, useRef, useState } from 'react';
import getGraphDomain from '../utils/getGraphDomain';
import D3LiquidityHistogram from './CustomGraph';

interface LiquidityPositionGraphProps {
  pool: Pool;
  assetsDistribution?: AssetsDistributionDetails;
  rangeValue: number[];
  height: number;
  width: number;
  isFullRange?: boolean;
  positionLowerUpperTicks: number[];
}

export default function LiquidityPositionGraph({
  pool,
  rangeValue,
  height,
  width,
  assetsDistribution,
  isFullRange = false,
  positionLowerUpperTicks,
}: LiquidityPositionGraphProps) {
  const [positionChart, setPositionChart] = useState<D3LiquidityHistogram | null>(null);
  const refElement = useRef<HTMLDivElement>(null);

  const [lowestTick, highestTick] = getGraphDomain(
    [Number(pool?.tickData?.lowestTick), Number(pool?.tickData?.highestTick)],
    Number(pool?.tickData?.currentTick)
  );
  // const zoomMag = (highestTick - lowestTick) / ZOOM_RATIO;

  useEffect(() => {
    // TODO:
    if (positionChart !== null) positionChart?.destroy();
    initialiseGraph();

    return () => {
      positionChart?.destroy();
    };
  }, [pool, assetsDistribution]);

  function initialiseGraph() {
    const d3Chart = new D3LiquidityHistogram(refElement.current, {
      width,
      height,
      minTick: positionLowerUpperTicks[0],
      maxTick: positionLowerUpperTicks[1],
      currentTick: Number(pool?.tickData?.currentTick),
      token0Symbol: pool?.token0?.symbol,
      token1Symbol: pool?.token1?.symbol,
      token0Decimal: pool?.token[0]?.decimal || '6',
      token1Decimal: pool?.token[1]?.decimal || '6',
      data: assetsDistribution?.bins || [],
      tickData: pool?.tickData,
      lowestTick,
      highestTick,
    });

    setPositionChart(d3Chart);
  }

  useEffect(() => {
    if (positionChart)
      positionChart?.updateMinMaxTickRange(
        positionLowerUpperTicks[0],
        positionLowerUpperTicks[1],
        isFullRange
      );
  }, [positionLowerUpperTicks, isFullRange]);

  // function zoomInChart() {
  //   setZoomUnit(zoomUnit - zoomMag);
  // }

  // function zoomOutChart() {
  //   setZoomUnit(zoomUnit + zoomMag);
  // }

  return (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="subtitle1">Liquidity Position</Typography>
        </Box>

        {/* <Stack direction="row" spacing={1}>
          <Tooltip title="Zoom In">
            <CustomIconButton size="small" onClick={zoomInChart}>
              <ZoomIn />
            </CustomIconButton>
          </Tooltip>
          <Tooltip title="Zoom Out">
            <CustomIconButton size="small" onClick={zoomOutChart}>
              <ZoomOut />
            </CustomIconButton>
          </Tooltip>
        </Stack> */}
      </Stack>
      <div ref={refElement}></div>
    </Stack>
  );
}
