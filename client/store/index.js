import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import pool from './pool'
import bid from './bid'
import donation from './donation'
import {vendorReducer as vendor} from './vendor'
import form from './form.js'
import region from './region'

const reducer = combineReducers({
  user,
  pool,
  vendor,
  bid,
  donation,
  form,
  region
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './pool'
export * from './region'
