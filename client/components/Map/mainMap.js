import React from 'react'
import {HomeMap} from './Map'
import {connect} from 'react-redux'
import {gettingPools} from '../../store/pool'
import {fetchedRegions} from '../../store/region'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps'
import CircularProgress from '@material-ui/core/CircularProgress'

class MainMap extends React.Component {
  componentDidMount() {
    this.props.getPools()
    this.props.getRegions()
    console.log('in mainmap componentdidmount')
  }
  render() {
    console.log('in MainMap, props are:', this.props)
    return this.props.loading === true ? (
      <div className="loading-spinner">
        <CircularProgress
          color="primary"
          size={80}
          thickness={3.6}
          variant="indeterminate"
        />{' '}
      </div>
    ) : (
      <div id="home-map-div">
        <HomeMap
          pools={this.props.pools}
          regions={this.props.regions.allCoords}
        />{' '}
        <div id="filler-map-div" />
      </div>
    )
  }
}

const mapState = state => {
  return {
    pools: state.pool.allPools,
    loading: state.pool.loading,
    regions: state.region
  }
}

const mapDispatch = dispatch => {
  return {
    getPools: () => dispatch(gettingPools()),
    getRegions: () => dispatch(fetchedRegions())
  }
}

export default connect(mapState, mapDispatch)(MainMap)
