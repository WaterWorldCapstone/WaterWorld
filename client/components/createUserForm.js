'use strict'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {donorSignup, vendorSignup} from '../store/user'
import Button from '@material-ui/core/Button'
// import Input from 'material-ui/core/Input'
// import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
// import Checkbox from 'material-ui/Checkbox'
// import SelectField from 'material-ui/SelectField'
// import MenuItem from 'material-ui/MenuItem'

class CreateUser extends Component {
  constructor() {
    super()
    this.state = {
      clicked: false,
      clicker: false
    }
  }
  handleSubmit = evt => {
    evt.preventDefault()
    const type = (this.state.clicked && 'vendor') || 'donor'
    const NU = {
      firstName: evt.target.firstName.value,
      lastName: evt.target.lastName.value,
      email: evt.target.email.value,
      password: evt.target.password.value,
      type,
      address: evt.target.address.value,
      country: evt.target.country && evt.target.country.value,
      continent: evt.target.continent && evt.target.continent.value,
      town: evt.target.town && evt.target.town.value,
      companyName: evt.target.companyName && evt.target.companyName.value
    }
    if (NU.type === 'vendor') {
      this.props.vendorLogin(NU)
    } else {
      this.props.donorLogin(NU)
    }
  }
  clicked = () => {
    this.setState({clicked: true, clicker: false})
  }
  clicker = () => {
    this.setState({clicked: false, clicker: true})
  }
  render() {
    const {error} = this.props
    return (
      <div className="container container__sign-in-form white z-depth-2 animated fadeIn">
        <div id="register" className="col s12">
          <form
            className="col s12 container__form"
            onSubmit={this.handleSubmit}
          >
            <div className="form-container">
              <h4 className="teal-text">Welcome</h4>
              <div className="row">
                <div className="input-field col s12 m6 l6">
                  <input
                    id="first_name"
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    required
                  />
                </div>
                <div className="input-field col s12 m6 l6">
                  <input
                    id="last_name"
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    minLength="8"
                  />
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <Button color="inherit" onClick={this.clicked}>
                      Vendor
                    </Button>
                    <Button color="inherit" onClick={this.clicker}>
                      Donor
                    </Button>
                  </div>
                  {this.state.clicker && (
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          id="address"
                          type="text"
                          name="address"
                          placeholder="Address"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {error && (
                <div className="error-container">{error.response.data}</div>
              )}
              <center>
                <Button
                  className="btn custom_btn waves-effect waves-light teal"
                  type="submit"
                  name="action"
                >
                  Submit
                </Button>
              </center>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const stateToProps = state => ({
  user: state.user,
  error: state.user.error
})

const mapToProps = dispatch => ({
  vendorLogin: user => dispatch(vendorSignup(user)),
  donorLogin: user => dispatch(donorSignup(user))
})

export default connect(stateToProps, mapToProps)(CreateUser)
