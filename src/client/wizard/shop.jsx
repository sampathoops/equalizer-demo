import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';

class Shop extends Component {

    componentDidMount(){
      
    }
    render(){
        return (<div className="contentShop" style={{minHeight:'100vh',width:'100%'}}>
          
          <div className="products">
            <div className="product" id="product">
            </div>
          </div>

        <div id="tabs" style={{display:'inline',position: 'fixed',width:'100%',top:'0px',left:'0px',height:'70px',textAlign:'center',padding:'22px'}}>


        <div id="tabs-container">
          <ul className="tabs-menu">
              <li className="current"><a href="#tab-1">Item1</a></li>
              <li><a href="#tab-2">Item2</a></li>
              <li><a href="#tab-3">Item3</a></li>
              <li><a href="#tab-4">Item4</a></li>
          </ul>
          <div className="tab">
              <div id="tab-1" className="tab-content">
                 
              </div>
              <div id="tab-2" className="tab-content">
                 
              
              </div>
              <div id="tab-3" className="tab-content">
                  
              </div>
              <div id="tab-4" className="tab-content">
                 
              </div>
          </div>

        </div>
        </div>
        </div>

          );
    }
}

export default Shop;