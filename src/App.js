"use strict"

import React, { Component } from 'react'

import Header from './Header'
import EnrollmentManager from './EnrollmentManager'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div >
        <Header user={this.props.user} onLoggedOut={this.props.onLoggedOut} />
        <EnrollmentManager />
      </div>
    )
  }
}

module.exports = App