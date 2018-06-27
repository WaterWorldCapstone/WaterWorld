import React, {Component} from 'react'
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
import {white} from 'material-ui/styles/colors'

const styles = theme => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
    textAlign: 'center'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: white,
    justify: 'center',
    backgroundColor: '#01547b'
  },
  text: {
    color: white
  }
})

class LandingPage extends Component {
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
        <Grid className={classes.paper} xs={12}>
          {paperMessages.filter(
            (msg, idx) => idx === this.state.counter % paperMessages.length
          )}
        </Grid>
        <Grid container id="landingPage" spacing={24}>
          <Grid item xs={12} />
          <Grid item xs={6} className={classes.text}>
            <Typography variant="headline" justify="center">
              Waterworld
            </Typography>
            <Typography variant="center" justify="center">
              Let's Donate !!!!!
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <a href="/map">
              <div className="earth" />
            </a>
          </Grid>
          <Grid item xs={12} />
        </Grid>
        <Grid item xs={12} />
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

LandingPage.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LandingPage)
