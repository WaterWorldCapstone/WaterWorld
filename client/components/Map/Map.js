// import { GoogleMap, Marker, withGoogleMap, withScriptjs, InfoWindow } from 'react-google-maps'
// const { compose, withProps, withStateHandlers } = require("recompose");
// import React from 'react'
// import { connect } from 'react-redux'
// import { gettingPools } from '../store/pool'

// // const HomeMap = withScriptjs(
// //   withGoogleMap(props => {
// //     console.log('in HomeMap', props.pools)
// //     return (
// //     <GoogleMap defaultZoom={2} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
// //     {props.pools ? props.pools.map(pool => <div><Marker key={pool.id} position={{ lat: Number(pool.latitude), lng: Number(pool.longitude) }}> <InfoWindow /> </Marker> </div>) : <div/>}
// //     </GoogleMap>
// //   )})
// // )

// const mapState = state => {
//   return {
//     pools: state.pool.allPools
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     getPools: () => dispatch(gettingPools())
//   }
// }

// export default connect(mapState, mapDispatch)(HomeMap)

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
    {/* //   <Marker key={pool.id} onClick={props.onToggleOpen} position={{ lat: Number(pool.latitude), lng: Number(pool.longitude) }}>
//     {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
//      <div>here</div>
//     </InfoWindow>}
// </Marker>) : <div/>} */}
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
