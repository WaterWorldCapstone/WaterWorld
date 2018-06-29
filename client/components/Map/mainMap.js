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
    this.props.getPools()
  }
  render() {
    return <HomeMap />
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
