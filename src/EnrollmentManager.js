"use strict"

import React, { Component } from 'react'
import { authGet } from '@stormgle/auth-client'

import { server } from './env'

class EnrollmentManager extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this._getBillingInvoices()
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

  _getBillingInvoices() {
    authGet({
      endPoint: `${server.dashboard}/billing`,
      service: 'admin',
      onSuccess: (data) => {
        console.log(data)
      },
      onFailure: ({status, err}) => {
        console.log(err)
      }
    })
  }

}

module.exports = EnrollmentManager