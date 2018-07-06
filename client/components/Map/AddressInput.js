import React from 'react'
import {connect} from 'react-redux'
import Input from '@material-ui/core/Input'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'
import Geocode from 'react-geocode'
import {userCreatePool} from '../../store/pool'

const styles = {
  card: {
    maxWidth: '100%',
    flexBasis: '100%',
    height: '15vh',
    borderTop: 'cadetblue',
    borderTopStyle: 'ridge',
    background: 'lightgrey'
  }
  // input: {
  //   display: flex,
  //   alignItems:
  // }
}

class AddressInput extends React.Component {
  constructor() {
    super()
    this.state = {
      address: ''
    }
  }

  handleChange = evt => {
    console.log('handle change')
    this.setState({
      address: evt.target.value
    })
    console.log('after change', this.state)
  }

  handleSubmit = async () => {
    console.log('in handle submit')
    Geocode.setApiKey('AIzaSyA20TkCPUNLGalFeFnkmkpbp5L0gRoR6bE')
    const geo = await Geocode.fromAddress(this.state.address)
    this.props.userCreatePool(geo.results[0])
    console.log('geo is', geo.results[0])
  }

  render() {
    return (
      <div>
        <Card className={this.props.classes.card} raised={true}>
          <Typography>
            Click the numbered circles on the map to find donation campaigns!
          </Typography>
          <Typography>
            If you don't see what you're looking for, type in a town and country
            to start a new campaign.
          </Typography>
          <Typography />
          <div className="test">
            <Input onChange={this.handleChange} />
            <Button size="small" color="primary" onClick={this.handleSubmit}>
              Submit
            </Button>
          </div>
        </Card>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    userCreatePool: geoObj => dispatch(userCreatePool(geoObj))
  }
}

export default withStyles(styles)(connect(null, mapDispatch)(AddressInput))
