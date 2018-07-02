import React, {Component} from 'react'
import {Grid, withStyles, Typography, Button} from '@material-ui/core'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import BidForm from '../components/bidForm'
import SingleAuctionCard from './SingleAuctionCard'
import {gettingPool} from '../constants'

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

  componentDidMount = () => {
    this.props.gettingPool(this.props.match.params.auctionId)
  }

  handleSubmit = evt => {}

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
            <Typography variant="title">
              Auction for pool:{` ${this.props.currentPool.name}`}
            </Typography>
            <SingleAuctionCard {...this.props} pool={this.props.currentPool} />
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
              <BidForm pool={this.props.currentPool} />{' '}
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

const mapStateToProps = state => ({
  status: state.pool.singlePoolStatus,
  currentPool: state.pool.singlePool
})

const mapDispatchToProps = {gettingPool}

export default withStyles(styles)(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(Auction))
)
