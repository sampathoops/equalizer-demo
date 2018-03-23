import React, { Component } from 'react';
import { render } from 'react-dom';
import CaptureList from './captureList.jsx';
import WizTitle from './wizTitle.jsx';
import Shop from './shop.jsx';
// Import routing components
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class CreateFitProfile extends Component {
    propTypes: {
      match: PropTypes.object.isRequired,
      location: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired
    }
    componentDidMount(){
      
      console.log('this.props.history:',this.props.history);
      var h = this.props.history;
      window.onScanComplete = function() {
        var fitStr = 'faceH:'+localStorage.getItem('faceH')+'faceW:'+localStorage.getItem('faceW')+'faceX:'+localStorage.getItem('faceX')+'faceY:'+localStorage.getItem('faceY')+'shoulderH:'+localStorage.getItem('shoulderH')+'shoulderW:'+localStorage.getItem('shoulderW')+'shoulderX:'+localStorage.getItem('shoulderX')+'shoulderY:'+localStorage.getItem('shoulderY');
        // alert(fitStr);
        h.push('/fit-profile/update');
        $('.outline').hide();
        $('#capture-photo').hide();
        $('#snap').hide();
        $('#camera-stream').hide();
      }
    }
    render(){
        const { match, location, history } = this.props;
        return (<div>
                <div className="content">
                  <div class="select">
                    <select id="videoSource"></select>
                  </div>
                  <div id="selfieMsg">Position yourself inside the dotted outline and tap 'Scan' button</div>
                </div> 
              </div>
          );
    }
}

var ShareListWithRouter = withRouter(ShareList)

render(<Router>
        <div>
        <Route path="/fit-profile" render={()=>(
            <div>
            <div className="logo"/>
            <WizTitle />
            <Route exact path="/fit-profile" component={ShareListWithRouter}/>
            <Route exact path="/fit-profile/update" component={CaptureList}/>
          </div>)} />
        <Route exact path="/shop" render={()=>(
            <div>
            <div className="logo"/>
            <Route exact path="/shop" component={Shop}/>
          </div>
          )}/>
        </div>
    </Router>, document.getElementById('containerWiz'));