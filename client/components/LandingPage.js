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
    // setInterval(
    //   () =>
    //     this.setState({
    //       counter: this.state.counter + 1
    //     }),
    //   1250
    // )
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
        <Grid container id="landingPage" spacing={24}>
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
              Waterworld!
            </Typography>
            <Typography variant="headline" justify="center" color="inherit">
              Let's Donate !!!
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <a href="/map">
              <div className="earth" />
            </a>
          </Grid>
          <Grid item xs={12} />
          <Grid item xs={12} />
          <Grid item xs={12} />
        </Grid>
        <Grid item xs={12} />
        <Grid id="text" container spacing={24}>
          <Grid item xs={12} />
          <Grid item xs={6} className={classes.text}>
            <img src="https://i.pinimg.com/736x/13/41/f5/1341f5ee8e5314b9ce8da7fae4da4c87.jpg" />
          </Grid>
          <Grid item xs={6} className={classes.text}>
            <Typography id="aboutText" variant="headline" justify="center">
              About
            </Typography>
            <Typography id="text" color="primary" justify="center">
              Waterworld is a crowdfunding facilitator program that enables
              users, prospective donors, to inspect worldwide water needs and
              donate money earmarked for a specific location selected by the
              donor. The user can see a map overlaid with a heat map of
              calculated need for water. The user can select any area and see
              details of that area, including current news stories that address
              and expose the lack of access to water for people in that area.
              The donor will have full access to the fate of the donation,
              including where the money has gone, what was purchased with it,
              and the destination of the purchase. Money donated on behalf of a
              location goes into the Waterworld (money) account and, when the
              money donated on behalf of an area reaches a particular threshold,
              an administrator will dispatch an order for water to that region
              using the donated funds. Potential water distributors, the
              vendors, can bid on the contract for that order using the
              application’s auction functionality. The intended functionality of
              the minimally viable product is that a user can access the
              application, optionally log in, donate money for a particular
              region, and eventually dispatch an order to a dummy distributor
              when enough money has accrued. The next level of complexity
              incorporates the auction system, and will allow dummy vendors to
              bid on contracts. Money left after the contract price will be
              returned to the pool and accelerate the next dispatch.
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
