import {GoogleMap, Marker, withGoogleMap, withScriptjs} from 'react-google-maps'
import React from 'react'

// function initMap() {
//   var location = {lat: -25, lng: 131 } //placeholders
//   var map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 4,
//     center: location
//   })
// }

export const homeMap = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap defaultZoom={8} defaultCenter={{lat: -34.397, lng: 150.644}} />
  ))
)
