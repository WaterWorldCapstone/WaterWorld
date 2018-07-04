'use strict'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {gettingPools} from '../store/pool'
import {Grid, withStyles, Typography, Button, Paper} from '@material-ui/core'
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

  handleChange = name => event => {
    this.setState({
      continent: {...this.state.continent, [name]: event.target.checked}
    })
    console.log('after handleChange', this.state.continent)
  }

  render() {
    console.log('upon rendering', this.props.pools)
    console.log('rendering state is', this.state.continent)
    let conts = []
    for (var i in this.state.continent) {
      if (this.state.continent[i] === true) {
        conts.push(i)
      }
    }
    console.log('conts should be', conts)
    let pools = this.props.pools
    if (conts.length > 0) {
      pools = this.props.pools.filter(pool => {
        console.log(
          'filter check',
          conts.includes(String(pool.continent.replace(' ', '')))
        )
        return conts.includes(String(pool.continent.replace(' ', '')))
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
                        checked={this.state.NorthAmerica}
                        onChange={this.handleChange('NorthAmerica')}
                        value="NorthAmerica"
                      />
                    }
                    label="North America"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.Africa}
                        onChange={this.handleChange('Africa')}
                        value="Africa"
                      />
                    }
                    label="Africa"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.SouthAmerica}
                        onChange={this.handleChange('SouthAmerica')}
                        value="SouthAmerica"
                      />
                    }
                    label="South America"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.Asia}
                        onChange={this.handleChange('Asia')}
                        value="Asia"
                      />
                    }
                    label="Asia"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.Europe}
                        onChange={this.handleChange('Europe')}
                        value="Europe"
                      />
                    }
                    label="Europe"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.Antarctica}
                        onChange={this.handleChange('Antarctica')}
                        value="Antarctica"
                      />
                    }
                    label="Antarctica"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.Australia}
                        onChange={this.handleChange('Australia')}
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
                        checked={this.state.nearlythere}
                        onChange={this.handleChange('nearlythere')}
                        value="nearlythere"
                      />
                    }
                    label="Nearly There"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.halfway}
                        onChange={this.handleChange('halfway')}
                        value="halfway"
                      />
                    }
                    label="Halfway"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.gettingstarted}
                        onChange={this.handleChange('gettingstarted')}
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
