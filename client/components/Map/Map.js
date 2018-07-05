import React from 'react'
import {compose, withProps, withHandlers} from 'recompose'
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
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer'

function getPoints(dataR) {
  let data = dataR
  let coords = data.map(region => {
    console.log('in getPoints', region, region[0], region[1])
    return new google.maps.LatLng(region[0], region[1])
  })

  console.log('coords are', coords)
  return coords
}

export const HomeMap = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyBEn6qWhn0flVzQ0uNzas6RCz9jYJT1xQM&v=3.exp&libraries=geometry,drawing,places,visualization',
    loadingElement: <div style={{height: `100%`}} />,
    containerElement: <div style={{height: `75vh`}} />,
    mapElement: <div style={{height: `100%`}} />
  }),
  withHandlers({
    onMarkerClustererClick: () => markerClusterer => {
      const clickedMarkers = markerClusterer.getMarkers()
      console.log(`Current clicked markers length: ${clickedMarkers.length}`)
      console.log(clickedMarkers)
    }
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={3} defaultCenter={{lat: 40.705076, lng: -74.00916}}>
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={50}
    >
      {console.log('in the map', props)}
      {props.pools ? (
        props.pools.map(pool => {
          console.log('in pool mapping, pool is', pool)
          return <MapInfoWindow key={pool.id} pool={pool} />
        })
      ) : (
        <div />
      )}
      <HeatmapLayer data={getPoints(props.regions)} />
    </MarkerClusterer>
  </GoogleMap>
))
