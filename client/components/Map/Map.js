import React from 'react'
const {compose, withProps, withStateHandlers} = require('recompose')
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} = require('react-google-maps')
import {gettingPools} from '../../store/pool'
import {connect} from 'react-redux'
import {MapInfoWindow} from './MapInfoWindow'

const HomeMap = compose(withScriptjs, withGoogleMap)(props => (
  <GoogleMap defaultZoom={3} defaultCenter={{lat: 40.705076, lng: -74.00916}}>
    {props.pools ? (
      props.pools.map(pool => <MapInfoWindow key={pool.id} pool={pool} />)
    ) : (
      <div />
    )}
  </GoogleMap>
))

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

export default connect(mapState, mapDispatch)(HomeMap)
