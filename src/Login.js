"use strict"

import React, { Component } from 'react'

import { loginByPassword } from '@stormgle/auth-client'
import {server} from './env'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'admin@team.com',
      password: 'qwe',
      err: null
    }

    this.login = this.login.bind(this)

  }

  componentWillReceiveProps(props) {
    if (!props.show) {
      this.setState({username: '', password: '', err: null})
    }
  }

  render() {
    return(
      <div className="w3-container" style={{ marginTop: '32px' }}>
        <div style={{maxWidth: '480px', margin: 'auto'}}>

          <header className="w3-container "> 
            <h2 className="w3-text-green" style={{fontWeight: 'bold'}} > Login </h2>
          </header>

          <div className="w3-container" style={{marginBottom: '32px'}} >

            {
              this.state.err ?
                <p className="w3-text-dark-grey" style={{fontWeight: 'bold'}}>
                 Error <span className="w3-text-red">{this.state.err}</span>
                </p>
                :
                <p className="w3-text-dark-grey" style={{fontWeight: 'bold'}}>
                  Please enter <span className="w3-text-green">email</span> and <span className="w3-text-green">password</span>
                </p>
            }
            

            <p>
              <label>Email</label>
              <input  type="text" className="w3-input w3-border" 
                      value={this.state.username}
                      onChange={e => this.updateUsername(e.target.value)}
              /> 
            </p>
            <p>
              <label>Password</label>
              <input  type="password" className="w3-input w3-border" 
                      value={this.state.password}
                      onChange={e => this.updatePassword(e.target.value)}
              />
            </p>
          </div>

          <footer>
            <div className="w3-container w3-border-top" style={{padding: '16px', textAlign:'center'}} >
              <button className="w3-button w3-blue w3-hover-blue w3-large" 
                      style={{fontWeight: 'bold'}}
                      onClick={this.login} > 
                Login 
              </button>
            </div>
          </footer>

        </div>
      </div>
    )
  }

  updateUsername(username) {
    this.setState({ username })
  }

  updatePassword(password) {
    this.setState({ password })
  }

  login() {
    const username = this.state.username;
    const password = this.state.password;
    const endPoint =  `${server.auth}/auth/admin_login`;
    loginByPassword(
      endPoint,
      {username, password},
      {
        onSuccess: user => {
          console.log(user);
          this.setState({ err: null });
          this.props.onLoggedIn && this.props.onLoggedIn(user);
        },
        onFailure: err => {
          this.setState({ err })
        }
      }
    )
    
  }

}

module.exports = Login
