"use strict"

import React, { Component } from 'react'
import auth, { isLoggedUser, getUser, logout, authGet } from '@stormgle/auth-client'

import App from './App'

class AppData extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
     <App />
    )
  }
}

module.exports = AppData