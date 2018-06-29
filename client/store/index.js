import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import pool from './pool'

const reducer = combineReducers({user, pool})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export const [LOADING, LOADED, ERROR] = ['LOADING', 'LOADED', 'ERROR']

export default store
export * from './user'
export * from './pool'
