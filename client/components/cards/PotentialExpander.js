import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'
import Paper from '@material-ui/core/Paper'
import Grow from '@material-ui/core/Grow'

const styles = theme => ({
  root: {
    height: 180
  },
  container: {
    display: 'flex'
  },
  paper: {
    margin: theme.spacing.unit
  },
  svg: {
    width: 100,
    height: 100
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1
  },
  expanderRoot: {
    width: 20
  }
})

class PotentialExpander extends React.Component {
  state = {
    checked: false
  }

  handleClick = () => {
    this.setState({checked: !this.state.checked})
  }

  render() {
    const {classes} = this.props
    const {checked} = this.state

    return (
      <div className={classes.root}>
        <img
          className={classes.expanderRoot}
          src="https://png.pngtree.com/element_pic/00/16/07/255794e8a47f328.jpg"
          onClick={this.handleClick}
          aria-label="collapse"
        />
        <div className={classes.container}>
          <Grow in={checked}>
            <img src="http://apollo-pbe-uploads.s3.amazonaws.com/1387569519791/LoL_minimap.png" />
          </Grow>
        </div>
      </div>
    )
  }
}

PotentialExpander.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PotentialExpander)
