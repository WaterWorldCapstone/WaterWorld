import axios from 'axios'
import history from '../history'
import {LOADING} from '.'
const asyncHandler = require('express-async-handler')
/**
 * ACTION TYPES
 */
const RECEIVE_POOLS = 'RECEIVE_POOLS'
const RECEIVE_POOL = 'RECEIVE_POOL'
const FETCHING = 'FETCHING'
// const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const pools = {
  allPools: [],
  singlePool: {},
  loading: false
}

/**
 * ACTION CREATORS
 */
const fetching = () => ({type: FETCHING})
const receivePools = allPools => ({type: RECEIVE_POOLS, allPools})
const receivePool = pool => ({type: RECEIVE_POOL, pool})

/**
 * THUNK CREATORS
 */
export const gettingPools = () =>
  asyncHandler(async dispatch => {
    dispatch(fetching())
    const res = await axios.get('/api/pools')
    dispatch(receivePools(res.data))
  })

export const gettingPool = id =>
  asyncHandler(async dispatch => {
    dispatch(fetching())
    const res = await axios.get(`/api/pools/${id}`)
    dispatch(receivePool(res.data))
  })

/**
 * REDUCER
 */
export default function(state = pools, action) {
  switch (action.type) {
    case FETCHING:
      return {...state, loading: true}
    case RECEIVE_POOLS:
      return {...state, allPools: action.allPools, loading: false}
    case RECEIVE_POOL:
      return {...state, singlePool: action.pool, loading: false}
    default:
      return state
  }
}
