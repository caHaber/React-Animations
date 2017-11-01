import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {MuiThemeProvider} from 'material-ui';

class EnterComponent extends Component {

    render() {

        return (
            <div>
                <MuiThemeProvider>
                    <div className="intro-box">
                   
                    <p className="intro-info">
                    This project is a React experiment that renders svg elements then hands off transitioning to d3.
                    The circles setting goes a step further by integrating a d3 timer in order to animate the balls.
                    This is built off of work from a d3+React workshop taught by Swizec Teller and Freddy Rangel.  
                    <br></br>
                    <RaisedButton className="button" label="Enter Demo!" onTouchTap={this.props.setEnter}/>
                    </p>
                    </div>
                </MuiThemeProvider>
            </div>
        );

    }
    
}

export default EnterComponent;