import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

class Donate extends Component {
  componentDidMount() {
    console.log(this.props)
    this.script = document.createElement('script')

    this.script.src =
      'https://www.iatspayments.com/AURA/AURA.aspx?PID=PAC76ACF4D6528A8E1'
    this.script.async = true

    window.addEventListener('input', findMostRecentDonationInput, false)
    function findMostRecentDonationInput() {
      let targetThing = document.querySelector('#IATS_Payment_TotalAmount')
      console.log('Most recent input for $$$ was: ' + targetThing.textContent)
    }

    const clearHashOnDonationFormSubmit = e => {
      let backButton
      try {
        backButton = document.querySelector('#IATS_ProcessAction_Button')
      } catch (err) {
        console.log("this error's ok ")
      }
      if (e.target === backButton) {
        this.props.history.push('/donate') //clears hash
      }
    }
    window.addEventListener('click', clearHashOnDonationFormSubmit, false)

    function determineSuccess() {
      if (
        document.querySelector('#IATS_BackAction_Button').style.display ===
        'block'
      ) {
        console.log('Rejected')
        //no thunk
      } else {
        console.log('success')
        //thunk to store the DATUMS
      }
    }
    window.addEventListener('hashchange', determineSuccess, false)
    document.getElementById('payment').appendChild(this.script)
  }
  componentWillUnmount() {
    document.getElementById('IATS_NACHPolicyMoreInfoDiv').remove()
    document.getElementById('IATS_NACHStatementDiv').remove()
  }
  render() {
    return <div id="payment" />
  }
}

export default withRouter(Donate)
