import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_POOLS = 'GET_POOLS'
// const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const pools = {}

/**
 * ACTION CREATORS
 */
const getPools = allPools => ({type: GET_POOLS, allPools})

/**
 * THUNK CREATORS
 */
export const gettingPools = () => async dispatch => {
  try {
    const res = await axios.get('/api/pools')
    dispatch(getPools(res.data || pools))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = pools, action) {
  switch (action.type) {
    case GET_POOLS:
      return {...state, allPools: action.allPools}
    default:
      return state
  }
}
