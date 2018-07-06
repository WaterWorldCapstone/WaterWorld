import React from 'react'
import {connect} from 'react-redux'
import {compose, withProps, withHandlers} from 'recompose'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps'
import {gettingPools} from '../../store/pool'
import {MapInfoWindow} from './MapInfoWindow'
import HeatmapLayer from 'react-google-maps/lib/components/visualization/HeatmapLayer'
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer'
// import mapstyle from '../../../public/mapstyle.json'
import Input from './AddressInput'

function getPoints(dataR) {
  let data = dataR
  let coords1 = data.map(region => {
    console.log('in getPoints', region, region[0], region[1])
    return new google.maps.LatLng(region[0], region[1])
  })

  let coords2 = data.map(region => {
    console.log('in getPoints', region, region[0], region[1])
    return new google.maps.LatLng(region[0] + 0.1, region[1] + 0.1)
  })

  let coords3 = data.map(region => {
    console.log('in getPoints', region, region[0], region[1])
    return new google.maps.LatLng(region[0] + 0.2, region[1] + 0.2)
  })

  let coords4 = data.map(region => {
    console.log('in getPoints', region, region[0], region[1])
    return new google.maps.LatLng(region[0] - 1, region[1] - 1)
  })

  let coords5 = data.map(region => {
    console.log('in getPoints', region, region[0], region[1])
    return new google.maps.LatLng(region[0] - 1, region[1] - 3)
  })

  let coords6 = data.map(region => {
    console.log('in getPoints', region, region[0], region[1])
    return new google.maps.LatLng(region[0] - 0.5, region[1] + 2)
  })

  let coords7 = data.map(region => {
    console.log('in getPoints', region, region[0], region[1])
    return new google.maps.LatLng(region[0] + 1, region[1] - 4)
  })

  let coords8 = data.map(region => {
    console.log('in getPoints', region, region[0], region[1])
    return new google.maps.LatLng(region[0] + 0.8, region[1] - 2)
  })

  let coords9 = data.map(region => {
    console.log('in getPoints', region, region[0], region[1])
    return new google.maps.LatLng(region[0] - 1, region[1] + 3)
  })

  let coords10 = data.map(region => {
    console.log('in getPoints', region, region[0], region[1])
    return new google.maps.LatLng(region[0] + 0.5, region[1] - 0.1)
  })

  let coords11 = data.map(region => {
    console.log('in getPoints', region, region[0], region[1])
    return new google.maps.LatLng(region[0] + 0.1, region[1] + 0.7)
  })

  return [
    ...coords1,
    ...coords2,
    ...coords3,
    ...coords4,
    ...coords5,
    ...coords6,
    ...coords7,
    ...coords8,
    ...coords9,
    ...coords10,
    ...coords11
  ]

  // return [...coords1,...coords2,...coords3,...coords4,...coords5,...coords6,...coords7]
  // return coords7
}

function getRadius() {
  return 25
}

function getCenter(singlePool) {
  console.log('in getCenter', singlePool)
  if (singlePool.latitude) {
    console.log('center is', {
      lat: Number(singlePool.latitude),
      lng: Number(singlePool.longitude)
    })
    return {lat: Number(singlePool.latitude), lng: Number(singlePool.longitude)}
  } else {
    console.log('center is default')
    return {lat: 30.970507112789292, lng: 60.424804689999974}
  }
}

const HomeMap = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyBEn6qWhn0flVzQ0uNzas6RCz9jYJT1xQM&v=3.exp&libraries=geometry,drawing,places,visualization',
    loadingElement: <div style={{height: `100%`}} />,
    containerElement: <div style={{height: `400px`}} />,
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
  <div>
    <GoogleMap
      defaultZoom={3}
      center={getCenter(props.singlePool)}
      // defaultOptions={{ styles: mapstyle }}
    >
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
        <HeatmapLayer data={getPoints(props.regions)} radius={25} />
      </MarkerClusterer>
    </GoogleMap>
    <div>
      <Input />
    </div>
  </div>
))

const mapState = state => {
  return {
    singlePool: state.pool.singlePool
  }
}

export default connect(mapState, null)(HomeMap)
