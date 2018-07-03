import React from 'react'
import DonorNav from './DonorNav'
import VendorNav from './VendorNav'
import AdminNav from './AdminNav'

const [donor, vendor, admin] = ['donor', 'vendor', 'admin']
const NavSwitch = props => {
  switch (props.userType) {
    case donor:
      return <DonorNav />
    case vendor:
      return <VendorNav />
    case admin:
      return <AdminNav />
    default:
      return <DonorNav />
  }
}

export default NavSwitch
