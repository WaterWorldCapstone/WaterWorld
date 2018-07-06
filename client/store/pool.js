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
const ADD_POOL = 'ADD_POOL'
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
const addPool = pool => ({type: ADD_POOL, pool})

/**
 * THUNK CREATORS
 */
export const gettingPools = () =>
  asyncHandler(async dispatch => {
    dispatch(fetching())
    const res = await axios.get('/api/pools')
    res.data.map(elem => {
      let progress = Number(elem.currentFunds) * 1.0 / Number(elem.goalFunds)
      if (0 < progress && progress < 0.3) {
        elem.progress = 'gettingstarted'
      } else if (0.29 < progress && progress < 0.67) {
        elem.progress = 'halfway'
      } else if (0.66 < progress) {
        elem.progress = 'nearlythere'
      }
    })
    dispatch(receivePools(res.data))
  })

export const gettingPool = id =>
  asyncHandler(async dispatch => {
    dispatch(fetching())
    const res = await axios.get(`/api/pools/${id}`)
    dispatch(receivePool(res.data))
  })

export const userCreatePool = geoObj =>
  asyncHandler(async dispatch => {
    console.log('reached userCreatePool')
    const res = await axios.post(`/api/pools/input`, {
      name: geoObj.formatted_address,
      latitude: geoObj.geometry.location.lat,
      longitude: geoObj.geometry.location.lng,
      town: geoObj.address_components[1].long_name,
      country: geoObj.address_components[2].long_name,
      continent: 'Africa'
    })
    console.log('userCreatePool', res.data)
    dispatch(addPool(res.data))
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
    case ADD_POOL:
      return {
        ...state,
        singlePool: action.pool,
        allPools: [...state.allPools, action.pool]
      }
    default:
      return state
  }
}
