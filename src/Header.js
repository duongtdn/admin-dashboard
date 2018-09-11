"use strict"

import React, { Component } from 'react'

import { logout } from '@stormgle/auth-client'

class Header extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    if (this.props.user) {
      return (
        <div className="w3-container w3-bar">
          <div className="w3-bar-item" > <h2> Dashboard </h2> </div>
  
  
          {/* render for medium and large device */}
  
          <div className="w3-bar-item w3-right w3-hide-small" style={{marginTop: '16px'}}> 
            <div className="w3-bar-item"> {this.props.user.fullName || this.props.user.username} </div>
            <button className="w3-button w3-large w3-border w3-border-blue-grey w3-round" onClick={() => this.logout()}> Logout </button>
          </div>
        
          <div className="w3-bar-item w3-right w3-hide-small w3-border-right" style={{marginTop: '16px'}}> 
            <a href="#" className="w3-bar-item w3-button no-outline">Home</a>
          </div>
  
        </div>
      )
    } else {
      return null
    }
    
  }

  
  logout() {
    console.log('logout')
    logout()
    this.props.onLoggedOut && this.props.onLoggedOut();
  }

 
}

module.exports = Header
