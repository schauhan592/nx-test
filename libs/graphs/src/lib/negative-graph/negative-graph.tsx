import { ApexOptions } from 'apexcharts';
import ApexChart from 'react-apexcharts';

/* eslint-disable-next-line */
export interface NegativeGraphProps {
  NegtPostData: { series: ApexOptions['series']; options: ApexOptions };
}

export const NegativeGraph: React.FC<NegativeGraphProps> = ({
  NegtPostData,
}: NegativeGraphProps) => {
  return (
    <ApexChart
      className="bar"
      series={NegtPostData.series}
      options={NegtPostData.options}
      type="bar"
      height={'100%'}
    />
  );
};

export default NegativeGraph;
