import React, {Component} from 'react'
import {Grid, withStyles, Typography} from '@material-ui/core'
import PropTypes from 'prop-types'
import {paperMessages} from './helpers/paperMessages.js'
const styles = theme => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
    textAlign: 'center'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    justify: 'center',
    backgroundColor: '#01547b'
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
    const ticker = document.getElementById('ticker')
    ticker.addEventListener(`animationiteration`, () =>
      this.setState({
        counter: this.state.counter + 1
      }))
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
        <Grid container id="landing-page" spacing={24}>
          <Grid className={classes.paper} id="ticker" item xs={12}>
            {paperMessages.filter(
              (msg, idx) => idx === this.state.counter % paperMessages.length
            )}
          </Grid>
          <Grid item xs={6} className={classes.text}>
            <Typography
              variant="title"
              id="main-title-landing"
              className="main-title"
              color="inherit"
            >
              Waterworld
            </Typography>
            <Typography variant="headline" justify="center" color="inherit">
              ----------
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <a href="/map">
              <div className="earth" />
            </a>
          </Grid>
        </Grid>
        <Grid item xs={12} />
        <Grid id="text" container spacing={24}>
          <Grid item xs={12} id="filler-0" />
          <Grid item xs={12} id="exegesis-right">
            <Typography id="mission-text" variant="headline" justify="center">
              Mission
            </Typography>
            <Typography
              id="text-inside-mission"
              color="primary"
              justify="center"
            >
              Water is life; the world would be barren wasteland without it. The
              mission of Waterworld is to bring clean, plentiful water to every
              living being on Earth. But to do it, we need your help.
            </Typography>
          </Grid>
          <Grid item xs={12} id="exegesis-left">
            <Typography id="about-text" variant="headline" justify="center">
              About
            </Typography>
            <Typography id="text-inside-about" color="primary" justify="center">
              Waterworld is a next-generation platform for connecting those who
              would do good for the world with the capacity to do that good. We
              give everyday people the opportunity to quickly and effectively
              give the gift of water, of life, to those elsewhere who need it
              most.
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} id="filler-1" />
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
