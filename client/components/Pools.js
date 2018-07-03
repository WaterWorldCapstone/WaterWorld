'use strict'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {gettingPools} from '../store/pool'
import {Grid, withStyles, Typography, Button, Paper} from '@material-ui/core'
import {Link} from 'react-router-dom'
import SinglePoolCard from './SinglePoolCard'
import CircularProgress from '@material-ui/core/CircularProgress'

class Pools extends Component {
  constructor() {
    super()
    this.state = {}
  }
  componentDidMount() {
    this.props.getPools()
  }

  render() {
    const pools = this.props.pools
    return this.props.loading === true ? (
      <div className="loading-spinner">
        <CircularProgress
          color="primary"
          size={80}
          thickness={3.6}
          variant="indeterminate"
        />
      </div>
    ) : (
      <Grid container spacing={24} id="pools">
        {pools &&
          pools.map(pool => {
            return (
              <Grid container key={pool.id}>
                <Grid item xs={12}>
                  <Paper
                    className="single-pool-list"
                    style={{backgroundColor: `lightgray`}}
                  >
                    <SinglePoolCard pool={pool} />
                  </Paper>
                </Grid>
              </Grid>
            )
          })}
      </Grid>
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

export default connect(mapState, mapDispatch)(Pools)
