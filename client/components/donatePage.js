import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

class Donate extends Component {
  componentDidMount() {
    console.log(this.props)
    this.script = document.createElement('script')

    this.script.src =
      'https://www.iatspayments.com/AURA/AURA.aspx?PID=PAC76ACF4D6528A8E1'
    this.script.async = true

    window.addEventListener('input', myFunc2, false)
    function myFunc2() {
      let targetThing = document.querySelector('#IATS_Payment_TotalAmount')
      console.log('input works better...change has occurred!')
      console.log(targetThing.textContent)
    }

    const handleClickHere = e => {
      let backButton
      console.log('click not try registered')
      try {
        console.log('click registered')
        backButton = document.querySelector('#IATS_ProcessAction_Button')
      } catch (err) {
        console.log("this error's ok ")
      }
      if (e.target === backButton) {
        console.log('this button was clicked!')
        this.props.history.push('/donate')
      }
    }
    window.addEventListener('click', handleClickHere, false)

    function myFunc() {
      console.log('hashchange fire')
      let targetThing = document.querySelector('#IATS_Payment_TotalAmount')
      console.log(
        'We win at javascript if this is right',
        targetThing.textContent
      )
      if (
        document.querySelector('#IATS_BackAction_Button').style.display ===
        'block'
      ) {
        console.log('Rejected')
        console.log(
          document.querySelector('#IATS_BackAction_Button').style.display
        )
        console.dir(document.querySelector('#IATS_BackAction_Button'))
      } else {
        console.log('success')
        console.log(
          document.querySelector('#IATS_BackAction_Button').style.display
        )
      }
      // if (location.hash === '#IATS_PaymentBoxDiv') {
      //   readTheDollarAmount()
      // }
    }
    window.addEventListener('hashchange', myFunc, false)

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
