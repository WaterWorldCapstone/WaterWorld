'use strict'

import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {donorSignup} from '../store/user'
import {
  Button,
  withStyles,
  TextField,
  Paper,
  Typography
} from '@material-ui/core'
import PropTypes from 'prop-types'

const styles = theme => ({
  root: {
    margin: '10px 10% 0 0',
    padding: '10px 0 10px 0'
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  }
})

class CreateDonor extends Component {
  handleSubmit = evt => {
    evt.preventDefault()
    let anonymous = false
    if (!evt.target.firstName.value || !evt.target.lastName.value) anonymous = true
    const NU = {
      firstName: anonymous ? `anonymous` : evt.target.firstName.value,
      lastName: anonymous ? `donor` : evt.target.lastName.value,
      email: evt.target.email.value,
      password: evt.target.password.value,
      type: 'donor',
      address: evt.target.address.value
    }
    this.props.donorLogin(NU)
  }

  render() {
    const {error} = this.props
    const {classes} = this.props
    return (
      <div id="donor-signup-master-div">
        <Paper className={classes.root}>
          {' '}
          <Typography id="vendor-welcome-typography" variant="title">
            Welcome to donor signup!{' '}
            {`\nIf you prefer to be anonymous, leave the First Name and Last Name fields blank.`}
          </Typography>
        </Paper>
        <form onSubmit={this.handleSubmit}>
          <div id="donor-signup-form-div">
            <Paper id="donor-signup-paper">
              <div className="signup-column">
                <TextField
                  id="donor-signup-first-name"
                  label="First Name"
                  className={classes.textField}
                  margin="normal"
                  name="firstName"
                  placeholder="First Name"
                />
                <TextField
                  id="donor-signup-last-name"
                  label="Last Name"
                  className={classes.textField}
                  margin="normal"
                  placeholder="Last Name"
                  name="lastName"
                />
                <TextField
                  id="donor-signup-address"
                  label="Address"
                  margin="normal"
                  className={classes.textField}
                  name="address"
                  placeholder="Address"
                />
              </div>
              <div className="signup-column" id="donor-signup-email-pw-row">
                <TextField
                  id="donor-signup-email"
                  label="E-mail"
                  margin="normal"
                  className={classes.textField}
                  name="email"
                  placeholder="E-mail"
                  required
                />
                <TextField
                  id="donor-signup-password"
                  label="Password"
                  margin="normal"
                  className={classes.textField}
                  name="password"
                  placeholder="Password"
                  type="password"
                  required
                />
              </div>
            </Paper>
          </div>
          <div id="donor-signup-buttons-div">
            <Button
              type="submit"
              id="donor-signup-submit-button"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Sign Up
            </Button>
            <Button
              color="secondary"
              className={classes.button}
              component={Link}
              to="/vendor-signup"
            >
              to vendor signup
            </Button>
          </div>
        </form>
      </div>
    )
  }
}

const stateToProps = state => ({
  user: state.user,
  error: state.user.error
})

const mapToProps = dispatch => ({
  donorLogin: user => dispatch(donorSignup(user))
})

CreateDonor.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(
  connect(stateToProps, mapToProps)(CreateDonor)
)
