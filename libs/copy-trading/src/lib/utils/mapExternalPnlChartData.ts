export default function mapExternalPnlChartData({
  data,
  mode,
}: {
  data?: any;
  mode: 'PNL' | 'ROI' | 'GAV';
}): { x: number; y: number }[] {
  if (!data || data.length === 0) return [];
  return data.map((unit: any) => {
    const parsedUnitGavHistory = unit;
    const parsedUnitPnlChartUnit = unit;
    return {
      x:
        mode === 'GAV'
          ? Date.parse(parsedUnitGavHistory['gmx_trader_vaults_gav.time'])
          : Date.parse(parsedUnitPnlChartUnit['gmx_traders_equity.time']),
      y:
        mode === 'GAV'
          ? Number(parsedUnitGavHistory['gmx_trader_vaults_gav.gav']) / Math.pow(10, 6)
          : mode === 'PNL'
          ? Number(parsedUnitPnlChartUnit['gmx_traders_equity.pnl_usd'])
          : Number(parsedUnitPnlChartUnit['gmx_traders_equity.pnl_perct']),
    };
  });
}
