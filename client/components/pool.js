'use strict'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {gettingPool} from '../store/pool'
import {Grid, withStyles, Typography, Button} from '@material-ui/core'
import {Link} from 'react-router-dom'

class Pool extends Component {
  constructor() {
    super()
    this.state = {}
  }
  componentDidMount() {
    this.props.getPool(this.props.match.params.poolId)
  }

  render() {
    console.log(this.props.pool)
    const pool = this.props.pool
    return (
      <Grid container spacing={24} id="pools">
        {pool.continent && (
          <Grid container className="pools-p" key={pool.id}>
            <Grid item xs={6}>
              <Link to={`/pools/${pool.id}`}>
                <Typography variant="headline">Name: {pool.name}</Typography>
              </Link>
              <Grid item xs={6} className="pools-p-info" style={{margin: '0'}}>
                <Typography variant="subheading">
                  Target: {pool.goalFunds}, Location: {pool.continent}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              xs={6}
              className="donate-button"
              style={{margin: 'auto', paddingRight: '1%'}}
            >
              <Link
                to="/donate"
                className="donate-button-link"
                justify="center"
              >
                <Button color="inherit">Donate</Button>
              </Link>
            </Grid>
          </Grid>
        )}
      </Grid>
    )
  }
}

const mapState = state => {
  return {
    pool: state.pool
  }
}

const mapDispatch = dispatch => {
  return {
    getPool: id => dispatch(gettingPool(id))
  }
}

export default connect(mapState, mapDispatch)(Pool)
