import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../constants'
import AppBar from '@material-ui/core/AppBar'
import {withStyles} from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
// import IconButton from '@material-ui/core/IconButton'

const styles = {
  root: {
    // flexGrow: 1
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
            <Link className="navbar-link" to="/donate">
              <Button color="inherit">Donate</Button>
            </Link>
          </div>
          <Button color="inherit">
            <Link className="navbar-link" to="/map">
              Map
            </Link>
          </Button>
          <Link className="navbar-link" to="/pools">
            <Button color="inherit">Pools</Button>
          </Link>
          <Link className="navbar-link" to="/auctions">
            <Button color="inherit">DEV-AUCTIONS</Button>
          </Link>
          {isLoggedIn ? (
            <div>
              <Button color="inherit" onClick={handleClick}>
                Log Out
              </Button>
              <Link className="navbar-link" to="/edit">
                <Button color="inherit">Edit</Button>
              </Link>
            </div>
          ) : (
            <div>
              <Link className="navbar-link" to="/login">
                <Button color="inherit">Login</Button>
              </Link>
              <Link className="navbar-link" to="/signup">
                <Button color="inherit">Sign Up</Button>
              </Link>
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
    // userType:
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
