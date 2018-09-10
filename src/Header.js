"use strict"

import React, { Component } from 'react'

import auth, { logout, authGet } from '@stormgle/auth-client'
import { bindUserProvider  } from '@stormgle/react-user'
// import LoginPanel from './popup/LoginPanel'

class LoginPopup extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const display = this.props.show? 'block' : 'none'
    return(
      <div className="w3-modal" style={{ display }}>
        <div className="w3-modal-content w3-animate-top">

          <header className="w3-container "> 
            <span onClick={this.props.cancel} 
                  className="w3-button w3-display-topright w3-red">&times;</span>
            <h2 className="w3-text-green" style={{fontWeight: 'bold'}} > Login </h2>
          </header>

          <div className="w3-container" style={{marginBottom: '32px'}} >

            <p className="w3-text-dark-grey" style={{fontWeight: 'bold'}}>
              Please enter <span className="w3-text-green">email</span> and <span className="w3-text-green">password</span>
            </p>

            <p>
              <label>Email</label>
              <input type="text" className="w3-input w3-border" /> 
            </p>
            <p>
              <label>Password</label>
              <input type="password" className="w3-input w3-border" />
            </p>
          </div>

          <footer>
            <div className="w3-container w3-border-top" style={{padding: '16px', textAlign:'center'}} >
              <button className="w3-button w3-blue w3-hover-blue w3-large" style={{fontWeight: 'bold'}}> Login </button>
            </div>
          </footer>

        </div>
      </div>
    )
  }
}

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLogin: false
    }

    const methods = [
     
    ]
    methods.forEach( method => this[method] = this[method].bind(this) )

  }

  componentWillReceiveProps(props) {
    if (props.showLoginPanel) {      
     this.login(props.showLoginPanel)
    }
    if (typeof window !== 'undefined' && !this.props.user && props.user) {
      // user just logged in
      // this._updateUserServiceData(props.user)
    }
  }

  render() {
    return (
      <div className="w3-container w3-bar">
        <div className="w3-bar-item" > <h2> Dashboard </h2> </div>


        {/* render for medium and large device */}

        {
          (this.props.user)? 
            <div className="w3-bar-item w3-right w3-hide-small" style={{marginTop: '16px'}}> 
              <div className="w3-bar-item"> {this.props.user.fullName || this.props.user.username} </div>
              <button className="w3-button w3-large w3-border w3-border-blue-grey w3-round" onClick={this.logout}> Logout </button>
            </div>
          :
            <div className="w3-bar-item w3-right w3-hide-small" style={{marginTop: '16px'}}>               
              <button className="w3-button w3-large w3-border w3-blue w3-card-4 w3-round" onClick={() => this.setState({showLogin: true})}> Login </button>
            </div>
        }
        
        <div className="w3-bar-item w3-right w3-hide-small w3-border-right" style={{marginTop: '16px'}}> 
          <a href="#" className="w3-bar-item w3-button no-outline">Home</a>
        </div>

        <LoginPopup show = {this.state.showLogin} 
                    cancel = {() => this.setState({showLogin: false})}
                    
        />

      </div>
    )
  }

  
  login() {
    console.log('login')
    this.setState({ showLogin: true })
  }

  logout() {
    logout()
  }

  closeLogin() {
    this.setState({ showLogin: false, showSidebar: false })
    this.props.onLoginPanelClosed && this.props.onLoginPanelClosed();
  }

 
}

module.exports = bindUserProvider(Header)
