'use strict'

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {gettingPool} from '../store/pool'
import {
  withStyles,
  Typography,
  Button,
  Card,
  CardActions,
  CardContent
} from '@material-ui/core'
import {Link} from 'react-router-dom'

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

class Pool extends Component {
  constructor() {
    super()
    this.state = {}
  }
  componentDidMount() {
    this.props.getPool(this.props.match.params.id)
  }

  render() {
    const {classes, pool} = this.props
    return (
      <Card className={classes.card}>
        {pool && (
          <CardContent>
            <Link to={`/pools/${pool.id}`}>
              <Typography variant="headline">Name: {pool.name}</Typography>
            </Link>
            <Link to="/donate" className="donate-button-link" justify="center">
              <Button color="inherit">Donate</Button>
            </Link>
          </CardContent>
        )}
      </Card>
    )
  }
}

Pool.propTypes = {
  classes: PropTypes.object.isRequired
}
const mapState = state => {
  return {
    pool: state.pool.singlePool
  }
}

const mapDispatch = dispatch => {
  return {
    getPool: id => dispatch(gettingPool(id))
  }
}

export default withStyles(styles)(connect(mapState, mapDispatch)(Pool))
