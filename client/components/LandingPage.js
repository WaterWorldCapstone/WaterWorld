import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Typography} from 'material-ui/styles/typography'
import SimpleCard from './cards/ExampleCard.js'
import ExampleMediaCard from './cards/ExampleMediaCard.js'
import {withStyles, Paper, Grid} from '@material-ui/core'
import {connect} from 'react-redux'
import ExampleMusicCard from './cards/ExampleMusicCard.js'
import PropTypes from 'prop-types'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
})

class LandingPage extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {classes} = this.props
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <Typography variant="headline">Waterworld</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <img src="http://i1.wp.com/metrocosm.com/wp-content/uploads/2016/10/population-3d-globe.gif?zoom=1.25&resize=500%2C253" />{' '}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper>
            This is a full-length grid item where maybe we can put a ticker.
          </Paper>
        </Grid>
        <Grid item xs={4} sm={2}>
          <SimpleCard />
        </Grid>
        <Grid item xs={4} sm={2}>
          <ExampleMediaCard />
        </Grid>
        <Grid item xs={4} sm={2}>
          <ExampleMusicCard />
        </Grid>
      </Grid>
    )
  }
}

LandingPage.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LandingPage)
