import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

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
    document
      .getElementById('payment')
      .appendChild(cachedPaymentDiv || paymentDiv)
    window.addEventListener('input', findMostRecentDonationInput, false)
    function findMostRecentDonationInput() {
      const targetThing = document.getElementById('IATS_Payment_TotalAmount')
      if (targetThing) console.log('Most recent input for $$$ was: ' + targetThing.textContent)
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
    return <div id="payment" />
  }
}

export default withRouter(Donate)
