import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Popover from '@material-ui/core/Popover'
import ExampleMediaCard from './ExampleMediaCard'

const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2
  },
  expanderRoot: {
    width: 50
  }
})

class InfoPopover extends React.Component {
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
        <img
          className={classes.expanderRoot}
          src="https://images.pexels.com/photos/40784/drops-of-water-water-nature-liquid-40784.jpeg?auto=compress&cs=tinysrgb&h=350"
          onClick={this.handleClick}
          aria-label="collapse"
        />
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
          <ExampleMediaCard />
        </Popover>
      </div>
    )
  }
}

InfoPopover.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(InfoPopover)
