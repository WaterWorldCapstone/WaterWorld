import {LOADING, LOADED, ERROR} from './index'
import Axios from 'axios'
import {triggerAsyncId} from 'async_hooks'

const [LOADING_DONATIONS, LOADED_DONATIONS, ERROR_DONATIONS] = [
  'LOADING_DONATIONS',
  'LOADED_DONATIONS',
  'ERROR_DONATIONS'
]

const [LOADING_DONATION, LOADED_DONATION, ERROR_DONATION] = [
  'LOADING_DONATION',
  'LOADED_DONATION',
  'ERROR_DONATION'
]

export const getDonations = () => async dispatch => {
  try {
    dispatch({type: LOADING_DONATIONS})
    const allDonations = await Axios.get(`/api/donations/`)
    dispatch({type: LOADED_DONATIONS, payload: allDonations})
  } catch (e) {
    dispatch({type: ERROR_DONATIONS, payload: e})
  }
}

const initialState = {allDonations: [], singleDonation: {}, status: LOADING}

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DONATIONS:
      return {...state, status: LOADING}
    case LOADED_DONATIONS:
      return {...state, status: LOADED, allDonations: action.payload}
    case LOADING_DONATION:
      return {...state, status: LOADING}
    case LOADED_DONATION:
      return {...state, status: LOADED, singleDonation: action.payload}
    case ERROR_DONATION:
      return {...state, status: ERROR, error: action.payload}
    case ERROR_DONATIONS:
      return {...state, status: ERROR, error: action.payload}
    default:
      return state
  }
}
