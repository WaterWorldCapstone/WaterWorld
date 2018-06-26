import React from 'react'
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
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
    console.log('in ToggleOpen before setstate', this.state.isOpen)
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }))
    console.log('in ToggleOpen after setstate', this.state.isOpen)
  }

  render() {
    return (
      <Marker
        onClick={this.onToggleOpen}
        icon="/favicon.ico"
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
