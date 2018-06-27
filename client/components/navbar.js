import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import AppBar from '@material-ui/core/AppBar'
import {withStyles} from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
// import IconButton from '@material-ui/core/IconButton'

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}
const Navbar = props => {
  const {classes, isLoggedIn, handleClick} = props
  return (
    <div className={classes.root}>
      <AppBar position="static" id="navbar">
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            <Link to="/" className="navbar-link">
              Home
            </Link>
          </Typography>
          <div>
            <Button color="inherit">
              <Link className="navbar-link" to="/donate">
                Donate
              </Link>
            </Button>
          </div>
          <Button color="inherit">
            <Link className="navbar-link" to="/map">
              Map
            </Link>
          </Button>
          <Button color="inherit">
            <Link className="navbar-link" to="/pools">
              Pools
            </Link>
          </Button>
          {isLoggedIn ? (
            <div>
              <Button color="inherit" onClick={handleClick}>
                Log Out
              </Button>
              <Button color="inherit">
                <Link className="navbar-link" to="/signup">
                  Edit
                </Link>
              </Button>
            </div>
          ) : (
            <div>
              <Button color="inherit">
                <Link className="navbar-link" to="/login">
                  Login
                </Link>
              </Button>
              <Button color="inherit">
                <Link className="navbar-link" to="/signup">
                  Sign Up
                </Link>
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

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

export default withStyles(styles)(connect(mapState, mapDispatch)(Navbar))

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
}
