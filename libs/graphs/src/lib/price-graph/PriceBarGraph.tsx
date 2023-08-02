import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

/* eslint-disable-next-line */
export interface PriceBarGraphProps {
  options: ApexOptions | undefined;
  series: ApexOptions['series'];
}

export const PriceBarGraph: React.FC<PriceBarGraphProps> = ({
  options,
  series,
}: PriceBarGraphProps) => {
  return <ApexChart options={options} series={series} type="bar" height={'100%'} />;
};

export default PriceBarGraph;
