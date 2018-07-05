import React, {Component, Fragment} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {gettingPool, getCurrentUser} from '../store'
import DonationPoolSelector from './helpers/DonationPoolSelector'
import {addDonation} from '../store/donation'
import {Typography, Button} from '@material-ui/core'

const paymentDiv = document.createElement('div')
const IATSscript = document.createElement('script')
IATSscript.src =
  'https://www.iatspayments.com/AURA/AURA.aspx?PID=PAC76ACF4D6528A8E1'
IATSscript.async = true
paymentDiv.appendChild(IATSscript)

let cachedPaymentDiv

class Donate extends Component {
  state = {
    success: false,
    currentDonation: 0,
    currentUserId: -1
  }
  clearHashOnDonationFormSubmit = e => {
    const IATSbutton = document.getElementById('IATS_ProcessAction_Button')
    if (!IATSbutton) return
    if (e.target === IATSbutton) {
      if (!this.props.match.params.id) this.props.history.push('/donate') //clears hash
      else this.props.history.push(`/pools/${this.props.match.params.id}/donate`)
    }
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.gettingPool(this.props.match.params.id)
      this.setState({
        currentPoolMatchId: this.props.match.params.id
      })
    }
    if (!this.props.match.params.id) {
      this.setState({
        currentPoolMatchId: this.props.selectedPoolId
      })
    }
    this.props.getCurrentUser(this.props.user.id)
    document
      .getElementById('payment')
      .appendChild(cachedPaymentDiv || paymentDiv)
    window.addEventListener('input', this.findMostRecentDonationInput, false)
    window.addEventListener('click', this.clearHashOnDonationFormSubmit, false)

    window.addEventListener('hashchange', this.determineSuccess, false)
  }
  findSelectedPoolId = () => {
    return this.props.selectedPoolId
  }
  findCurrentPoolMatchId = () => {
    return this.props.pool.id
  }

  findMostRecentDonationInput = () => {
    let targetThing = document.querySelector('#IATS_Payment_TotalAmount')
    return targetThing.textContent * 100
  }

  determineSuccess = () => {
    if (
      document.querySelector('#IATS_BackAction_Button').style.display ===
      'block'
    ) {
      console.log('Rejected')
      //no thunk
    } else {
      console.log('success')
      this.setState({
        success: true
      })
      this.state.currentPoolMatchId
        ? this.props.addDonation(
            this.props.currentUser.donor.id,
            this.state.currentPoolMatchId,
            this.findMostRecentDonationInput()
          )
        : this.props.addDonation(
            this.props.currentUser.donor.id,
            this.props.selectedPoolId,
            this.findMostRecentDonationInput()
          )
    }
  }

  componentWillUnmount() {
    if (this.state.success) cachedPaymentDiv = null
    else cachedPaymentDiv = paymentDiv
    window.removeEventListener('click', Donate.clearHashOnDonationFormSubmit)
  }
  render() {
    return (
      <div id="payment">
        {this.props.noPool ? (
          <DonationPoolSelector loadstatus={this.props.status} />
        ) : !this.state.success ? (
          <Fragment>
            <Typography variant="title">
              {`Donating to pool: ${this.props.pool.name}`}
            </Typography>
            <Typography component={Link} to="/donate">
              Select another pool?
            </Typography>
          </Fragment>
        ) : (
          ''
        )}
        {this.state.success ? (
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/pools"
          >
            Back
          </Button>
        ) : (
          ''
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  status: state.user.status,
  currentUser: state.user.currentUser,
  pool: state.pool.singlePool,
  selectedPoolId: state.donation.currentPoolId
})

const mapDispatchToProps = {gettingPool, addDonation, getCurrentUser}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Donate))
