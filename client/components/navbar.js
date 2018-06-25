import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import AppBar from '@material-ui/core/AppBar'

const Navbar = ({handleClick, isLoggedIn}) => (
  <AppBar>
    <div>
      <nav>
        {isLoggedIn ? (
          <>'           '<span>
              <h1>
                WaterWorld <Link to="/">Home</Link>
                <Link href="#" onClick={handleClick}>
                  Logout
                </Link>
              </h1>
                         </span>'         '</>
        ) : (
          <>'           '<span>
              <h1>WaterWorld</h1>
              <Link to="/">Home</Link>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
                         </span>'         '</>
        )}
      </nav>
      <hr />
    </div>
  </AppBar>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
