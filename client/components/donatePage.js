import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {gettingPool, getCurrentUser} from '../store'
import DonationPoolSelector from './helpers/DonationPoolSelector'
import {addDonation} from '../store/donation'
import {Typography} from '@material-ui/core'

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
      this.props.history.push('/donate') //clears hash
    }
  }

  componentDidMount() {
    if (!this.props.noPool) {
      this.props.gettingPool(this.props.match.params.id)
    }
    this.props.getCurrentUser(this.props.user.id)
    document
      .getElementById('payment')
      .appendChild(cachedPaymentDiv || paymentDiv)
    window.addEventListener('input', findMostRecentDonationInput, false)
    function findMostRecentDonationInput() {
      let targetThing = document.querySelector('#IATS_Payment_TotalAmount')
      return targetThing.textContent * 100
    }
    window.addEventListener('click', this.clearHashOnDonationFormSubmit, false)
    const determineSuccess = () => {
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
        this.props.noPool
          ? this.props.addDonation(
              this.props.currentUser.donor.id,
              this.props.selectedPoolId,
              findMostRecentDonationInput()
            )
          : this.props.addDonation(
              this.props.user.id,
              this.props.match.params.poolId,
              null
            )
      }
    }
    window.addEventListener('hashchange', determineSuccess, false)
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
        ) : (
          <Typography variant="title">{`Donating to pool: ${
            this.props.pool.name
          }`}
          </Typography>
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
