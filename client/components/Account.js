'use strict'

import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {donorSignup, editUser} from '../store/user'
import {
  Button,
  withStyles,
  TextField,
  Paper,
  Typography
} from '@material-ui/core'
import PropTypes from 'prop-types'
import {
  populateForm,
  writeFirstName,
  writeLastName,
  writeEmail,
  writePassword,
  writeAddress
} from '../store/form'
import {getPastDonations} from '../store/donation'
import SinglePoolCard from './SinglePoolCard'

const styles = theme => ({
  root: {
    margin: `0 7% 0 7%`,
    padding: `0 7%`
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

class Account extends Component {
  componentDidMount = () => {
    this.props.populateForm()
    this.props.getPastDonations(2)
  }

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
      address: evt.target.address.value,
      id: this.props.user.id
    }
    this.props.editUser(NU)
  }

  handleChange = evt => {
    const val = evt.target.value
    switch (evt.target.name) {
      case 'firstName': {
        this.props.writeFirstName(val)
        break
      }
      case 'lastName': {
        this.props.writeLastName(val)
        break
      }
      case 'address': {
        this.props.writeAddress(val)
        break
      }
      case 'email': {
        this.props.writeEmail(val)
        break
      }
      case 'password': {
        this.props.writePassword(val)
        break
      }
      default:
        break
    }
  }

  render() {
    const {classes, error, form, pastDonations} = this.props
    return (
      <div id="donor-edit-master-div">
        <Paper className={classes.root}>
          {' '}
          <Typography id="donor-edit-welcome-typography" variant="title">
            Welcome to profile edit!{'\n'}
            <br />
            {`\nIf you prefer to be anonymous, leave the First Name and Last Name fields blank.`}
          </Typography>
        </Paper>
        <form onSubmit={this.handleSubmit}>
          <div id="donor-edit-form-div">
            <Paper id="donor-edit-paper">
              <div className="edit-column">
                <TextField
                  id="donor-edit-first-name"
                  label="First Name"
                  className={classes.textField}
                  margin="normal"
                  name="firstName"
                  placeholder="First Name"
                  onChange={this.handleChange}
                  value={form.firstName}
                />
                <TextField
                  id="donor-edit-last-name"
                  label="Last Name"
                  className={classes.textField}
                  margin="normal"
                  placeholder="Last Name"
                  name="lastName"
                  onChange={this.handleChange}
                  value={form.lastName}
                />
                <TextField
                  id="donor-edit-address"
                  label="Address"
                  margin="normal"
                  className={classes.textField}
                  name="address"
                  placeholder="Address"
                  onChange={this.handleChange}
                  value={form.address}
                />
              </div>
              {/* <div className="edit-column" id="donor-edit-email-pw-row">
                <TextField
                  id="donor-edit-email"
                  label="E-mail"
                  margin="normal"
                  className={classes.textField}
                  name="email"
                  placeholder="E-mail"
                  required
                  onChange={this.handleChange}
                  value={form.email}
                />
                <TextField
                  id="donor-edit-password"
                  label="Password"
                  margin="normal"
                  className={classes.textField}
                  name="password"
                  placeholder="Password"
                  type="password"
                  required
                  onChange={this.handleChange}
                  value={form.password}
                />
              </div> */}
            </Paper>
          </div>
          <div id="donor-edit-buttons-div">
            <Button
              type="submit"
              id="donor-edit-submit-button"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              submit
            </Button>
          </div>
        </form>
        <div>
          {pastDonations ? (
            <div id="profile-past-donations">
              {' '}
              {pastDonations.map(elem => <SinglePoolCard pool={elem} />)}{' '}
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    )
  }
}

const stateToProps = state => ({
  user: state.user,
  error: state.user.error,
  form: state.form,
  pastDonations: state.donation.pastDonations
})

const mapToProps = {
  populateForm,
  editUser,
  writeFirstName,
  writeLastName,
  writeEmail,
  writePassword,
  writeAddress,
  getPastDonations
}

Account.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(connect(stateToProps, mapToProps)(Account))
