import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {Fragment} from 'react'
import {Link} from 'react-router-dom'

const AdminNav = props => {
  return (
    <Fragment>
      <Typography>ADMIN ENABLED!</Typography>
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

export default AdminNav
