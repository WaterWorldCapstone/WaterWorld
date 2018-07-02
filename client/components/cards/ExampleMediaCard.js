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
    maxWidth: 1000
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  }
}

function SimpleMediaCard(props) {
  const {classes} = props
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://vignette.wikia.nocookie.net/civilization/images/d/d6/The_Internet.png/revision/latest?cb=20100802133511"
          title="The Internet"
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            The Internet
          </Typography>
          <Typography component="p">
            Grants all technologies held by at least 2 known civilizations
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            <a
              href="http://civilization.wikia.com/wiki/The_Internet_(Civ4)"
              target="_blank"
            >
              Learn More
            </a>
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

SimpleMediaCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SimpleMediaCard)
