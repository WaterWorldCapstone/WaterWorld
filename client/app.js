import React from 'react'

import {Navbar, Footer} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div className="site">
      <Navbar />
      <Routes />
      <Footer />
    </div>
  )
}

export default App
