import React, { Component } from 'react';
import * as d3 from 'd3';

class Dot extends Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({},
                               props,
                               {r: 6});
  }

  flash() {
    let node = d3.select(this.refs.circle);

    this.setState({colorize: true});

    node.transition()
        .attr('width', 20)
        .attr('height', 20)
        .attr('x', this.props.x -3)
        .attr('y', this.props.y -3)
        .attr('height', 20)
        .duration(1250)
        .ease(d3.easeCubicOut)
        .transition()
        .attr('width', 6)
        .attr('height', 6)
         .attr('x', this.props.x +3)
        .attr('y', this.props.y +3)
        .duration(2250)
        .ease(d3.easeCubicOut)
        .on('end', () => this.setState({colorize: false}));
  }

  get color() {
    const { x, y, maxPos } = this.state;

    const t = d3.scaleLinear()
                .domain([0, 1.2*maxPos**2])
                .range([0, 1]);

    return d3.interpolateMagma(t(x**2 + y**2));
  }

  render() {
    const { x, y, r, colorize } = this.state;

    return <rect x={x} y={y} width={r} height={r}
             ref="circle" onMouseOver={this.flash.bind(this)}
             style={{fill: colorize ? this.color : 'black'}} />
  }
}

class SvgComp extends Component {
  render() {
    const width = 600,
          N = 50,
          pos = d3.scalePoint()
                  .domain(d3.range(N))
                  .range([0, width])
                  .padding(5)
                  .round(true);

    return (
      <svg width="600" height="600">
        {d3.range(N).map(x =>
           d3.range(N).map(y =>
             <Dot x={pos(x)} y={pos(y)} key={`${x}-${y}`}
                  maxPos={width} />
        ))}
      </svg>
    )
  }
}

export default SvgComp;
