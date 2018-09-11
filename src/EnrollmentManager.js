"use strict"

import React, { Component } from 'react'

class EnrollmentManager extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="w3-container">
        
        <table className="w3-table">
          <tbody>
            <tr>
              <th>Order Number</th>
              <th>User</th>
              <th>Courses</th>
              <th>Action</th>
            </tr>

          
            <tr>
              <td>180911</td>
              <td>Awesome Tester</td>
              <td>Emb01</td>
              <td>Activate</td>
            </tr>
          </tbody>

        </table>
      </div>
    )
  }
}

module.exports = EnrollmentManager