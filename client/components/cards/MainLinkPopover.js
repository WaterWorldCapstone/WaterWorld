import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Popover from '@material-ui/core/Popover'
import ExampleMediaCard from './ExampleMediaCard'
import {Paper} from 'material-ui'
import {Card, CardContent} from '@material-ui/core'

const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2
  }
})

class MainLinkPopover extends React.Component {
  state = {
    anchorEl: null
  }

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    })
  }

  handleClose = () => {
    this.setState({
      anchorEl: null
    })
  }

  render() {
    const {classes} = this.props
    const {anchorEl} = this.state

    return (
      <div>
        {/* <img
          className={classes.expanderRoot}
          src="http://i1.wp.com/metrocosm.com/wp-content/uploads/2016/10/population-3d-globe.gif?zoom=1.25&resize=500%2C253"
          onClick={this.handleClick}
          aria-label="collapse"
        /> */}
        <div className="earth" />
        <h3>WHATERVER</h3>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          <Card>
            <CardContent>
              <Typography>
                YOU HAVE BEEN REDIRECTED TO /MAP OR WHATERVER!!{' '}
              </Typography>
            </CardContent>
          </Card>
        </Popover>
      </div>
    )
  }
}

MainLinkPopover.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MainLinkPopover)
