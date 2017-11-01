import React, { Component } from 'react';
import * as d3 from 'd3';


const Circle = ({ x, y }) => (
  <circle cx={x} cy={y} r={5}  />
);

const size = 30;

class Dot extends Component {

  constructor(props) {
    super(props);
    this.state = Object.assign({},
                               props,
                               {y: 5,
                               vy: 0,
                               r: size,
                               colorize: false});
  }

  componentDidMount() {
    this.timer = d3.timer(() => this.gameLoop());
  }

  componentWillUnmount() {
    this.timer.stop();
  }

  gameLoop() {
    let { y, vy, lastFrame } = this.state;

    if (y+vy > MAX_H) {
      vy = -vy*.87;
    }

    let frames = 1;

    if (lastFrame) {
      frames = (d3.now()-lastFrame)/(1000/60);
    }

    this.setState({
      y: y+vy*frames,
      vy: vy+.3*frames,
      lastFrame: d3.now()
    })
  }


  flash() {
    let node = d3.select(this.refs.circle);

    this.setState({colorize: true});

    node.raise();

    this.setState({ y: this.state.y-50,
        vy: this.state.vy+.5*this.state.vy})

    node.transition()
        .attr('r', 100)
        // .attr('r', d3.randomUniform(-50,50))
        .attr('cx', this.props.x + d3.randomUniform(-250,250)())
        // .attr("stroke-width","30px")
        // .attr("stroke-color",this.color)
        // .attr('cy', this.props.y -10)
        .duration(1250)
        .ease(d3.easeCubicOut)
        .transition()
        .attr('r', 50)
        .attr('cx', this.state.x)
        // .attr('cy', (d) => {this.setState({ y: this.state.y-50,
            // vy: this.state.vy+.5*this.state.vy}); return this.state.y})
        .duration(2250)
        .ease(d3.easeCubicOut)
        .on('end', () => { this.setState({colorize: false})  } );
  }
  get color() {
    const { x, y, maxPos } = this.props;

    const t = d3.scaleLinear()
                .domain([0, 1.2*maxPos**2])
                .range([0, 1]);

    return d3.interpolateCool(t(x**2 + y**2));
  }

  render() {
    const { x, y, r, colorize } = this.state;

    return <circle cx={this.state.x} cy={this.state.y} r={50}
             ref="circle" onMouseOver={this.flash.bind(this)}
             style={{fill: colorize ? this.color : 'black', strokeWidth: "10px" , stroke: this.color}} />
  }
 }

const MAX_H = window.innerHeight;

class Circles extends Component {
  constructor() {
    super();

    this.state = {
      y: 5,
      vy: 0,
      N: 20
    }
  }




  render() {
    return (
      <svg width="100%" height={window.innerHeight} >
       {d3.range(this.state.N).map(x =>
        <Dot vy={this.state.vy} maxPos={1000} y={this.state.y} x={(x*50)+100} key={x} />
        )}
      </svg>
    )
  }
}

export default Circles
