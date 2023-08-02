import * as d3 from 'd3';
import { findMax, findMin } from '../utils/math';
import { CorrelationDataPoints, formatNumber } from '@alfred/alfred-common';

interface RGB {
  r: number;
  g: number;
  b: number;
}
interface D3GavHistoryChartProps {
  width: number;
  height: number;
  data: CorrelationDataPoints[];
}
class D3GavHistoryChart {
  props;
  svg;
  x;
  y;
  xAxis;
  yAxis;

  constructor(props: D3GavHistoryChartProps) {
    this.props = props;

    const xData = props.data.map((d) => d.x);
    const yData = props.data.map((d) => d.y);
    const data = props.data as CorrelationDataPoints[];
    props.height += 60;

    const margin = { top: 30, right: 30, bottom: 30, left: 80 };

    // IMP: since it plots multiple svgs in same container, first we have to remove the old one.
    d3.select('#gav-chart svg').remove();

    this.svg = d3
      .select('#gav-chart')
      .append('svg')
      .attr('viewBox', `0 0 ${props.width} ${props.height}`)
      .style('margin-bottom', '50px');

    this.createLinearGradient('blue-gradient', { r: 38, g: 108, b: 221 });

    // add x axis
    const x = d3
      .scaleTime()
      .domain([findMin(xData), findMax(xData)])
      .range([margin.left, props.width - margin.right]);
    this.xAxis = this.svg
      .append('g')
      .attr('transform', `translate(0,${props.height - margin.bottom})`)
      .attr('color', '#FFF')
      .style('font-size', 16)
      .call(d3.axisBottom(x).tickSize(0).tickPadding(10));
    this.x = x;

    // add y axis
    const min = 0;
    const max = findMax(yData);
    const y = d3
      .scaleLinear()
      .domain([min, max])
      .range([props.height - margin.bottom, margin.top]);

    this.yAxis = this.svg
      .append('g')
      .attr('color', '#FFF')
      .attr('transform', `translate(${margin.left},0)`)
      .style('font-size', 16)
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

    // render chart
    this.svg
      .append('path')
      .datum(data)

      .attr('fill', 'transparent')
      .attr('stroke', 'rgb(38, 108, 221)')
      .attr('stroke-width', 1.5)
      .attr(
        'd',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        d3
          .line()
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .x(function (d: CorrelationDataPoints) {
            return x(d.x);
          })
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .y(function (d: CorrelationDataPoints) {
            return y(d.y);
          })
      );
    this.svg
      .append('path')
      .datum(data)

      .attr('fill', 'url(#blue-gradient)')
      .attr(
        'd',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        d3
          .area()
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .x(function (d: CorrelationDataPoints) {
            return x(d.x);
          })
          .y0(props.height)
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .y1(function (d: CorrelationDataPoints) {
            return y(d.y);
          })
      );

    this.svg
      .append('text')
      .attr('text-anchor', 'start')
      .attr('y', 13)
      .attr('x', 35)
      .attr('font-size', 16)
      .text('USDC')
      .style('fill', 'white')
      .style('font-weight', 'bold');

    const bisect = d3.bisector(function (d: CorrelationDataPoints) {
      return d.x;
    }).left;

    const focusCircle = this.svg
      .append('g')
      .append('circle')
      .style('fill', 'none')
      .attr('stroke', '#FFF')
      .attr('r', 6)
      .style('opacity', 0);

    const tooltipBox = this.svg
      .append('rect')
      .attr('height', 55)
      .attr('width', 240)
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
    const tooltipGav = this.svg
      .append('g')
      .append('text')
      .style('opacity', 0)
      .style('fill', '#FFF')
      .attr('text-anchor', 'left')
      .attr('alignment-baseline', 'middle');

    this.svg
      .append('rect')
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .attr('width', props.width)
      .attr('height', props.height)
      .on('mouseover', mouseover)
      .on('mousemove', mouseover)
      .on('mouseout', mouseout);

    function mouseover(e: any) {
      focusCircle.style('opacity', 1);
      tooltipBox.style('opacity', 1);
      tooltipDate.transition().duration(200).style('opacity', 1);
      tooltipGav.transition().duration(200).style('opacity', 1);
      const x0 = x.invert(d3.pointer(e)[0]);
      const i = bisect(data, x0, 1);
      const selectedData = data[i];

      focusCircle.attr('cx', x(selectedData?.x)).attr('cy', y(selectedData?.y));
      if (x(selectedData?.x) > props.width * 0.8) {
        tooltipGav
          .html('GAV: USDC ' + selectedData?.y)
          .attr('x', x(selectedData?.x) - 240)
          .attr('y', y(selectedData?.y));
        tooltipDate
          .html('Date: ' + new Date(selectedData?.x).toLocaleString())
          .attr('x', x(selectedData?.x) - 240)
          .attr('y', y(selectedData?.y) + 20);
        tooltipBox
          .attr('x', function () {
            return x(selectedData?.x) - 260;
          })
          .attr('y', y(selectedData?.y) - 20);
      } else {
        tooltipGav
          .html('GAV: USDC ' + selectedData?.y)
          .attr('x', x(selectedData?.x) + 25)
          .attr('y', y(selectedData?.y));
        tooltipDate
          .html('Date: ' + new Date(selectedData?.x).toLocaleString())
          .attr('x', x(selectedData?.x) + 25)
          .attr('y', y(selectedData?.y) + 20);
        tooltipBox
          .attr('x', function () {
            return x(selectedData?.x) + 17;
          })
          .attr('y', y(selectedData?.y) - 15);
      }
    }

    function mouseout() {
      focusCircle.style('opacity', 0);
      tooltipDate.transition().duration(200).style('opacity', 0);
      tooltipGav.transition().duration(200).style('opacity', 0);
      tooltipBox.style('opacity', 0);
    }
  }

  destroy() {
    if (this.svg) {
      this.svg.selectAll('*').remove();
    }
  }

  createLinearGradient(id: string, { r, g, b }: RGB) {
    const lg = this.svg
      .append('defs')
      .append('linearGradient')
      .attr('id', id)
      .attr('x1', '0%')
      .attr('x2', '0%')
      .attr('y1', '0%')
      .attr('y2', '100%');
    lg.append('stop')
      .attr('offset', '0%')
      .style('stop-color', `rgb(${r}, ${g}, ${b}, 1)`)
      .style('stop-opacity', 1);
    lg.append('stop')
      .attr('offset', '10%')
      .style('stop-color', `rgb(${r}, ${g}, ${b}, 0.5)`)
      .style('stop-opacity', 1);
    lg.append('stop')
      .attr('offset', '25%')
      .style('stop-color', `rgb(${r}, ${g}, ${b}, 0.3)`)
      .style('stop-opacity', 1);
    lg.append('stop')
      .attr('offset', '50%')
      .style('stop-color', `rgb(${r}, ${g}, ${b}, 0.15)`)
      .style('stop-opacity', 1);
    lg.append('stop')
      .attr('offset', '100%')
      .style('stop-color', `rgb(${r}, ${g}, ${b}, 0)`)
      .style('stop-opacity', 1);
  }
}

export default D3GavHistoryChart;
