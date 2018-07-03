import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {bid} from '../store/vendor'
import {addBid} from '../store/bid'

class BidForm extends Component {
  state = {amount: 0}
  handleSubmit = evt => {
    evt.preventDefault()
    this.props.addBid({
      poolId: this.props.pool.id,
      vendorId: this.props.user.id,
      amount: this.state.amount * 100
    })
    this.props.history.push(`/auctions`)
  }
  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <p>
          You can only have one bid. Further bids will overwrite your previous
          bid; only the most recent bid will be counted.
        </p>
        <label>
          Amount:
          <input
            type="text"
            name="amount"
            value={this.state.amount}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})
const mapDispatchToProps = {addBid}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BidForm))
