import Button from '@material-ui/core/Button'
import {Fragment} from 'react'
import {Link} from 'react-router-dom'

const DonorNav = props => {
  return (
    <Fragment>
      <Button
        component={Link}
        to="/donate"
        className="navbar-link"
        color="inherit"
      >
        Donate
      </Button>
      <Button
        component={Link}
        to="/map"
        className="navbar-link"
        color="inherit"
      >
        Map
      </Button>
      <Button
        component={Link}
        to="/pools"
        className="navbar-link"
        color="inherit"
      >
        Pools
      </Button>
    </Fragment>
  )
}

export default DonorNav
