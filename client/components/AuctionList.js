'use strict'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {gettingPools} from '../store/pool'
import PropTypes from 'prop-types'
import {Grid, withStyles, Typography, Button, Paper} from '@material-ui/core'
import {Link} from 'react-router-dom'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
})

class AuctionList extends Component {
  constructor() {
    super()
    this.state = {}
  }
  componentDidMount() {
    this.props.gettingPools()
  }

  render() {
    const {classes} = this.props
    const pools = this.props.pools
    return (
      <Grid container spacing={24} id="pools">
        <Grid item xs={12}>
          <div>
            <Paper className={classes.root} elevation={1}>
              <Typography variant="headline" component="h3">
                The following pools are ready for bids!
              </Typography>
              <Typography component="p">
                Click on a pool to access the bid form. You may bid one bid
                while time remains.
              </Typography>
            </Paper>
          </div>
        </Grid>
        {pools &&
          pools.filter(pool => pool.status === 'open for bidding').map(pool => {
            return (
              <Grid container className="pools-p" key={pool.id}>
                <Grid item xs={6}>
                  <Link to={`/pools/${pool.id}`}>
                    <Typography variant="headline">
                      Name: {pool.name}
                    </Typography>
                  </Link>
                  <Grid
                    item
                    xs={6}
                    className="pools-p-info"
                    style={{margin: '0'}}
                  >
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

const mapDispatch = {
  gettingPools
}

AuctionList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(connect(mapState, mapDispatch)(AuctionList))
