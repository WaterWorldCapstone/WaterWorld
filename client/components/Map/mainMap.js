import React from 'react'
import HomeMap from './Map'
import {connect} from 'react-redux'
import {gettingPools} from '../../store/pool'

class MainMap extends React.Component {
  componentDidMount() {
    console.log('in component did mount', this.props)
    this.props.getPools()
    console.log('in component did mount after thunk', this.props)
  }

  render() {
    console.log('pools are', this.props.pools)
    return (
      <HomeMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBEn6qWhn0flVzQ0uNzas6RCz9jYJT1xQM&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{height: `100%`}} />}
        containerElement={<div style={{height: `600px`}} />}
        mapElement={<div style={{height: `100%`}} />}
      />
    )
  }
}

const mapState = state => {
  return {
    pools: state.pool.allPools
  }
}

const mapDispatch = dispatch => {
  return {
    getPools: () => dispatch(gettingPools())
  }
}

export default connect(mapState, mapDispatch)(MainMap)
