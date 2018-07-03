import Axios from 'axios'
import {LOADING, LOADED, ERROR} from './constants'

const LOADING_BIDS = 'LOADING_BIDS'
const LOADED_BIDS = 'LOADED_BIDS'
const CREATE_BID = 'CREATE_BID'

export const addBid = bid => async dispatch => {
  try {
    dispatch({type: LOADING_BIDS})
    const newBid = await Axios.post(`/api/bids/`, bid)
    dispatch({type: CREATE_BID, payload: newBid.data})
  } catch (e) {
    dispatch({type: ERROR, payload: e})
  }
}

const initialState = {
  status: LOADING,
  collection: [{}]
}
//{vendorId: 0, poolId: 0, amount: 0}

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_BIDS:
      return {...state, status: LOADING}
    case CREATE_BID:
      return {...state, collection: [...state.collection, action.payload]}
    default:
      return state
  }
}
