import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import {selectPool} from '../../store/donation'
import {connect} from 'react-redux'
import {gettingPools} from '../../store'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
})

class DonationPoolSelector extends React.Component {
  state = {
    poolId: 0
  }
  componentDidMount = () => {
    this.props.gettingPools()
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
    this.props.selectPool(event.target.value)
  }

  render() {
    const {classes, filteredPools, loading} = this.props
    if (loading) return <h1>Loading...</h1>
    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="pool-helper">Pool</InputLabel>
          <Select
            value={this.state.poolId}
            onChange={this.handleChange}
            input={<Input name="poolId" id="pool-helper" />}
          >
            {filteredPools.map(pool => {
              return (
                <MenuItem key={pool.id} value={pool.id}>
                  {pool.name}
                </MenuItem>
              )
            })}
          </Select>
          <FormHelperText>Pick a pool!</FormHelperText>
        </FormControl>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.pool.loading,
  filteredPools: state.pool.allPools.filter(
    pool => pool.status === 'collecting money'
  )
})
const mapDispatchToProps = {selectPool, gettingPools}

DonationPoolSelector.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(DonationPoolSelector)
)
