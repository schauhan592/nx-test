import * as d3 from 'd3';
import { LiquidityData } from '../@types';

interface LiquidityFeeProps {
  data: LiquidityData[];
  margin?: number;
  height: number;
  width: number;
}

class PositionFee {
  margin;
  svg;
  height;
  width;
  focusText;
  data;
  x;
  y;
  focus;
  bisect;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  selectedData;

  constructor(containerEl: any, props: LiquidityFeeProps) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    this.data = props.data;
    this.margin = {
      top: props.margin || 20,
      right: props.margin || 20,
      bottom: props.margin || 20,
      left: props.margin || 30,
    };

    this.width = props.width - this.margin.left - this.margin.right;
    this.height = props.height - this.margin.top - this.margin.bottom;

    // append the svg object to the body of the page
    this.svg = d3
      .select(containerEl)
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
    // Add X axis --> it is a date format
    this.x = d3.scaleLinear().domain([1, this.calculatexAxisEndpoint()]).range([0, this.width]);
    this.svg
      .append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(this.x));
    // Add Y axis
    this.y = d3.scaleLinear().domain([0, this.calculateyAxisEndpoint()]).range([this.height, 0]);
    this.svg.append('g').call(d3.axisLeft(this.y));
    // This allows to find the closest X index of the mouse:
    this.bisect = d3.bisector(function (d: LiquidityData) {
      return d.price;
    }).left;
    // Create the circle that travels along the curve of chart
    this.focus = this.svg
      .append('g')
      .append('circle')
      .style('fill', 'none')
      .attr('stroke', 'black')
      .attr('r', 8.5)
      .style('opacity', 0);
    // Create the text that travels along the curve of chart
    this.focusText = this.svg
      .append('g')
      .append('text')
      .style('opacity', 0)
      .attr('text-anchor', 'left')
      .attr('alignment-baseline', 'middle');
    // Add the line
    this.svg
      .append('path')
      .datum(this.data)
      .attr('fill', 'none')
      .attr('stroke', '#14f46f')
      .attr('stroke-width', 1.5)
      .attr(
        'd',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        d3
          .line()
          .x(function (d) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return self.x(d.time);
          })
          .y(function (d) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return self.y(d.price);
          })
      );
    // Create a rect on top of the svg area: this rectangle recovers mouse position
    this.svg
      .append('rect')
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .attr('width', this.width)
      .attr('height', this.height)
      .on('mouseover', this.mouseover)
      .on('mousemove', this.mousemove)
      .on('mouseout', this.mouseout);
    //   What happens when the mouse move -> show the annotations at the right positions.
  }

  calculatexAxisEndpoint() {
    let biggestItem = 0;
    this.data.forEach((item) => {
      if (item.time > biggestItem) {
        biggestItem = item.time;
      }
    });
    return biggestItem;
  }

  calculateyAxisEndpoint() {
    let biggestItem = 0;
    this.data.forEach((item) => {
      if (item.price > biggestItem) {
        biggestItem = item.price;
      }
    });
    return biggestItem;
  }

  mouseover() {
    this.focus.style('opacity', 1);
    this.focusText.style('opacity', 1);
  }
  mousemove() {
    // recover coordinate we need
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const x0 = this.x.invert(d3.mouse(this)[0]);
    console.log(x0);
    const i = this.bisect(this.data, x0, 1);
    this.selectedData = this.data[i];
    this.focus
      .attr('cx', this.x(this.selectedData.time))
      .attr('cy', this.y(this.selectedData.price));
    this.focusText
      .html('x:' + this.selectedData.time + '  -  ' + 'y:' + this.selectedData.price)
      .attr('x', this.x(this.selectedData.time) + 15)
      .attr('y', this.y(this.selectedData.price));
  }
  mouseout() {
    this.focus.style('opacity', 0);
    this.focusText.style('opacity', 0);
  }
}

export default PositionFee;
