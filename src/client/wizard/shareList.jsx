import React, { Component } from 'react';
import { render } from 'react-dom';
import CaptureList from './captureList.jsx';
import WizTitle from './wizTitle.jsx';
import Shop from './shop.jsx';
// Import routing components
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class ShareList extends Component {
    propTypes: {
      match: PropTypes.object.isRequired,
      location: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired
    }
    componentDidMount(){
      console.log('this.props.history:',this.props.history);
      var h = this.props.history;
      window.onCaptureComplete = function() {
        h.push('/share-list/update');
        $('#snap').hide();
      }
    }
    render(){
        const { match, location, history } = this.props;
        return (<div>
                <div className="content">
                <div id="selfieMsg">Once your shopping list is ready, tap the below green button.</div>
                  <div><img id="micIcon" src="img/mic.png" style={{width:'85px',marginTop:'80px'}}></img></div>
                  <div className="btn" style={{margin:'0 auto',zIndex:0,marginTop:'100px'}}>
              <span>Read out shopping list</span>
            </div>
                </div> 
              </div>
          );
    }
}

var ShareListWithRouter = withRouter(ShareList)

render(<Router>
        <div>
        <Route path="/share-list" render={()=>(
            <div>
            <div className="logo"/>
            <WizTitle />
            <Route exact path="/share-list" component={ShareListWithRouter}/>
            <Route exact path="/share-list/update" component={CaptureList}/>
          </div>)} />
        <Route exact path="/shop" render={()=>(
            <div>
            <div className="logo"/>
            <Route exact path="/shop" component={Shop}/>
          </div>
          )}/>
        </div>
    </Router>, document.getElementById('containerWiz'));