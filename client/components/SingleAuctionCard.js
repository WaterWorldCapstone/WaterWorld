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

function SingleAuctionCard(props) {
  console.log('in single pool card', window.screen.availWidth)
  const {classes, pool} = props

  const redirect = () => {}

  return (
    <div>
      <Card className={classes.card}>
        <Link to={`/auctions/${pool.id}`}>
          <CardMedia className={classes.media} />
          <CardContent className="single-auction-card">
            <Typography gutterBottom variant="headline" component="h2">
              {pool.name}
            </Typography>
            <Typography component="p">
              Location: {pool.town}, {pool.country}
            </Typography>
            <Typography variant="display2">{pool.targetQuantity}</Typography>
          </CardContent>
        </Link>
        <CardActions>
          <Button
            component={Link}
            to={`/pools/${pool.poolId}`}
            size="small"
            color="primary"
          >
            Learn More
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

SingleAuctionCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SingleAuctionCard)
