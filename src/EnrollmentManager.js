"use strict"

import React, { Component } from 'react'
import { authGet } from '@stormgle/auth-client'

import { server } from './env'

class EnrollmentManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoices: null,
      err: null
    }
  }

  componentWillMount() {
    this._getBillingInvoices()
  }

  render() {
    if (this.state.invoices) {
      return(
        <div className="w3-container">
          
          <table className="w3-table w3-striped w3-bordered">
            <tbody>
              <tr>
                <th>Order Number</th>
                <th>User</th>
                <th>Courses</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
  
              {
                this.state.invoices.map(invoice => {
                  return (
                    <tr key={invoice.number} >
                      <td> {invoice.number} </td>
                      <td> {invoice.billTo.fullName || 'N/A'} </td>
                      <td> {
                        invoice.items.map(item => {
                          if (item.type === 'course') {
                            return (
                              <div key={item.code} >
                                <label className="w3-text-grey">{item.code}</label> <br/>
                                <span> {item.name} </span>
                              </div>
                            ) 
                          } else {
                            return null
                          }
                        })
                      } </td>
                      <td> {invoice.status} </td>
                      <td>Activate</td>
                    </tr>
                  )
                })
              }

            </tbody>
  
          </table>
        </div>
      )
    } else {
      return (
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
                <td>There is no new orders</td>
              </tr>
            </tbody>
  
          </table>
        </div>
      )
    }
    
  }

  _getBillingInvoices() {
    authGet({
      endPoint: `${server.dashboard}/billing`,
      service: 'admin',
      onSuccess: (data) => {
        this.setState({ invoices: data })
      },
      onFailure: ({status, err}) => {
        this.setState({err})
      }
    })
  }

}

module.exports = EnrollmentManager