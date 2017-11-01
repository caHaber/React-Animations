import React, { Component } from 'react';
import './App.css';
import SvgComp from './animate.js'
import EnterComponent from './EnterComponent.js'
import Squares from './gameLoop.js'
import Dragon from './Dragon.js'
import Controls from './Controls.js'
import Circles from './Circle.js'

class App extends Component {

    state = {
            shape:"Circles",
            enter: true,
    };

    //Arrow function binds automatically, thanks es6
    changeShape = (event, index, value)  => {
        this.setState({shape:value})
    }

    setEnter = () => {
      this.setState({enter:false});
    }

  render() {
    if(this.state.enter) return (<EnterComponent setEnter={this.setEnter}/>);
    return (
      <div className="App">
        {this.state.shape === "Squares" &&
            <Squares />
        }
        {this.state.shape === "Dragon" &&
            <Dragon />
        }
        {this.state.shape === "Circles" &&
            <Circles />
        }
        <Controls shape={this.state.shape} changeShape={this.changeShape}/>
      </div>
    );
  }
}

export default App;
