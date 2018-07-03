import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import {Link} from 'react-router-dom'

const styles = {
  card: {
    maxWidth: '100%',
    flexBasis: '100%'
  },
  media: {
    height: 0,
    paddingRight: '0.8%', //'56.25%', // 16:9
    maxWidth: '100%',
    flexBasis: '100%'
  }
}

function SinglePoolCard(props) {
  console.log('in single pool card', window.screen.availWidth)
  const {classes, pool} = props

  const redirect = () => {}

  return (
    <div>
      <Card className={classes.card}>
        <Link to={`/pools/${pool.id}`}>
          <CardMedia className={classes.media} src="1" />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {pool.name}
            </Typography>
            <Typography component="p">
              Location: {pool.town}, {pool.country}
            </Typography>
            <div className="single-pool-card">
              <Typography variant="display2">
                ${pool.currentFunds}/${pool.goalFunds}
              </Typography>
              <Typography variant="display2">{pool.mortalityRate}</Typography>
              <Typography variant="display2">{pool.waterQuality}</Typography>
            </div>
          </CardContent>
        </Link>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
          <Button href="/donate" variant="text" color="secondary">
            Donate
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

SinglePoolCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SinglePoolCard)
