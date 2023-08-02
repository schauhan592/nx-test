import * as d3 from 'd3';
import { findMax, findMin } from '../utils/math';
import {
  CorrelationDataPoints,
  PnLDataPoints,
  formatNumber,
  separateNumberByComma,
} from '@alfred/alfred-common';

interface D3PnLChartProps {
  width: number;
  height: number;
  data: PnLDataPoints[];
  type: 'PNL' | 'ROI';
}

let barWidth = 15;
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

class D3PnlChart {
  containerEl;
  props;
  svg;
  x;
  y;
  xAxis;
  yAxis;
  type;
  constructor(containerEl: any, newUi: boolean, props: D3PnLChartProps) {
    this.containerEl = containerEl;
    this.props = props;
    this.type = props.type;
    const xData = props.data.map((d) => d.x);
    const yData = props.data.map((d) => d.y);
    const data = props.data as PnLDataPoints[];
    const boxMargin = { top: 30, right: 30, bottom: 30, left: 30 };

    this.svg = d3
      .select(containerEl)
      .append('svg')
      .attr(
        'viewBox',
        `0 0 ${props.width + boxMargin.left + boxMargin.right} ${props.height + boxMargin.top}`
      );
    const min = findMin(yData);
    const max = findMax(yData);
    const margin = max - min;

    // add x axis
    const x = d3
      .scaleTime()
      .domain([findMin(xData), findMax(xData)])
      .range([100, props.width]);

    // add y axis
    const y = d3
      .scaleLinear()
      .domain([min - margin / 3, max + margin / 3 / 1.5])
      .range([props.height, 30]); // custom values to make the start and end of graph accordingly

    // xaxis made to show the date labels
    this.xAxis = this.svg
      .append('g')
      .attr('transform', 'translate(50,' + this.props.height + ')')
      .attr('color', '#ffffff')
      .style('font-size', 12)
      .call(
        d3
          .axisBottom(x)
          .tickPadding(15)
          .tickSize(0)
          .ticks(20)
          .tickFormat((x) => {
            return x.toString().slice(8, 10) === '01'
              ? `${x.toString().slice(4, 10)}`
              : `${x.toString().slice(8, 10)}`;
          })
      );
    this.x = x;

    this.yAxis = this.svg
      .append('g')
      .attr('color', '#FFF')
      .style('font-size', 12)
      .attr('transform', 'translate(60,0)') // Position the y-axis on the left side
      .call(
        d3
          .axisLeft(y)
          .tickSize(0)
          .tickPadding(10)
          .tickFormat((x) => {
            return formatNumber(Number(x)).toString();
          })
      );
    this.y = y;

    // dashed line at y(0)
    this.svg
      .append('line')
      .attr('x1', 60) // Starting x-coordinate of the line (leftmost point)
      .attr('x2', props.width + 50) // Ending x-coordinate of the line (rightmost point)
      .attr('y1', y(0) + 0.5) // y-coordinate of the line (y(0) is the position of y-axis)
      .attr('y2', y(0) + 0.5) // y-coordinate of the line (same as y1 to create a horizontal line)
      .style('stroke-dasharray', '5, 5') // Set the stroke dash pattern for a dashed line
      .style('stroke', '#ffffffc1') // Set the stroke color of the line
      .style('stroke-width', 1); // Set the stroke width of the line

    // to bridge the gap b/w y-axis and x-axis
    this.svg
      .append('line')
      .attr('x1', 60)
      .attr('x2', 150)
      .attr('y1', props.height + 1)
      .attr('y2', props.height + 1)
      .style('stroke', '#ffffff')
      .style('stroke-width', 1.15);

    // this text renders the last months name to show with above line
    this.svg
      .append('g')
      .append('text')
      .html(`${months[new Date(props.data[0].x).getMonth()].slice(0, 3)}`)
      .attr('x', x(findMin(xData)))
      .attr('text-anchor', 'right')
      .style('fill', '#ffffff')
      .attr('font-size', 12)
      .attr('y', y(min) + 90)
      .style('opacity', 1);

    this.svg
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', function (d: CorrelationDataPoints) {
        return x(d.x);
      })
      .attr('y', function (d: CorrelationDataPoints) {
        return d.y >= 0 ? y(d.y) : y(0) + 1; // Adjust y position based on positive/negative values
      })
      .attr('width', newUi ? 2 : barWidth) // Adjust the width of the bars as needed
      .attr('height', function (d: CorrelationDataPoints) {
        return Math.abs(y(d.y) - y(0)); // Use absolute difference for the bar height
      });

    if (!newUi) {
      // render chart
      this.svg
        .selectAll('.bar')
        .data(data)
        .attr('stroke', '#ffffff') // Add border color
        .attr('stroke-width', 1) // Set border width
        .attr('fill', function (d: CorrelationDataPoints) {
          return d.y >= 0 ? '#00BD4E' : '#FF4F39'; // Use different colors for positive/negative bars
        });
    } else {
      barWidth = 2;
      this.svg
        .selectAll('.bar')
        .data(data)
        .attr('fill', function (d: CorrelationDataPoints) {
          return d.y >= 0 ? '#67EC8C' : '#E5393E'; // Use different colors for positive/negative bars
        });

      // Append circles on top of each bar
      this.svg
        .selectAll('.circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'circle')
        .attr('cx', function (d: CorrelationDataPoints) {
          return x(d.x) + barWidth / 2; // Place the circle in the center of the bar
        })
        .attr('cy', function (d: CorrelationDataPoints) {
          return d.y >= 0 ? y(d.y) - 7 : y(d.y) + 8; // Adjust y position based on positive/negative values
        })
        .attr('stroke', function (d: CorrelationDataPoints) {
          return d.y >= 0 ? '#67EC8C' : '#E5393E'; // Use different colors for positive/negative bars
        })
        .attr('stroke-width', 2)
        .attr('r', 6) // Set the radius of the circle as needed
        .attr('fill', 'transparent'); // Set the color of the circle

      barWidth = 15;
    }

    this.handleMouseMove(newUi);
  }

  destroy() {
    this.svg.remove();
  }

  handleMouseMove(newUi: boolean) {
    const bisect = d3.bisector(function (d: PnLDataPoints) {
      return d.x;
    }).center;
    const tooltipBox = this.svg
      .append('rect')
      .attr('height', 50)
      .attr('width', 170)
      .style('opacity', 0)
      .attr('y', this.y(0))
      .attr('fill', '#1e1c1c99')
      .style('stroke-width', 1)
      .style('stroke', '#ffffff2e');

    const tooltipDate = this.svg
      .append('g')
      .append('text')
      .style('opacity', 0)
      .style('fill', '#FFF')
      .attr('text-anchor', 'left')
      .attr('alignment-baseline', 'middle');

    const tooltipPnl = this.svg
      .append('g')
      .append('text')
      .style('opacity', 0)
      .style('fill', '#FFF')
      .attr('text-anchor', 'left')
      .attr('alignment-baseline', 'middle');

    const verticalRect = this.svg
      .append('g')
      .append('rect')
      .attr('height', this.props.height)
      .attr('y', this.y(0))
      .attr('fill', '#ffffff6b')
      .style('stroke-width', 2)
      .style('stroke', '#428fddeb');

    const focusCircle = this.svg
      .append('g')
      .append('circle')
      .attr('stroke', '#ffffff')
      .style('opacity', 0)
      .attr('stroke-width', 3)
      .attr('r', 6) // Set the radius of the circle as needed
      .attr('fill', 'transparent');

    const onMouseMove = (e: any) => {
      const coords = d3.pointer(e);
      const x0 = this.x.invert(coords[0]);
      const i = bisect(this.props.data, x0, 0);
      const selectedData = this.props.data[i];
      const barX = this.x(selectedData?.x);
      const barY = this.y(selectedData?.y);

      let tooltipWidth = this.type === 'ROI' ? 160 : Math.abs(selectedData?.y) > 10000 ? 200 : 190;
      let tooltipX = this.type === 'ROI' ? 155 : Math.abs(selectedData?.y) > 10000 ? 185 : 175;
      if (Math.abs(selectedData?.y) > 100000) {
        tooltipX += 10;
        tooltipWidth += 10;
      }
      // to create extra space for minus sign of neg vals
      if (selectedData?.y < 0) {
        tooltipWidth += 10;
        tooltipX += 10;
      }
      tooltipBox.attr('width', tooltipWidth);

      verticalRect
        .attr('x', barX)
        .attr('y', selectedData?.y >= 0 ? this.y(selectedData?.y) : this.y(0))
        .attr('fill', selectedData?.y >= 0 ? '#00BD4E' : '#FF4F39')
        .attr('width', barWidth)
        .attr('height', Math.abs(this.y(selectedData?.y) - this.y(0)));

      if (newUi) {
        focusCircle
          .attr('cx', function () {
            return barX + 1; // Place the circle in the center of the bar
          })
          .attr('cy', function () {
            return selectedData?.y >= 0 ? barY - 8 : barY + 8; // Adjust y position based on positive/negative values
          });
        verticalRect.attr('fill', 'white').attr('width', 3).style('stroke-width', 0);
      }

      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;
      tooltipPnl
        .html(
          `${this.type === 'PNL' ? 'PNL: ' : 'ROI: '}` +
            `${
              this.type === 'PNL'
                ? 'USD ' + separateNumberByComma(selectedData?.y.toFixed(2))
                : selectedData?.y.toFixed(2) + '% , '
            }`
        )
        .attr('text-anchor', 'right')
        .attr('font-size', 14)
        .attr('y', self.y(selectedData?.y));
      tooltipDate
        .html(' Date: ' + new Date(selectedData?.x).toLocaleDateString())
        .attr('text-anchor', 'right')
        .attr('font-size', 14)
        .attr('y', self.y(selectedData?.y) + 20);
      tooltipBox.attr('y', self.y(selectedData?.y) - 15);
      if (this.x(selectedData?.x) > this.props.width * 0.8) {
        tooltipPnl.attr('x', function () {
          return self.x(selectedData?.x) - (this.getComputedTextLength() + 20);
        });
        tooltipDate.attr('x', function () {
          return self.x(selectedData?.x) - (this.getComputedTextLength() + 20);
        });
        tooltipBox.attr('x', function () {
          return self.x(selectedData?.x) - tooltipX - 18;
        });
      } else {
        tooltipPnl.attr('x', this.x(selectedData?.x) + 25);

        tooltipDate.attr('x', function () {
          return self.x(selectedData?.x) + 25;
        });
        tooltipBox.attr('x', function () {
          return self.x(selectedData?.x) + 17;
        });
      }
    };

    this.svg
      .append('rect')
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .attr('width', this.props.width)
      .attr('height', this.props.height)
      .on('mouseover', () => {
        tooltipPnl.style('opacity', 1);
        tooltipDate.style('opacity', 1);
        if (newUi) {
          focusCircle.style('opacity', 1);
        }
        verticalRect.style('opacity', 1);
        tooltipBox.style('opacity', 1);
      })
      .on('mouseout', () => {
        tooltipPnl.style('opacity', 0);
        tooltipDate.style('opacity', 0);
        verticalRect.style('opacity', 0);
        if (newUi) {
          focusCircle.style('opacity', 0);
        }
        tooltipBox.style('opacity', 0);
      })
      .on('mousemove', onMouseMove);

    // &nbsp; is used to move the label left
    const graphLabelType = this.type === 'ROI' ? '&nbsp;&nbsp;%' : '&nbsp;USD';
    this.svg
      .append('g')
      .append('text')
      .html(`${graphLabelType}`)
      .attr('x', 15)
      .attr('text-anchor', 'right')
      .style('fill', '#ffffff')
      .attr('font-size', 16)
      .attr('y', 18)
      .style('font-weight', '800')
      .style('opacity', 1);
  }
}

export default D3PnlChart;
