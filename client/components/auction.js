import React, {Component} from 'react'
import {Grid, withStyles, Typography, Button} from '@material-ui/core'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const styles = theme => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
    textAlign: 'center'
  }
})
// componentDidMount() {
//   this.props.poolamount()
// }

class Auction extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    console.log(this.props)
    const {classes} = this.props
    return (
      <div>
        <Grid
          container
          className={classes.root}
          spacing={24}
          id="auction-page-grid"
          justify="center"
        >
          <Grid item xs={12}>
            <Typography variant="title">"Welcome Vendors"</Typography>
          </Grid>
          <Link to="/auction/bid">
            <Button variant="contained" color="primary">
              Bid
            </Button>
          </Link>
        </Grid>
      </div>
    )
  }
}
Auction.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Auction)
