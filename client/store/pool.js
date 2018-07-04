import axios from 'axios'
import history from '../history'
import {LOADING} from './constants'
const asyncHandler = require('express-async-handler')
/**
 * ACTION TYPES
 */
const GET_POOLS = 'GET_POOLS'
const GET_POOL = 'GET_POOL'
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
  allPoolsStatus: LOADING,
  singlePoolStatus: LOADING,
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
    console.log('in the gettingPools thunk', res.data)
    res.data.map(elem => {
      let progress = Number(elem.currentFunds) * 1.0 / Number(elem.goalFunds)
      console.log('in da thunk, progress is:', progress)
      if (0 < progress && progress < 0.3) {
        elem.progress = 'gettingstarted'
      } else if (0.29 < progress && progress < 0.67) {
        elem.progress = 'halfway'
      } else if (0.66 < progress) {
        elem.progress = 'nearlythere'
      }
      console.log('after progress setting', elem)
    })
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
    case GET_POOLS:
      return {...state, allPools: action.allPools}
    case GET_POOL:
      return {...state, singlePool: action.pool}
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
