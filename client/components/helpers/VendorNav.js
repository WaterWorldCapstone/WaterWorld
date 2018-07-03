import Button from '@material-ui/core/Button'
import {Fragment} from 'react'
import {Link} from 'react-router-dom'

const VendorNav = props => {
  return (
    <Fragment>
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
      <Button
        component={Link}
        to="/auctions"
        className="navbar-link"
        color="inherit"
      >
        Auctions
      </Button>
    </Fragment>
  )
}

export default VendorNav
