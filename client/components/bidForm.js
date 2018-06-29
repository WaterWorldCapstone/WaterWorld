import React, {Component} from 'react'

class BidForm extends Component {
  render() {
    return (
      <form>
        <label>
          Amount:
          <input type="text" amount="amount" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default BidForm
