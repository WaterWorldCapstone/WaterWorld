import React, {Component} from 'react'
import {Grid, withStyles, Typography} from '@material-ui/core'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
const styles = theme => ({
  root: {
    backgroundColor: `white`
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
    this.state = {
      path: this.props.match.path
    }
  }
  render = () => {
    console.log(this.props, this.props.match.path === `/map`)
    const {classes} = this.props
    const {path} = this.state
    console.log(path, typeof path, this.props.match.url)
    return (
      <Grid
        container
        spacing={24}
        id={path === `/map` ? `footer-container-whitened` : ``}
      >
        <Grid id="footerImg" item xs={6}>
          <img src="https://www.fullstackacademy.com/images/fa-logo.png" />
        </Grid>
        <Grid id="footerText" item xs={6}>
          <Typography>Developed By:</Typography>
          <Typography>
            <a target="_blank" href="//github.com/Delune">
              Jesse Sullivan
            </a>,<a target="_blank" href="https://github.com/dk268">
              {' '}
              Daniel Kerr
                 </a>
          </Typography>
          <Typography>
            <a target="_blank" href="https://github.com/teresay">
              Teresa Li
            </a>,<a target="_blank" href="https://github.com/mounamallipeddi">
              {' '}
              Mouna Mallipeddi
                 </a>
          </Typography>
        </Grid>
      </Grid>
    )
  }
}
Footer.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(Footer))
