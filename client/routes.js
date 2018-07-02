import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, UserHome} from './components'
import MainMap from './components/Map/mainMap'
import {me} from './store'
import LandingPage from './components/LandingPage'
import Donate from './components/donatePage'
import Auction from './components/auction'
import Pools from './components/Pools'
import Pool from './components/pool'
import AuctionList from './components/AuctionList'
import CreateVendor from './components/createVendorForm'
import CreateDonor from './components/createUserForm'
/**
 * COMPONENT
 */
class Routes extends Component {
  constructor() {
    super()
    this.targetSpan = "haven't found it yet sadly"
  }
  componentDidMount() {
    this.props.loadInitialData()
    this.targetSpan = document.querySelector('#IATS_Payment_TotalAmount')
  }

  handleChange = evt => {
    console.log('started this handleChange')
    console.log(this.targetSpan, this.targetSpan.value)
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div id="site-content">
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={CreateDonor} />
          <Route exact path="/map" component={MainMap} />
          <Route exact path="/pools" component={Pools} />
          <Route
            exact
            path="/donate"
            render={() => <Donate onChange={this.handleChange} />}
          />
          <Route path="/pools/:poolId" component={Pool} />
          <Route exact path="/auctions" component={AuctionList} />
          <Route exact path="/auction" component={Auction} />

          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/home" component={UserHome} />
            </Switch>
          )}
          {/* Displays our Login component as a fallback */}
          <Route exact path="/vendor-signup" component={CreateVendor} />
          <Route component={Login} />
        </Switch>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
