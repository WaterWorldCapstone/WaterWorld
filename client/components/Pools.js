'use strict'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {gettingPools} from '../store/pool'
import {Grid, withStyles, Typography, Button, Paper} from '@material-ui/core'
import {Link} from 'react-router-dom'
import SinglePoolCard from './SinglePoolCard'
import CircularProgress from '@material-ui/core/CircularProgress'
import PropTypes from 'prop-types'
import CardContent from '@material-ui/core/CardContent'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'

const styles = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  button: {
    border: '1px solid #9191bc',
    backgroundColor: '#9191bc',
    color: 'whitesmoke',
    padding: '0.5%',
    fontSize: 15
  }
}

class Pools extends Component {
  constructor() {
    super()
    this.state = {
      continent: {
        NorthAmerica: false,
        Africa: false,
        SouthAmerica: false,
        Asia: false,
        Europe: false,
        Australia: false,
        Antarctica: false
      },
      progress: {
        nearlythere: false,
        halfway: false,
        gettingstarted: false
      },
      open: false
    }
  }
  componentDidMount() {
    this.props.getPools()
  }

  handleChange = (name, type) => event => {
    if (type === 'continent') {
      this.setState({
        continent: {...this.state.continent, [name]: event.target.checked}
      })
    } else if (type === 'progress') {
      this.setState({
        progress: {...this.state.progress, [name]: event.target.checked}
      })
    }
  }
  handleClick = () => {
    this.setState({
      open: !this.state.open
    })
  }
  render() {
    let conts = []
    for (var i in this.state.continent) {
      if (this.state.continent[i] === true) {
        conts.push(i)
      }
    }
    let progs = []
    for (var i in this.state.progress) {
      if (this.state.progress[i] === true) {
        progs.push(i)
      }
    }
    let pools = this.props.pools
    if (conts.length > 0) {
      pools = this.props.pools.filter(pool => {
        return conts.includes(String(pool.continent.replace(' ', '')))
      })
    }
    if (progs.length > 0) {
      pools = pools.filter(pool => {
        return progs.includes(pool.progress)
      })
    }
    const {classes} = this.props
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
        <Grid item xs={12}>
          <Button onClick={this.handleClick} className={classes.button}>
            Filter
          </Button>
        </Grid>
        {
          <SwipeableDrawer
            open={this.state.open}
            onClose={this.handleClick}
            onOpen={this.handleClick}
            onClick={this.handleClick}
          >
            <CardContent>
              <FormControl component="fieldset">
                <FormLabel component="legend">Select Continents</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.continent.NorthAmerica}
                        onChange={this.handleChange(
                          'NorthAmerica',
                          'continent'
                        )}
                        value="NorthAmerica"
                      />
                    }
                    label="North America"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.continent.Africa}
                        onChange={this.handleChange('Africa', 'continent')}
                        value="Africa"
                      />
                    }
                    label="Africa"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.continent.SouthAmerica}
                        onChange={this.handleChange(
                          'SouthAmerica',
                          'continent'
                        )}
                        value="SouthAmerica"
                      />
                    }
                    label="South America"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.continent.Asia}
                        onChange={this.handleChange('Asia', 'continent')}
                        value="Asia"
                      />
                    }
                    label="Asia"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.continent.Europe}
                        onChange={this.handleChange('Europe', 'continent')}
                        value="Europe"
                      />
                    }
                    label="Europe"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.continent.Antarctica}
                        onChange={this.handleChange('Antarctica', 'continent')}
                        value="Antarctica"
                      />
                    }
                    label="Antarctica"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.continent.Australia}
                        onChange={this.handleChange('Australia', 'continent')}
                        value="Australia"
                      />
                    }
                    label="Australia"
                  />
                </FormGroup>

                <FormLabel component="legend">Select Goal Progress</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.progress.nearlythere}
                        onChange={this.handleChange('nearlythere', 'progress')}
                        value="nearlythere"
                      />
                    }
                    label="Nearly There"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.progress.halfway}
                        onChange={this.handleChange('halfway', 'progress')}
                        value="halfway"
                      />
                    }
                    label="Halfway"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.progress.gettingstarted}
                        onChange={this.handleChange(
                          'gettingstarted',
                          'progress'
                        )}
                        value="gettingstarted"
                      />
                    }
                    label="Getting Started"
                  />
                </FormGroup>
              </FormControl>
            </CardContent>
          </SwipeableDrawer>
        }
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
    pools: state.pool.allPools,
    loading: state.pool.loading
  }
}

const mapDispatch = dispatch => {
  return {
    getPools: () => dispatch(gettingPools())
  }
}

Pools.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapState, mapDispatch)(withStyles(styles)(Pools))
