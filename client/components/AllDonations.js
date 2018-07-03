import React, {Component} from 'react'
import {getDonations} from '../store/donation'
import {connect} from 'react-redux'
import {Grid} from '@material-ui/core'
import DonationCard from './cards/DonationCard'
import {LOADING, LOADED, ERROR} from '../store/constants'
import LoadingBar from './helpers/LoadingBar'

class AllDonations extends Component {
  componentDidMount = () => {
    this.props.getDonations()
  }

  render = () => {
    switch (this.props.status) {
      case LOADING:
        return <LoadingBar />
      case LOADED:
        return (
          <Grid container spacing={24} id="all-donations-grid">
            {this.props.allDonations.map(donation => {
              return (
                <Grid item xs={4} key={donation.id}>
                  <DonationCard donation={donation} />
                </Grid>
              )
            })}
          </Grid>
        )
      case ERROR:
        return <h1>Error...</h1>
      default:
        return <LoadingBar />
    }
  }
}
const mapStateToProps = state => ({
  allDonations: state.donation.allDonations,
  status: state.donation.status
})

const mapDispatchToProps = {getDonations}

export default connect(mapStateToProps, mapDispatchToProps)(AllDonations)
