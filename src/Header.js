"use strict"

import React, { Component } from 'react'

import { logout } from '@stormgle/auth-client'

class Header extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    if (this.props.user) {
      let displayName = 'Unknown';
      if (this.props.user) {
        if (this.props.user.profile && this.props.user.profile.displayName) {
          displayName = this.props.user.profile.displayName
        } else {
          displayName = this.props.user.username
        }
      }
      return (
        <div className="w3-container w3-bar">
          <div className="w3-bar-item" > <h2> Dashboard </h2> </div>
  
  
          {/* render for medium and large device */}
  
          <div className="w3-bar-item w3-right w3-hide-small" style={{marginTop: '16px'}}> 
            <div className="w3-bar-item"> {displayName} </div>
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
