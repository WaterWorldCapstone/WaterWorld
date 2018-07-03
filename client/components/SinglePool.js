'use strict'
import {Link} from 'react-router-dom'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {gettingPool} from '../store/pool'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import red from '@material-ui/core/colors/red'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import {CardActions} from 'material-ui'

const styles = theme => ({
  card: {
    maxWidth: '100%'
  },
  media: {
    /* padding-top: 56.25%; */
    padding: '10% 10%',
    height: 'auto',
    width: 'auto',
    maxHeight: '40%',
    maxWidth: '50%',
    margin: '0 auto'
    // 16:9
  },
  actions: {
    display: 'flex'
  },
  avatar: {
    backgroundColor: red[500]
  },
  facts: {
    border: ' 1px auto solid #01547b'
  },
  heading: {
    fontWeight: 'bold'
  },
  things: {
    border: ' 1px auto solid #01547b'
    // textAlign: 'center'
  },
  donateButton: {
    display: `flex`,
    justifyContent: `center`
  },
  button: {
    border: ' 1px auto solid #01547b',
    textAlign: 'center',
    backgroundColor: '#01547b',
    color: 'white'
  }
})

class Pool extends Component {
  constructor() {
    super()
    this.state = {}
  }
  componentDidMount() {
    this.props.getPool(this.props.match.params.id)
  }

  render() {
    const {pool, classes} = this.props
    const date = pool.createdAt && pool.createdAt.slice(0, 10)
    console.log(pool)
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Pool" className={classes.avatar}>
              P
            </Avatar>
          }
          action={pool.date}
          title={pool.name}
          subheader={`${pool.town}, ${pool.country}`}
        />
        <CardMedia
          className={classes.media}
          image="https://o.aolcdn.com/images/dims3/GLOB/legacy_thumbnail/630x315/format/jpg/quality/85/http%3A%2F%2Fi.huffpost.com%2Fgen%2F4180804%2Fimages%2Fn-POVERTY-AFRICA-628x314.jpg"
          title={`Water needs in ${pool.country}`}
        />
        <CardContent className={classes.facts}>
          <Typography component="p" className={classes.heading}>
            ABOUT:{' '}
          </Typography>
          <CardContent className={classes.things}>
            <Typography component="p">
              How would you feel if you weren't able to have a sanitary place to
              go to the bathroom? If you didn't have access to clean, safe,
              drinking water? For people who do have access to these things it
              can be hard to understand how lucky we are. Not everyone in the
              world has access to clean water and sanitation, but there is
              enough water in the world today to prevent that. The sixth
              Sustainable Development Goal is Clean Water and Sanitation, the
              aim being to "Ensure availability and sustainable management of
              water and sanitation for all." Provided that access to clean water
              and sanitation is a human right -- shouldn't everyone in the world
              already have access to it? Unfortunately, that's not the case.
              Here are some statistics released in the United Nations report on
              the Clean Water and Sanitation Global Goal. Around 1.8 billion
              people globally use a source of drinking water that is fecally
              contaminated. Some 2.4 billion people lack access to basic
              sanitation services, such as toilets or latrines. Water scarcity
              affects more than 40 per cent of the global population and is
              projected to rise. More than 80 per cent of wastewater resulting
              from human activities is discharged into rivers or sea without any
              treatment, leading to pollution. Many of the diseases that are
              lethal can be prevented if individuals living in developing
              nations without access to these services were provided with them.
              What we can see is that water and sanitation-related diseases
              remain among the major causes of death in children under five.
              It's also clear that achieving this goal is vital in achieving
              many of the other Sustainable Development Goals. Helping people
              spend time getting educated instead of fetching it, and without
              human waste going into water ecosystems, and increased
              sustainability ecologically.
            </Typography>
          </CardContent>
        </CardContent>
        <CardContent className={classes.facts}>
          <Typography component="p" className={classes.heading}>
            DETAILS:{' '}
          </Typography>
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <CardContent className={classes.facts}>
                <Typography component="p">
                  Current: {pool.currentFunds}{' '}
                </Typography>{' '}
              </CardContent>
              <CardContent className={classes.facts}>
                <Typography component="p">Target: {pool.goalFunds}</Typography>{' '}
              </CardContent>
              <CardContent className={classes.facts}>
                <Typography component="p">
                  Population: {pool.population}
                </Typography>{' '}
              </CardContent>
            </Grid>
            <Grid item xs={6}>
              <CardContent className={classes.facts}>
                <Typography component="p">
                  Mortality Rate: {pool.mortalityRate}{' '}
                </Typography>{' '}
              </CardContent>
              <CardContent className={classes.facts}>
                <Typography component="p">
                  Need Intensity: {pool.needIntensity}
                </Typography>{' '}
              </CardContent>
              <CardContent className={classes.facts}>
                <Typography component="p">
                  Water Quality: {pool.waterQuality}
                </Typography>{' '}
              </CardContent>
            </Grid>
          </Grid>
        </CardContent>
        <CardContent className={classes.facts}>
          <Typography component="p" className={classes.heading}>
            INTERESTING FACTS:{' '}
          </Typography>
          {pool.factoids &&
            pool.factoids.map((factoid, idx) => (
              <CardContent key={idx} className={classes.things}>
                <Typography component="p"> {factoid} </Typography>{' '}
              </CardContent>
            ))}
        </CardContent>
        <CardContent className={classes.facts}>
          <Typography component="p" className={classes.heading}>
            DONATIONS:{' '}
          </Typography>
          {pool.donations &&
            pool.donations.map(donation => {
              return (
                <CardContent className={classes.things} key={donation.id}>
                  <Typography component="p">
                    {`${
                      donation.donor.user.firstName
                    } has donated $${donation.amount / 100}`}
                  </Typography>
                </CardContent>
              )
            })}
        </CardContent>
        <CardContent className={classes.donateButton}>
          {/* <CardContent classes={classes.facts}> */}
          <Button
            component={Link}
            to={`/pools/${pool.id}/donate`}
            className={classes.button}
          >
            Donate
          </Button>
        </CardContent>
      </Card>
    )
  }
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
Pool.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapState, mapDispatch)(withStyles(styles)(Pool))
