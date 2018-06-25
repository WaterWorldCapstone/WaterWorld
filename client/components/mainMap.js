import React from 'react'
import {homeMap} from './Map'

export default class mainMap extends React.Component {
  render() {
    console.log('in the render of mainMap')
    return (
      <homeMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{height: `100%`}} />}
        containerElement={<div style={{height: `400px`}} />}
        mapElement={<div style={{height: `100%`}} />}
      />
    )
  }
}
