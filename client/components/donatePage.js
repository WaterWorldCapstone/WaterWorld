import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {gettingPool} from '../store'
import DonationPoolSelector from './helpers/DonationPoolSelector'

const paymentDiv = document.createElement('div')
const IATSscript = document.createElement('script')
IATSscript.src =
  'https://www.iatspayments.com/AURA/AURA.aspx?PID=PAC76ACF4D6528A8E1'
IATSscript.async = true
paymentDiv.appendChild(IATSscript)

let cachedPaymentDiv

class Donate extends Component {
  state = {
    success: false
  }
  clearHashOnDonationFormSubmit = e => {
    const IATSbutton = document.getElementById('IATS_ProcessAction_Button')
    if (!IATSbutton) return
    if (e.target === IATSbutton) {
      this.props.history.push('/donate') //clears hash
    }
  }
  componentDidMount() {
    if (!this.props.noPool) this.props.gettingPool(this.props.match.params.poolId)
    document
      .getElementById('payment')
      .appendChild(cachedPaymentDiv || paymentDiv)
    window.addEventListener('input', findMostRecentDonationInput, false)
    function findMostRecentDonationInput() {
      let targetThing = document.querySelector('#IATS_Payment_TotalAmount')
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
        {this.props.noPool ? <DonationPoolSelector /> : ''}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  pool: state.pool.singlePool
})

const mapDispatchToProps = {gettingPool}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Donate))
