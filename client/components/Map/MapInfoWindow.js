import React from 'react'
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  MarkerImage,
  InfoWindow
} = require('react-google-maps')
import {InfoWindowContent} from './InfoWindowContent'

export class MapInfoWindow extends React.Component {
  constructor() {
    super()
    this.state = {
      isOpen: false
    }
  }

  onToggleOpen = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }))
  }

  waterIcon = new google.maps.MarkerImage(
    '/favicon.ico',
    new google.maps.Size(71, 71),
    new google.maps.Point(0, 0),
    new google.maps.Point(17, 34),
    new google.maps.Size(25, 25)
  )

  render() {
    return (
      <Marker
        onClick={this.onToggleOpen}
        icon={this.waterIcon}
        position={{
          lat: Number(this.props.pool.latitude),
          lng: Number(this.props.pool.longitude)
        }}
      >
        {this.state.isOpen && (
          <InfoWindow onCloseClick={this.onToggleOpen}>
            <InfoWindowContent pool={this.props.pool} />
          </InfoWindow>
        )}
      </Marker>
    )
  }
}
