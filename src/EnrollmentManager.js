"use strict"

import React, { Component } from 'react'
import { authGet, authPost } from '@stormgle/auth-client'

import { server } from './env'
import { localeString } from './lib/util'
import WaitingScreen from './WaitingScreen'

class ConfirmPopup extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const display = this.props.show? 'block' : 'none';
    return (
      <div className="w3-modal" style={{display}}>
         <div className="w3-modal-content w3-animate-top">

          <header className="w3-container "> 
            <span onClick={this.props.cancel} 
                  className="w3-button w3-display-topright w3-red">&times;</span>
            <h2 className="w3-text-red" style={{fontWeight: 'bold'}} > Confirm </h2>
          </header>

          {
            this.props.invoice? 
              <div className="w3-container" style={{marginBottom: '32px'}} >
                <p className="w3-text-grey" style={{fontStyle: 'italic'}}> Please confirm your below action: </p> 
                
                <p className="w3-large w3-text-orange" style={{fontWeight: 'bold'}}> 
                  Activate Enrollment
                </p>
                <hr />

                <p> Order: <span style={{fontWeight: 'bold'}}> {this.props.invoice.number} </span> </p>
                <p> BillTo: {this.props.invoice.billTo.fullName} </p>
                <p> SubTotal: <span className="w3-text-red"> {localeString(this.props.invoice.subTotal)} {'\u20ab'}</span> </p>

                <hr />

                <p className="w3-large w3-text-blue-grey" style={{fontStyle: 'italic'}}> Courses will be activated </p>
                <ul className = "w3-ul"> 
                {
                  this.props.invoice.items.map(item => {
                    if (item.type === 'course') {
                      return (
                        <li key={item.code} style={{fontWeight: 'bold'}}>
                          <span className="w3-text-grey"> {item.code} </span>
                          <br />
                          <span > {item.name} </span>
                        </li>
                      )
                    }
                  })
                }
                </ul>
              </div>
            
            : null  

          }
          
          <footer className="w3-container w3-padding">     
            <div className="w3-right" style={{marginBottom: '8px'}}>    
              <button className="w3-button w3-large" onClick={this.props.cancel} > Cancel </button> 
              <span> </span>                     
              <button className="w3-button w3-blue w3-large" onClick={this.props.onConfirm} > Confirm </button>
            </div>
          </footer>

        </div>
      </div>
    )
  }
}

class EnrollmentManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoices: null,
      err: null,
      showConfirmPopup: false,
      currentInvoice: null,
      showWaitingScreen: false
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
                <th>Bill To</th>
                <th>Courses</th>
                <th>Status</th>
                <th style={{textAlign: 'center'}}>Action</th>
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
                      <td> {invoice.status} <br /> <span className="w3-text-red"> {localeString(invoice.subTotal)} {'\u20ab'} </span> </td>
                      <td style={{textAlign:'center'}}> 
                        {/* <button className="w3-button w3-hover-blue" onClick={() => this.activate(invoice)}> Activate </button> */}
                        <button className="w3-button w3-hover-blue" onClick={() => this.openConfirmPopup(invoice)}> Activate </button>
                      </td>
                    </tr>
                  )
                })
              }

            </tbody>
  
          </table>
        
          <ConfirmPopup show = {this.state.showConfirmPopup} 
                        invoice = {this.state.currentInvoice}
                        cancel =  {() => this.setState({currentInvoice: null, showConfirmPopup : false})}
                        onConfirm = {() => this.activate()}
          />

          <WaitingScreen show = {this.state.showWaitingScreen}
          />

        </div>
      )
    } else {
      return (
        <div className="w3-container">
          
          <h3 style={{fontStyle: 'italic'}}> There is no new orders </h3>

        </div>
      )
    }
    
  }

  openConfirmPopup(invoice) {
    this.setState({ showConfirmPopup: true, currentInvoice: invoice })
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

  activate() {

    const invoice = this.state.currentInvoice;

    const courses = [];
    invoice.items.forEach(item => {
      if (item.type === 'course') {
        courses.push(item.code)
      }
    })

    this.setState({ showWaitingScreen: true })
    
    authPost({
      endPoint: `${server.dashboard}/activate`,
      service: 'admin',
      data: { 
        invoice: {
          number: invoice.number,
          billTo: { uid: invoice.billTo.uid },
          courses
        }
      },
      onSuccess: (data) => {
        console.log(data)
        this.setState({ showConfirmPopup: false, currentInvoice: null, showWaitingScreen: false })
      },
      onFailure: ({status, err}) => {
       console.log(err)
      }
    })
  }

}

module.exports = EnrollmentManager