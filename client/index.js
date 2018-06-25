import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'

// establishes socket connection
import './socket'
import {MuiThemeProvider} from '@material-ui/core'
import {getMuiTheme, lightBaseTheme} from 'material-ui/styles'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
)
