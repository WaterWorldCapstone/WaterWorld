import React from 'react'

import {Navbar, Footer} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div className="site">
      <div id="routes-and-footer">
        <Navbar />
        <Routes />
        <Footer />
      </div>
    </div>
  )
}

export default App
