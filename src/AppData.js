"use strict"

import React, { Component } from 'react'
import auth, { isLoggedUser, getUser, logout, authGet } from '@stormgle/auth-client'

class AppData extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div >
        <h3>Dashboard</h3>
      </div>
    )
  }
}

module.exports = AppData