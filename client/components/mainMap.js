import React from 'react'
import {HomeMap} from './Map'

export default class MainMap extends React.Component {
  render() {
    return (
      <HomeMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBEn6qWhn0flVzQ0uNzas6RCz9jYJT1xQM&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{height: `100%`}} />}
        containerElement={<div style={{height: `600px`}} />}
        mapElement={<div style={{height: `100%`}} />}
      />
      // <div>
      //   <h2>MAP HERE</h2>
      // </div>
    )
  }
}
