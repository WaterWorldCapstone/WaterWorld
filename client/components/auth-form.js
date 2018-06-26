import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {login} from '../store'
import Button from '@material-ui/core/Button'

const AuthForm = props => {
  const {name, handleSubmit, error, emaildata, passdata} = props

  return (
    <div className="container container__sign-in-form white z-depth-2 animated fadeIn">
      <div id="login" className="col s12">
        <form
          className="col s12 container__form"
          onSubmit={handleSubmit}
          name={name}
        >
          <div className="form-container">
            <h4 className="teal-text">Hello</h4>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
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
                type="submit"
                name="action"
                onSubmit={handleSubmit}
              >
                Sign In
              </Button>
              <br />
              <p>Sign in with</p>
              <a href="/auth/google">
                <div className="btn_google">
                  <img src="/img/btn_google.svg" />
                  <p>Google</p>
                </div>
              </a>
              <a href="/auth/facebook">
                <div className="btn_google">
                  <img src="/img/btn_facebook.svg" />
                  <p>Facebook</p>
                </div>
              </a>
            </center>
          </div>
        </form>
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

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
