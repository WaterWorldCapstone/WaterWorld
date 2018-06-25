import React, {Component} from 'react'

class Donate extends Component {
  componentDidMount() {
    const script = document.createElement('script')

    script.src =
      'https://www.iatspayments.com/AURA/AURA.aspx?PID=PAC76ACF4D6528A8E1'
    script.async = true

    document.body.appendChild(script)
    // const newPayment = document.findElementById('payment')
    // console.log('hit', newPayment)
  }
  render() {
    return <div id="payment" />
  }
}

export default Donate
