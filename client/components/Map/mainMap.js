import React from 'react'
import {HomeMap} from './Map'
import {connect} from 'react-redux'
import {gettingPools} from '../../store/pool'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps'

class MainMap extends React.Component {
  componentDidMount() {
    console.log('in component did mount', this.props)
    this.props.getPools()
    console.log('in component did mount after thunk', this.props)
  }

  render() {
    console.log('pools are', this.props.pools)
    return <HomeMap pools={this.props.pools} />
  }
}

const mapState = state => {
  return {
    pools: state.pool.allPools
  }
}

const mapDispatch = dispatch => {
  return {
    getPools: () => dispatch(gettingPools())
  }
}

export default connect(mapState, mapDispatch)(MainMap)
