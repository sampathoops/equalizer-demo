import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';

class CaptureList extends Component {
    componentDidMount(){
      $('.content').fadeOut(0).fadeIn(300);
      $('.outline').hide();
      setTimeout("streamTrack.stop();",3000);
    }
    render(){
        return (<div className="content">
            <div style={{fontSize:'22px',textAlign:'center',lineHeight:'28px',paddingTop:'6px'}}>Congratulations!</div>
            <div style={{fontSize:'18px',textAlign:'center',lineHeight:'28px',paddingTop:'40px'}}>Your shopping list has been captured! See you at the store.</div>
            <img src="../img/success.png"  style={{margin:'0 auto',width:'200px',padding:'40px'}}/>
            <Link to="/shop" className="btn" style={{margin:'0 auto',zIndex:0,marginTop:'24px'}}>
              <span>Let's shop!</span>
            </Link>
          </div>
          );
    }
}

export default CaptureList;