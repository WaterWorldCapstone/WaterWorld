import React from 'react'
import {HomeMap} from './Map'
import {connect} from 'react-redux'
import {gettingPools} from '../../store/pool'
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
  }
  render() {
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
      <div>
        <HomeMap pools={this.props.pools} />{' '}
      </div>
    )
  }
}

const mapState = state => {
  return {
    pools: state.pool.allPools,
    loading: state.pool.loading
  }
}

const mapDispatch = dispatch => {
  return {
    getPools: () => dispatch(gettingPools())
  }
}

export default connect(mapState, mapDispatch)(MainMap)
