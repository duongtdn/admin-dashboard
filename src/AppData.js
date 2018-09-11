"use strict"

import React, { Component } from 'react'
import { isLoggedUser, getUser } from '@stormgle/auth-client'

import App from './App'
import Login from './Login'

class AppData extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: undefined
    }
  }

  componentWillMount() {
    if (isLoggedUser()) {
      this.setState({user: getUser()})
    }
  }

  render() {
    if (this.state.user) {
      return(
        <App user={this.state.user} onLoggedOut={() => this.setState({user: undefined})} />
       )
    } else {
      return (
        <Login onLoggedIn={user => this.setState({user})} />
      )
    }
  }
}

module.exports = AppData