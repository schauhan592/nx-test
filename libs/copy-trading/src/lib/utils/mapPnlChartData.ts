import { GavHistory, PnlChartUnit } from '../@types';

export default function mapPnlChartData({
  data,
  mode,
}: {
  data?: PnlChartUnit[] | GavHistory[];
  mode: 'PNL' | 'ROI' | 'GAV';
}): { x: number; y: number }[] {
  if (!data || data.length === 0) return [];
  return data.map((unit) => {
    const parsedUnitGavHistory = unit as GavHistory;
    const parsedUnitPnlChartUnit = unit as PnlChartUnit;
    return {
      x:
        mode === 'GAV'
          ? Date.parse(parsedUnitGavHistory['gmx_trader_gav_data.time'])
          : Date.parse(parsedUnitPnlChartUnit['gmx_traders_equity.time']),
      y:
        mode === 'GAV'
          ? Number(parsedUnitGavHistory['gmx_trader_gav_data.gav']) / Math.pow(10, 6)
          : mode === 'PNL'
          ? Number(parsedUnitPnlChartUnit['gmx_traders_equity.pnl_usd'])
          : Number(parsedUnitPnlChartUnit['gmx_traders_equity.pnl_perct']),
    };
  });
}
