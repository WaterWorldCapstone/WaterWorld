import React, {Component} from 'react'
import {Grid, withStyles, Typography} from '@material-ui/core'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
const styles = theme => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
    textAlign: 'center'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
})

class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render = () => {
    const {classes} = this.props
    return (
      <Grid container spacing={24}>
        <Grid id="footerImg" item xs={6}>
          <img src="https://www.fullstackacademy.com/images/fa-logo.png" />
        </Grid>
        <Grid id="footerText" item xs={6}>
          <Typography>Developed By:</Typography>
          <Typography>
            <Link to="https://github.com/Delune">Jesse Sullivan</Link>,<Link to="https://github.com/dk268">
              {' '}
              Daniel Kerr
                                                                       </Link>
          </Typography>
          <Typography>
            <Link to="https://github.com/teresay">Teresa Li</Link>,<Link to="https://github.com/mounamallipeddi">
              {' '}
              Mouna Mallipeddi
                                                                   </Link>
          </Typography>
        </Grid>
      </Grid>
    )
  }
}
Footer.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Footer)
