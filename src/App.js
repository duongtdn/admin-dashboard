"use strict"

import React, { Component } from 'react'

import Header from './Header'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div >
        <Header />
      </div>
    )
  }
}

module.exports = App