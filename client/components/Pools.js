'use strict'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {gettingPools} from '../store/pool'
import {Grid, withStyles, Typography, Button} from '@material-ui/core'
import {Link} from 'react-router-dom'
import SinglePoolCard from './SinglePoolCard'
import CircularProgress from '@material-ui/core/CircularProgress'
import Card from '@material-ui/core/Card'
import PropTypes from 'prop-types'
import CardContent from '@material-ui/core/CardContent'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Checkbox from '@material-ui/core/Checkbox'

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
      }
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
      console.log('after handleChange', this.state.continent)
    } else if (type === 'progress') {
      this.setState({
        progress: {...this.state.progress, [name]: event.target.checked}
      })
    }
  }

  render() {
    console.log('upon rendering', this.props.pools)
    console.log('rendering state is', this.state.continent)
    let conts = []
    for (var i in this.state.continent) {
      if (this.state.continent[i] === true) {
        console.log('trying to push to conts', i)
        conts.push(i)
      }
    }
    console.log('conts should be', conts)
    let progs = []
    console.log('before progs pushing', this.state)
    for (var i in this.state.progress) {
      if (this.state.progress[i] === true) {
        console.log('trying to push to progs', i)
        progs.push(i)
      }
    }
    console.log('progs should be', progs)
    let pools = this.props.pools
    if (conts.length > 0) {
      pools = this.props.pools.filter(pool => {
        console.log(
          'filter check',
          conts.includes(String(pool.continent.replace(' ', ''))) ||
            progs.includes(pool.progress),
          pool
        )
        return conts.includes(String(pool.continent.replace(' ', '')))
      })
    }

    if (progs.length > 0) {
      pools = pools.filter(pool => {
        return progs.includes(pool.progress)
      })
    }

    console.log('filtered pools:', pools)
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
        {/* <Grid container > */}
        <Grid item xs={12} sm={4}>
          <Card className={classes.card}>
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

              {/* </Typography> */}
            </CardContent>
          </Card>
        </Grid>
        {/* </Grid> */}
        <Grid item xs={12} sm={8}>
          {pools &&
            pools.map(pool => {
              console.log('each pools cont', pool.continent.replace(' ', ''))
              return (
                <Grid container key={pool.id}>
                  <Grid item xs={12}>
                    <SinglePoolCard pool={pool} />
                  </Grid>
                </Grid>
              )
            })}
        </Grid>
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
