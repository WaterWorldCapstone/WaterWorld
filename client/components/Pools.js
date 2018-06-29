'use strict'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {gettingPools} from '../store/pool'
import {Grid, withStyles, Typography, Button} from '@material-ui/core'
import {Link} from 'react-router-dom'
import SinglePoolCard from './SinglePoolCard'

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
    return (
      <Grid container spacing={24} id="pools">
        {pools &&
          pools.map(pool => {
            return (
              <Grid container key={pool.id}>
                <Grid item xs={12}>
                  <SinglePoolCard pool={pool} />
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
    pools: state.pool.allPools
  }
}

const mapDispatch = dispatch => {
  return {
    getPools: () => dispatch(gettingPools())
  }
}

export default connect(mapState, mapDispatch)(Pools)
