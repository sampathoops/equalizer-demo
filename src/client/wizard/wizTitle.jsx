import React, { Component } from 'react';
import { render } from 'react-dom';

class WizTitle extends Component {
    render(){
        return (<div>
                    <div className="step-indicator top-menu">
                      <a id="step_fitProfile" className="step completed" href="#">Share shopping list</a>
                      <a id="step_shop" className="step" href="#">Shop</a>
                    </div>
                </div>
          );
    }
}
export default WizTitle;