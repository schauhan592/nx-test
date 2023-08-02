import { AssetsDistributionTicks, Bin } from '@alfred/alfred-common';
import { ApexOptions } from 'apexcharts';

type ChartData = {
  graphData: number[] | undefined;
  category: string[] | undefined;
};

export default function generateChartData(generatedFees: ChartData | null): {
  series: ApexOptions['series'];
  options: ApexOptions;
} {
  return {
    series: [
      {
        name: 'Fee',
        data: generatedFees?.graphData ? generatedFees?.graphData : [],
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 500,
        foreColor: '#FFF',
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
      },
      xaxis: {
        categories: generatedFees?.category ? generatedFees?.category : [],
      },
      yaxis: {
        title: {
          text: '$ (USD)',
        },
        decimalsInFloat: 0,
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        theme: 'dark',
        y: {
          formatter: function (val) {
            return '$ ' + val + ' thousands';
          },
        },
      },
    },
  };
}

export const processData = (
  ticks: AssetsDistributionTicks[],
  minTick: number,
  maxTick: number
): Bin[] => {
  const bins: Bin[] = [];
  let liquidity = 0;
  for (let i = 0; i < ticks.length - 1; ++i) {
    liquidity += Number(ticks[i].liquidityNet);

    const lowerTick = Number(ticks[i].tickIdx);
    const upperTick = Number(ticks[i + 1].tickIdx);

    if (upperTick > minTick && lowerTick < maxTick) {
      bins.push({
        x0: Number(ticks[i].tickIdx),
        x1: Number(ticks[i + 1].tickIdx),
        y: liquidity,
      });
    }
  }
  return bins;
};

export const LiquidityDistributionData = [
  {
    time: 1,
    price: 0.0,
  },
  {
    time: 2,
    price: 0.3,
  },
  {
    time: 3,
    price: 0.5,
  },
  {
    time: 4,
    price: 0.1,
  },
  {
    time: 5,
    price: 0.0,
  },
  {
    time: 6,
    price: 0.6,
  },
  {
    time: 7,
    price: 0.3,
  },
  {
    time: 8,
    price: 0.3,
  },
  {
    time: 9,
    price: 0.2,
  },
  {
    time: 10,
    price: 0.8,
  },
  {
    time: 11,
    price: 0.0,
  },
  {
    time: 12,
    price: 0.3,
  },
  {
    time: 13,
    price: 0.5,
  },
  {
    time: 14,
    price: 0.1,
  },
  {
    time: 15,
    price: 0.0,
  },
  {
    time: 16,
    price: 0.6,
  },
  {
    time: 17,
    price: 0.3,
  },
  {
    time: 18,
    price: 0.3,
  },
  {
    time: 19,
    price: 0.2,
  },
  {
    time: 20,
    price: 0.8,
  },
  {
    time: 21,
    price: 0.0,
  },
  {
    time: 22,
    price: 0.3,
  },
  {
    time: 3,
    price: 0.5,
  },
  {
    time: 24,
    price: 0.1,
  },
  {
    time: 25,
    price: 0.0,
  },
  {
    time: 26,
    price: 0.6,
  },
  {
    time: 27,
    price: 0.3,
  },
  {
    time: 28,
    price: 0.3,
  },
  {
    time: 29,
    price: 0.2,
  },
  {
    time: 30,
    price: 0.8,
  },
];
