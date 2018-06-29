import React, {Component} from 'react'
import {vendorSignup} from '../store'
import {connect} from 'react-redux'
import {
  Button,
  withStyles,
  TextField,
  Paper,
  Typography
} from '@material-ui/core'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {MenuItem} from 'material-ui'

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

//first last company
//town country continent
//address email pw

class CreateVendor extends Component {
  constructor(props) {
    super(props)
  }
  handleSubmit = evt => {
    evt.preventDefault()
    const NU = {
      firstName: evt.target.firstName.value,
      lastName: evt.target.lastName.value,
      email: evt.target.email.value,
      password: evt.target.password.value,
      type: 'vendor',
      address: evt.target.address.value,
      country: evt.target.country && evt.target.country.value,
      continent: evt.target.continent && evt.target.continent.value,
      town: evt.target.town && evt.target.town.value,
      companyName: evt.target.companyName && evt.target.companyName.value
    }
    this.props.vendorSignup(NU)
  }
  render = () => {
    const {classes} = this.props
    const {error} = this.props
    return (
      <div className="row">
        <Paper className={classes.root}>
          {' '}
          <Typography id="vendor-welcome-typography" variant="title">
            Welcome to vendor signup!
          </Typography>
        </Paper>
        <form onSubmit={this.handleSubmit} id="vendor-signup-form">
          <div id="vendor-signup-form-div">
            <Paper id="vendor-signup-paper">
              <div className="signup-column">
                <TextField
                  id="vendor-signup-first-name"
                  label="First Name"
                  className={classes.textField}
                  margin="normal"
                  name="firstName"
                  placeholder="First Name"
                  required
                />

                <TextField
                  id="vendor-signup-last-name"
                  label="Last Name"
                  className={classes.textField}
                  margin="normal"
                  placeholder="Last Name"
                  name="lastName"
                  required
                />

                <TextField
                  id="vendor-signup-company-name"
                  label="Company Name"
                  margin="normal"
                  className={classes.textField}
                  name="companyName"
                  placeholder="Company Name"
                  required
                />
              </div>

              <div className="signup-column">
                <TextField
                  id="vendor-signup-town"
                  label="Town"
                  margin="normal"
                  className={classes.textField}
                  name="town"
                  placeholder="Town"
                  required
                />

                <TextField
                  id="vendor-signup-country"
                  label="Country"
                  margin="normal"
                  className={classes.textField}
                  name="country"
                  placeholder="Country"
                  required
                />

                <TextField
                  id="vendor-signup-continent"
                  label="Continent"
                  margin="normal"
                  className={classes.textField}
                  name="continent"
                  placeholder="Continent"
                  required
                />
              </div>
              <div className="signup-column">
                <TextField
                  id="vendor-signup-address"
                  label="Address"
                  margin="normal"
                  className={classes.textField}
                  name="address"
                  placeholder="Address"
                  required
                />
                <TextField
                  id="vendor-signup-email"
                  label="E-mail"
                  margin="normal"
                  className={classes.textField}
                  name="email"
                  placeholder="E-mail"
                  required
                />
                <TextField
                  id="vendor-signup-password"
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
          <div id="vendor-signup-buttons-div">
            <Button
              type="submit"
              id="vendor-signup-submit-button"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Sign up
            </Button>
            <Button
              color="secondary"
              className={classes.button}
              component={Link}
              to="/signup"
            >
              -> user signup
            </Button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  error: state.user.error
})
const mapDispatchToProps = {
  vendorSignup
}

CreateVendor.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(CreateVendor)
)
