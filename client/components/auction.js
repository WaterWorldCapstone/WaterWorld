import React, {Component} from 'react'
import {Grid, withStyles, Typography, Button} from '@material-ui/core'
import PropTypes from 'prop-types'
import BidForm from '../components/bidForm'

const styles = theme => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
    textAlign: 'center'
  }
})
// componentDidMount() {
//   this.props.poolamount()
// }

class Auction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bidButtonClicked: false
    }
  }

  handleClick = () => {
    this.setState(prevState => ({
      bidButtonClicked: !prevState.bidButtonClicked
    }))
  }
  render() {
    const {classes} = this.props

    return (
      <div>
        <Grid
          container
          className={classes.root}
          spacing={24}
          id="auction-page-grid"
          justify="center"
        >
          <Grid item xs={12}>
            <Typography variant="title">"Welcome Vendors"</Typography>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={this.handleClick}
          >
            {this.state.bidButtonClicked ? 'Close' : 'Bid'}
          </Button>

          {this.state.bidButtonClicked ? (
            <Grid item xs={12}>
              {' '}
              <BidForm />{' '}
            </Grid>
          ) : (
            ''
          )}
        </Grid>
      </div>
    )
  }
}
Auction.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Auction)
