import axios from 'axios'
import history from '../history'
const asyncHandler = require('express-async-handler')

/**
 * ACTION TYPES
 */
const RECEIVE_REGIONS = 'RECEIVE_REGIONS'
const FETCHING = 'FETCHING'

/**
 * INITIAL STATE
 */
const regions = {
  loading: false,
  allRegions: [],
  allCoords: []
}

/**
 * ACTION CREATORS
 */
const receiveRegions = (allRegions, coords) => ({
  type: RECEIVE_REGIONS,
  allRegions,
  coords
})
const fetching = () => ({type: FETCHING})

/**
 * THUNK CREATORS
 */

export const fetchedRegions = () =>
  asyncHandler(async dispatch => {
    console.log('in fetchedRegions')
    dispatch(fetching())
    let res = await axios.get('/api/regions')
    let coords = res.data.map(place => {
      return [Number(place.latitude), Number(place.longitude)]
    })
    console.log('coords are', coords)
    dispatch(receiveRegions(res.data, coords))
  })

/**
 * REDUCER
 */
export default function(state = regions, action) {
  switch (action.type) {
    case RECEIVE_REGIONS:
      return {
        ...state,
        allRegions: action.allRegions,
        allCoords: action.coords,
        loading: false
      }
    case FETCHING:
      return {...state, loading: true}
    default:
      return state
  }
}
