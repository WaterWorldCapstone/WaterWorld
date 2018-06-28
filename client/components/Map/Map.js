import React from 'react'
import {compose, withProps} from 'recompose'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps'
import {gettingPools} from '../../store/pool'
import {connect} from 'react-redux'
import {MapInfoWindow} from './MapInfoWindow'
import HeatmapLayer from 'react-google-maps/lib/components/visualization/HeatmapLayer'
const {InfoBox} = require('react-google-maps/lib/components/addons/InfoBox')

export const HomeMap = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyBEn6qWhn0flVzQ0uNzas6RCz9jYJT1xQM&v=3.exp&libraries=geometry,drawing,places,visualization',
    loadingElement: <div style={{height: `100%`}} />,
    containerElement: <div style={{height: `400px`}} />,
    mapElement: <div style={{height: `100%`}} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={3} defaultCenter={{lat: 40.705076, lng: -74.00916}}>
    {props.pools ? (
      props.pools.map(pool => <MapInfoWindow key={pool.id} pool={pool} />)
    ) : (
      <div />
    )}
    <HeatmapLayer data={[new google.maps.LatLng(40.705076, -74.00916)]} />
    {/* <InfoBox
      defaultPosition={new google.maps.LatLng(40.705076, -74.00916)}
      options={{ closeBoxURL: ``, enableEventPropagation: true }}
    >
      <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
        <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
          Hello, Taipei!
        </div>
      </div>
    </InfoBox> */}
  </GoogleMap>
))

// class HeatMap extends React.PureComponent {

//   render() {
//     return (
//       <HomeMap pools={this.props.pools}/>
//     )
//   }

// }

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

// export default connect(mapState, mapDispatch)(HeatMap)
