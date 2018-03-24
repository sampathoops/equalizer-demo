import React, { Component } from 'react';
import { render } from 'react-dom';
import Slider from './Slider.jsx';
// Import routing components
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const presets = {
  default: {band1: 20, band2: 40, band3: 80, band4: 40, band5: 20},
  'rock': {band1: 80, band2: 60, band3: 40, band4: 20, band5: 10},
  'pop': {band1: 10, band2: 20, band3: 60, band4: 20, band5: 10},
  'jazz': {band1: 50, band2: 40, band3: 30, band4: 80, band5: 75},
  'classical': {band1: 30, band2: 70, band3: 70, band4: 30, band5: 20}
}

class Equalizer extends Component {
    constructor(props) {
      super(props);
      this.presets = presets;
      this.changePreset = this.changePreset.bind(this);
      this.state = {
        selectedPreset: 'default' 
      };
    }
    changePreset(event) {
      this.setState({selectedPreset : event.target.options[event.target.selectedIndex].value});
    }
    render(){
        const headingTwoStyles = {
          marginTop: '0px',
        }
        const headingStyles = {
          marginBottom: '5px',
          color: 'rgb(80, 80, 80)',
        };
        const wrapperStyles = {
          padding: '40px 10px 20px 10px',
          marginBottom: '25px',
        };
        const numProps = Object.keys(this.props).length - 1; // discounting title
        return (
          <div style={wrapperStyles}>
            <div className="description">Equalizer Demo</div>
            <br/><br/>
            <div className="description" style={{fontSize: '20px'}}>Choose a preset: 
            <select style={{marginLeft: '12px'}} onChange={this.changePreset}>
              <option value='default'>Default</option>
              <option value='rock'>Rock</option>
              <option value='pop'>Pop</option>
              <option value='jazz'>Jazz</option>
              <option value='classical'>Classical</option>
            </select></div>
            <h2 style={headingTwoStyles}>{this.props.title}</h2>
            <div className="slider-container" style={{marginLeft: '0px'}}>
              <Slider label vertical {...this.props} value={this.presets[this.state.selectedPreset].band1} />
              <div className="slider-title">60</div>
            </div>
            <div className="slider-container">
              <Slider label vertical {...this.props} value={this.presets[this.state.selectedPreset].band2} />
              <div className="slider-title">310</div>
            </div>
            <div className="slider-container">
              <Slider label vertical {...this.props} value={this.presets[this.state.selectedPreset].band3} />
              <div className="slider-title">1k</div>
            </div>
            <div className="slider-container">
              <Slider label vertical {...this.props} value={this.presets[this.state.selectedPreset].band4} />
              <div className="slider-title">6k</div>
            </div>
            <div className="slider-container">
              <Slider label vertical {...this.props} value={this.presets[this.state.selectedPreset].band5} />
              <div className="slider-title">16k</div>
            </div>
          </div>
        );
    }
}

render(<Router>
        <div style={{textAlign:'center'}}>
        <Route exact path="/" component={Equalizer}/>
        </div>
    </Router>, document.getElementById('container'));