import React, { Component } from 'react';
import * as d3 from 'd3';


const size = 45;

class Dot extends Component {



  constructor(props) {
    super(props);
    this.state = Object.assign({},
                               props,
                               {r: size});
  }

  flash() {
    let node = d3.select(this.refs.circle);

    this.setState({colorize: true});

    var square = this;

    node.raise();

    node.transition()
        .attr('width', 70)
        .attr('height', 70)
        .attr('x', this.props.x -10)
        .attr('y', this.props.y -10)
        .duration(1250)
        .ease(d3.easeCubicOut)
        .transition()
        .attr('width', 0)
        .attr('height', 0)
        .attr('x', this.props.x + d3.randomUniform(-250,250)() )
        .attr('y', this.props.y + d3.randomUniform(-300,0)() )
        .duration(2250)
        .ease(d3.easeCubicOut)
        .on('end', () => { square.setState({colorize: true}); d3.select(this).remove();  } );
  }

  get color() {
    const { x, y, maxPos } = this.state;

    const t = d3.scaleLinear()
                .domain([0, 1.2*maxPos**2])
                .range([0, 1]);

    return d3.interpolateCool(t(x**2 + y**2));
  }

  render() {
    const { x, y, r, colorize } = this.state;

    return <rect x={x} y={y} width={r} height={r}
             ref="circle" onMouseOver={this.flash.bind(this)}
             style={{fill: colorize ? this.color : 'black'}} />
  }
}

class Ball extends Component {
  render() {
    const width = 1000,
          N = 40,
          pos = d3.scalePoint()
                  .domain(d3.range(N))
                  .range([0, width])
                  .padding(5)
                  .round(true);

    return (
      <svg width={width + "px"} height={width + "px"}>
        {d3.range(N).map(x =>
           d3.range(N).map(y =>
             <Dot x={pos(x)} y={pos(y)} key={`${x}-${y}`}
                  maxPos={width} />
        ))}
      </svg>
    )
  }
}


export default Ball;
