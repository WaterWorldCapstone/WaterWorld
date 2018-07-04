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
          <Grid item xs={12} />
          <Grid item xs={12} />
          <Grid item xs={12} />
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
              --------------
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
          <Grid item xs={12} />
          <Grid item xs={2} className={classes.text}>
            <img src="../../public/favicon.ico" />
          </Grid>
          <Grid item xs={10} className={classes.text}>
            <Typography id="about-text" variant="headline" justify="center">
              About
            </Typography>
            <Typography id="text-inside" color="primary" justify="center">
              Waterworld is a crowdfunding facilitator program that enables
              users, prospective donors, to inspect worldwide water needs and
              donate money earmarked for a specific location selected by the
              donor. The user can see a map overlaid with a heat map of
              calculated need for water.
            </Typography>
          </Grid>
          <Grid item xs={12} />
          <Grid item xs={12} />
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

LandingPage.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LandingPage)
