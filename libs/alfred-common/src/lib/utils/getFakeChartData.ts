import { ApexOptions } from 'apexcharts';

export default function getFakeChartData(): {
  series: ApexOptions['series'];
  options: ApexOptions;
} {
  return {
    series: [
      {
        name: 'Fee',
        data: [18477, 56418, 33687, 117046, 40682, 11696, 4161, 1601, 1178, 6596, 7491, 3438],
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
        categories: [
          'February',
          'January',
          'December',
          'November',
          'October',
          'September',
          'August',
          'July',
          'June',
          'May',
          'April',
          'March',
        ],
      },
      yaxis: {
        title: {
          text: '$ (USD)',
        },
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
