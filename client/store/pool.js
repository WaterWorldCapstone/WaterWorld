import axios from 'axios'
import history from '../history'
const asyncHandler = require('express-async-handler')
/**
 * ACTION TYPES
 */
const GET_POOLS = 'GET_POOLS'
const GET_POOL = 'GET_POOL'
// const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const pools = {}

/**
 * ACTION CREATORS
 */
const getPools = allPools => ({type: GET_POOLS, allPools})
const getPool = pool => ({type: GET_POOL, pool})

/**
 * THUNK CREATORS
 */
export const gettingPools = () =>
  asyncHandler(async dispatch => {
    const res = await axios.get('/api/pools')
    dispatch(getPools(res.data))
  })

export const gettingPool = id =>
  asyncHandler(async dispatch => {
    console.log('hiiiiiiis')
    const res = await axios.get(`/api/pools/${id}`)
    dispatch(getPool(res.data))
  })

/**
 * REDUCER
 */
export default function(state = pools, action) {
  switch (action.type) {
    case GET_POOLS:
      return {...state, allPools: action.allPools}
    case GET_POOL:
      return action.pool
    default:
      return state
  }
}
