import * as d3 from 'd3';
import { LiquidityData } from '../@types';

interface LiquidityDistributionProps {
  data: LiquidityData[];
  height: number;
  width: number;
  margin?: number;
}

class LiquidityDistribution {
  margin;
  width;
  height;
  svg;
  x;
  xAxis;
  y;
  yAxis;
  data;

  constructor(containerEl: any, props: LiquidityDistributionProps) {
    this.data = props.data;

    // set the dimensions and margins of the graph
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

    // Initialize the X axis
    this.x = d3.scaleBand().range([0, this.width]).padding(0);
    this.xAxis = this.svg.append('g').attr('transform', 'translate(0,' + this.height + ')');

    // Initialize the Y axis
    this.y = d3.scaleBand().range([this.height, 0]);

    this.yAxis = this.svg.append('g').attr('class', 'myYaxis');

    this.update();
  }

  // A function that create / update the plot for a given variable:
  update() {
    // X axis
    this.x.domain(
      this.data.map(function (d: LiquidityData) {
        return String(d.time);
      })
    );
    this.xAxis.transition().duration(1000).call(d3.axisBottom(this.x));

    // Add Y axis
    this.y.domain(
      this.data.map(function (d: LiquidityData) {
        return String(d.price);
      })
    );
    this.yAxis.transition().duration(1000).call(d3.axisLeft(this.y));

    // variable u: map data to existing bars
    const u: any = this.svg.selectAll('rect').data(this.data);

    // update bars

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    u.enter()
      .append('rect')

      .merge(u)
      .transition()
      .duration(1000)
      .attr('x', function (d: LiquidityData) {
        return self.x(String(d.time));
      })
      .attr('y', function (d: LiquidityData) {
        return self.y(String(d.price));
      })
      .attr('width', 10)
      .attr('height', function (d: LiquidityData) {
        return self.height - Number(self.y(String(d.price)) || 0);
      })
      .attr('fill', '#14f46f');
  }
}

export default LiquidityDistribution;
