import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import SimpleCard from './cards/ExampleCard.js'
import ExampleMediaCard from './cards/ExampleMediaCard.js'
import {Paper, Grid, withStyles, Typography} from '@material-ui/core'
import {connect} from 'react-redux'
import ExampleMusicCard from './cards/ExampleMusicCard.js'
import PropTypes from 'prop-types'

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

const LandingPage = props => {
  const {classes} = props
  return (
    <Grid
      container
      className={classes.root}
      spacing={24}
      id="landing-page-grid"
      justify="center"
    >
      <Grid item xs={12}>
        <Typography variant="headline">Waterworld</Typography>
      </Grid>
      <Grid item xs={12}>
        <img src="http://i1.wp.com/metrocosm.com/wp-content/uploads/2016/10/population-3d-globe.gif?zoom=1.25&resize=500%2C253" />{' '}
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          This is a full-length grid item where maybe we can put a ticker.
        </Paper>
      </Grid>
      <Grid container justify="space-around" spacing={24}>
        <Grid item xs={3}>
          <SimpleCard />
        </Grid>
        <Grid item xs={3}>
          <ExampleMediaCard />
        </Grid>
        <Grid item xs={3}>
          <ExampleMusicCard />
        </Grid>
      </Grid>
    </Grid>
  )
}

LandingPage.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LandingPage)
