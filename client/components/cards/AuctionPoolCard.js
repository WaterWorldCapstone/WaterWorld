import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import {connect} from 'tls'
import {LOADING, ERROR, LOADED} from '../../store'

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

function SimpleCard(props) {
  const {classes} = props
  const bull = <span className={classes.bullet}>•</span>
  switch (props.singlePoolStatus) {
    case LOADING:
      return <h1>INSERT SPINNY WHEEL</h1>
    case ERROR:
      return <h1>INSERT ERROR COMPONENT</h1>
    case LOADED:
      return (
        <div>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary">
                Pool for consideration
              </Typography>
              <Typography variant="headline" component="h2">
                {props.singlePool.name}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {props.singlePool.latitude}
              </Typography>
              <Typography component="p">
                {props.singlePool.town}
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </div>
      )
  }
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  allPools: state.pool.allPools,
  singlePool: state.pool.singlePool,
  allPoolsStatus: state.pool.allPoolsStatus,
  singlePoolStatus: state.pool.poolStatus
})

export default withStyles(styles)(connect(mapStateToProps, null)(SimpleCard))
