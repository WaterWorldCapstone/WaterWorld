import React, {Component} from 'react'

class Donate extends Component {
  componentDidMount() {
    this.script = document.createElement('script')

    this.script.src =
      'https://www.iatspayments.com/AURA/AURA.aspx?PID=PAC76ACF4D6528A8E1'
    this.script.async = true

    // document.body.appendChild(this.script)
    document.getElementById('payment').appendChild(this.script)
  }
  componentWillUnmount() {
    document.getElementById('IATS_NACHPolicyMoreInfoDiv').remove()
    document.getElementById('IATS_NACHStatementDiv').remove()
  }
  handleSubmit = evt => {
    evt.preventDefault()
    console.log(
      document.getElementsByClassName('IATS_ResponseSectionDiv')[0].children[2]
        .firstChild.firstChild.textContent
    )
  }
  render() {
    return <div id="payment" onSubmit={this.handleSubmit} />
  }
}

export default Donate
