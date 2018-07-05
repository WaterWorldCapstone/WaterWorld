import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {login} from '../store'
import Button from '@material-ui/core/Button'
import {TextField, withStyles as withStylez} from '@material-ui/core'

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

const AuthForm = props => {
  const {name, classes, handleSubmit, error, emaildata, passdata} = props
  console.log(props)

  return (
    <div className="container container__sign-in-form white z-depth-2 animated fadeIn">
      <div id="login" className="login">
        <center>
          <form
            id="login"
            className="col s12 container__form"
            onSubmit={handleSubmit}
            name={name}
          >
            <div className="form-container">
              <h4 className="teal-text">Sign in via email and password!</h4>
              <div className="row">
                <div id="donor-login-email" className="input-field col s12">
                  <TextField
                    label="E-mail"
                    margin="normal"
                    className={classes.textField}
                    name="email"
                    placeholder="E-mail"
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div id="donor-login-password" className="input-field col s12">
                  <TextField
                    label="Password"
                    margin="normal"
                    className={classes.textField}
                    name="password"
                    placeholder="Password"
                    type="password"
                    required
                  />
                </div>
              </div>
              {error &&
                (emaildata === '' ? (
                  <div className="error-container">Please enter email</div>
                ) : passdata === '' ? (
                  <div className="error-container">Please enter password</div>
                ) : (
                  <div className="error-container">{error.response.data}</div>
                ))}
              <br />
              <center>
                <Button
                  className="btn custom_btn waves-effect waves-light teal"
                  color="primary"
                  variant="contained"
                  type="submit"
                  name="action"
                  onSubmit={handleSubmit}
                >
                  Sign In
                </Button>
                <br />
                {error ? <p>{emaildata || passdata}}</p> : ''}
                <p id="sign-in-with">or sign in with</p>
                <a href="/auth/google">
                  <div className="btn_google">
                    <img src="http://icons.iconarchive.com/icons/marcus-roberto/google-play/48/Google-Chrome-icon.png" />
                    <p className="oauth-text">Google</p>
                  </div>
                </a>
                <a href="/auth/facebook">
                  <div className="btn_google">
                    <img src="http://icons.iconarchive.com/icons/yootheme/social-bookmark/48/social-facebook-box-blue-icon.png" />
                    <p className="oauth-text">Facebook</p>
                  </div>
                </a>
              </center>
            </div>
          </form>
        </center>
      </div>
    </div>
  )
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
    emaildata:
      state.user.error &&
      state.user.error.config &&
      state.user.error.config.data.email,
    passdata:
      state.user.error &&
      state.user.error.config &&
      state.user.error.config.data.password
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(login(email, password))
    }
  }
}

export const Login = withStylez(styles)(
  connect(mapLogin, mapDispatch)(AuthForm)
)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
  classes: PropTypes.object.isRequired
}
