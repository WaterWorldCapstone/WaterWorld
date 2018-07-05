import {LOADING, LOADED, ERROR} from './constants'
import Axios from 'axios'

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

const ADD_DONATION = 'ADD_DONATION'
const SELECT_POOL = 'SELECT_POOL'
const PAST_DONATIONS = 'PAST_DONATIONS'

export const getDonations = () => async dispatch => {
  try {
    dispatch({type: LOADING_DONATIONS})
    const allDonations = await Axios.get(`/api/donations/`)
    dispatch({type: LOADED_DONATIONS, payload: allDonations.data})
  } catch (e) {
    dispatch({type: ERROR_DONATIONS, payload: e})
  }
}

export const getDonation = id => async dispatch => {
  try {
    dispatch({type: LOADING_DONATION})
    const singleDonation = await Axios.get(`/api/donations/${id}`)
    dispatch({type: LOADED_DONATION, payload: singleDonation.data})
  } catch (e) {
    dispatch({type: ERROR_DONATION, payload: e})
  }
}

export const addDonation = (donorId, poolId, amount) => async dispatch => {
  console.log(donorId, poolId, amount, 'DONATION')
  try {
    dispatch({type: LOADING_DONATIONS})
    const newDonation = await Axios.post(`/api/donations/`, {
      donorId,
      poolId,
      amount
    })
    dispatch({type: ADD_DONATION}, {payload: newDonation.data})
  } catch (e) {
    dispatch({type: ERROR_DONATIONS, payload: e})
  }
}

export const selectPool = id => async dispatch => {
  dispatch({type: SELECT_POOL, payload: id})
}

export const getPastDonations = donorId => async dispatch => {
  try {
    dispatch({type: LOADING_DONATIONS})
    const pastDonations = await Axios.get(`/api/donors/${donorId}`)
    console.log('pastDonations are:', pastDonations.data)
    let donations = []
    pastDonations.data.donations.forEach(elem => donations.push(elem.pool))
    console.log('donations are', donations)
    dispatch({type: PAST_DONATIONS, payload: donations})
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
    case ADD_DONATION:
      return {
        ...state,
        status: LOADED,
        allDonations: [...state.allDonations, action.payload]
      }
    case SELECT_POOL:
      return {...state, currentPoolId: action.payload}
    case PAST_DONATIONS:
      return {...state, pastDonations: action.payload}
    case ERROR_DONATION:
      return {...state, status: ERROR, error: action.payload}
    case ERROR_DONATIONS:
      return {...state, status: ERROR, error: action.payload}
    default:
      return state
  }
}
