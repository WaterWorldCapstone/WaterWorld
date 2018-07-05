import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import {Link} from 'react-router-dom'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

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

function DonationCard(props) {
  const {classes, donation} = props
  const bull = <span className={classes.bullet}>•</span>

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            {donation.donor.user.fullName}
          </Typography>
          <Typography variant="headline" component="h2">
            {donation.amount}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Thank you! a donation to:
          </Typography>
          <Typography component="p">{donation.pool.name}</Typography>
        </CardContent>
        <CardActions>
          <Button
            component={Link}
            to={`/pools/${donation.pool.id}`}
            size="small"
          >
            Learn More
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

DonationCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(DonationCard)
