import React, { Component } from 'react';
import { render } from 'react-dom';
import ReactSimpleRange from './sliderIndex.jsx';
// Import routing components
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Home extends Component {
    render(){
        const headingTwoStyles = {
          marginTop: '0px',
        }
        const headingStyles = {
          marginBottom: '5px',
          color: 'rgb(80, 80, 80)',
        };
        const wrapperStyles = {
          padding: '100px 10px 20px 10px',
          marginBottom: '25px',
        };
        const numProps = Object.keys(this.props).length - 1; // discounting title
        return (
          <div style={wrapperStyles}>
            <div className="description">Equalizer</div>
            <h2 style={headingTwoStyles}>{this.props.title}</h2>
            <div className="slider-container" style={{marginLeft: '0px'}}>
              <ReactSimpleRange label vertical {...this.props} />
            </div>
            <div className="slider-container">
              <ReactSimpleRange label vertical {...this.props} />
            </div>
            <div className="slider-container">
              <ReactSimpleRange label vertical {...this.props} />
            </div>
            <div className="slider-container">
              <ReactSimpleRange label vertical {...this.props} />
            </div>
            <div className="slider-container">
              <ReactSimpleRange label vertical {...this.props} />
            </div>
          </div>
        );
    }
}

render(<Router>
        <div style={{textAlign:'center'}}>
        <Route exact path="/" component={Home}/>
        </div>
    </Router>, document.getElementById('container'));