import React, { Component } from 'react';
import {deepPurple300} from 'material-ui/styles/colors';
import './Controls.css';
import {MuiThemeProvider, SelectField, MenuItem, TextField} from 'material-ui';

// Needed for onTouchTap (to avoid warning from material-ui)
// See: https://github.com/callemall/material-ui/issues/4670
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

// Scatterplot component
class Controls extends Component {



	render() {
		// Return links and show anything inside the <App> component (children)
		return (
            <MuiThemeProvider>
                <div className="controls">
					<SelectField
						value={this.props.shape}
						onChange={this.props.changeShape}
					>
					<MenuItem value={'Squares'} primaryText="Squares" />
					<MenuItem value={'Circles'} primaryText="Circles" />
					<MenuItem value={'Dragon'} primaryText="Dragon" />
					</SelectField>
				</div>
            </MuiThemeProvider>
		);
	}

}

export default Controls;
