import React from 'react'
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} = require('react-google-maps')

export class MapInfoWindow extends React.Component {
  constructor() {
    super()
    this.state = {
      isOpen: false
    }
  }

  onToggleOpen() {
    this.setState({
      isOpen: !isOpen
    })
  }

  render() {
    return (
      <Marker
        onClick={this.props.onToggleOpen}
        position={{
          lat: Number(this.props.pool.latitude),
          lng: Number(this.props.pool.longitude)
        }}
      >
        {this.state.isOpen && (
          <InfoWindow onCloseClick={this.props.onToggleOpen}>
            <div>here</div>
          </InfoWindow>
        )}
      </Marker>
    )
  }
}
