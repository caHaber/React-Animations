import React, { Component } from 'react';
import * as d3 from 'd3';


const size = 20,
     width = window.innerHeight,
      N = 30,
      pos = d3.scalePoint()
              .domain(d3.range(N))
              .range([0, width])
              .padding(5)
              .round(true);




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

    node.raise();

    node.transition()
        .attr('r', 100)
        // .attr('r', d3.randomUniform(-50,50))
        .attr('cx', this.props.x -10)
        .attr("stroke-width","2px")
        .attr("stroke-color",this.color)
        .attr('cy', this.props.y -10)
        .duration(1250)
        .ease(d3.easeCubicOut)
        .transition()
        .attr('r', 0)
        .attr('cx', this.props.x + d3.randomUniform(-250,250)() )
        .attr('cy', this.props.y + d3.randomUniform(-300,0)() )
        .duration(2250)
        .ease(d3.easeCubicOut)
        .on('end', () => { node.remove();  } );
  }

  get color() {
    const { x, y, maxPos } = this.state;

    const t = d3.scaleLinear()
                .domain([0, 1.2*maxPos**2])
                .range([0, 1]);

    return d3.interpolateWarm(t(x**2 + y**2));
  }

  render() {
    const { x, y, r, colorize } = this.state;

    return <circle cx={x} cy={y} r={d3.randomUniform(15,30)()}
             ref="circle" onMouseOver={this.flash.bind(this)}
             style={{fill: colorize ? this.color : 'white', stroke: "2px", stroke: this.color}} />
  }
}

class Dragon extends Component {
  render() {


    return (
      <svg width={width + 300 + "px"} height={width + "px"}>
        {d3.range(N).map(x =>
           d3.range(N).map(y =>
             <Dot x={pos(x)} y={pos(y)} key={`${x}-${y}`}
                  maxPos={width} />
        ))}
      </svg>
    )
  }
}

// <Dot x={d3.randomUniform(10,1000)()} y={d3.randomUniform(500,y*10)()} key={`${x}-${y}`}
//      maxPos={width} />

export default Dragon;
