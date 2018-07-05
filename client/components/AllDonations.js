import React, {Component} from 'react'
import {getDonations} from '../store/donation'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Grid} from '@material-ui/core'
import DonationCard from './cards/DonationCard'
import {LOADING, LOADED, ERROR} from '../store/constants'
import CircularProgress from '@material-ui/core/CircularProgress'
import {gettingPools} from '../store/pool'

class AllDonations extends Component {
  componentDidMount = async () => {
    await this.props.gettingPools()
    this.props.getDonations()
  }
  render = () => {
    switch (this.props.status) {
      case LOADING:
        return (
          <div className="loading-spinner">
            <CircularProgress
              color="primary"
              size={80}
              thickness={3.6}
              variant="indeterminate"
            />
          </div>
        )
      case LOADED: {
        return (
          <Grid container spacing={24} id="all-donations-grid">
            {this.props.allDonations
              .filter(donation => donation && !!donation.pool)
              .map(donation => {
                return (
                  <Grid item xs={4} key={donation.id}>
                    <DonationCard donation={donation} />
                  </Grid>
                )
              })}
          </Grid>
        )
      }
      case ERROR:
        return <h1>Error...</h1>
      default:
        return <LoadingBar />
    }
  }
}
const mapStateToProps = state => ({
  allDonations: state.donation.allDonations,
  status: state.donation.status,
  user: state.user
})

const mapDispatchToProps = {getDonations, gettingPools}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllDonations)
)
