"use strict"

import React, { Component } from 'react'

class WaitingScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const display = this.props.show? 'block' : 'none'
    return (
      <div style={{display, position: 'fixed', top: 0, left: 0, paddingTop: '200px', textAlign: 'center', zIndex: 10, width: '100%', height: '100%', background: 'rgba(0,0,0,0.4)'}}>
        <h2 className="w3-text-white" style={{fontWeight: 'bold'}} > Processing </h2>
        <br />
        <i className="fa fa-spinner w3-xxlarge w3-text-white w3-spin" />
      </div>
    )
  }
}

module.exports = WaitingScreen