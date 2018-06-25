import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import SimpleCard from './cards/ExampleCard.js'
import ExampleMediaCard from './cards/ExampleMediaCard.js'
import {Paper, Grid, withStyles, Typography} from '@material-ui/core'
import {connect} from 'react-redux'
import ExampleMusicCard from './cards/ExampleMusicCard.js'
import PropTypes from 'prop-types'
import {factoids} from './helpers/factoids.js'
import {paperMessages} from './helpers/paperMessages.js'
import ExpansionPanelSample from './cards/ExpansionPanelSample.js'
import PotentialExpander from './cards/PotentialExpander.js'
import PossiblePopover from './cards/PossiblePopover.js'
import InfoPopover from './cards/InfoPopover.js'

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

class LandingPageWithDemos extends Component {
  constructor(props) {
    super(props)
    this.state = {
      counter: 0
    }
  }

  componentDidMount = () => {
    setInterval(
      () =>
        this.setState({
          counter: this.state.counter + 1
        }),
      1250
    )
  }

  render = () => {
    const {classes} = this.props
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
        <Grid item xs={9}>
          <Typography>
            {' '}
            Here is some text we can use to tug at heartstrings{' '}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {paperMessages.filter(
              (msg, idx) => idx === this.state.counter % paperMessages.length
            )}
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
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            {generateTickers(
              factoids,
              this.state.counter % factoids.length,
              5
            ).map((factoid, idx) => (
              <Typography>
                {(this.state.counter + idx) % factoids.length} {factoid}
              </Typography>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <ExpansionPanelSample counter={this.state.counter} />
        </Grid>
        <Grid item xs={4}>
          <PotentialExpander />
        </Grid>
        <Grid item xs={4}>
          <PossiblePopover />
        </Grid>
        <Grid item xs={4}>
          <InfoPopover />
        </Grid>
      </Grid>
    )
  }
  componentWillUnmount = () => {
    clearInterval()
  }
}

const generateTickers = (arr, counter, num) => {
  const output = []
  for (let i = counter; i < counter + num; i++) {
    output.push(arr[i % arr.length])
  }
  return output
}

LandingPageWithDemos.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LandingPageWithDemos)
