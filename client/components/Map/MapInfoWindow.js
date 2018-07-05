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

  // getContent = () => {
  //   <div class='marker-box'>
  //     <a href={`/pools/${this.props.pool.id}`}>
  //     <div >
  //       {' '}
  //       {this.props.pool.town}, {this.props.pool.country}{' '}
  //     </div>
  //     <p>
  //       Goal: {this.props.pool.goalFunds} <br />
  //       Current: {this.props.pool.currentFunds}
  //     </p>

  //     <p>
  //       {/* <a href="/donate">
  //         <button onClick={() => redirect()}>Donate</button>
  //       </a> */}
  //     </p>
  //     </a>
  //   </div>
  // }

  render() {
    console.log('in the markers')
    return (
      <Marker
        onClick={this.onToggleOpen}
        icon={this.waterIcon}
        animation={google.maps.Animation.DROP}
        position={{
          lat: Number(this.props.pool.latitude),
          lng: Number(this.props.pool.longitude)
        }}
      >
        {this.state.isOpen && (
          <div>
            <InfoWindow
              onCloseClick={this.onToggleOpen}
              style={{backgroundColor: 'lightblue'}}
            >
              <InfoWindowContent pool={this.props.pool} />
            </InfoWindow>
          </div>
        )}
      </Marker>
    )
  }
}
