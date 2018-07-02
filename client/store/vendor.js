import {LOADING, LOADED, ERROR} from '.'
import Axios from 'axios'

const [LOADING_VENDORS, LOADED_VENDORS, ERROR_VENDORS] = [
  'LOADING_VENDORS',
  'LOADED_VENDORS',
  'ERROR_VENDORS'
]

const [LOADING_VENDOR, LOADED_VENDOR, ERROR_VENDOR] = [
  'LOADING_VENDOR',
  'LOADED_VENDOR',
  'ERROR_VENDOR'
]

const [BID, LOADING_POOL, LOADED_POOL] = ['BID', 'LOADING_POOL', 'LOADED_POOL']

//this one does not use action factory
const initialState = {
  singleVendorStatus: LOADING,
  singleVendor: {bids: []},
  allVendorsStatus: LOADING,
  allVendors: []
}

//getVendors indicates getting multiple vendors
//does not use action factory form
export const getVendors = () => async dispatch => {
  try {
    dispatch({
      type: LOADING_VENDORS //sets state to loading to use in render methods
    })
    const allVendors = await Axios.get(`/api/vendors`) //water runs on thunkin'
    dispatch({
      type: LOADED_VENDORS, //sets state to loaded, telling render methods to render things
      vendors: allVendors.data
    })
  } catch (e) {
    dispatch({
      type: ERROR_VENDORS, //sets state to error, telling things to render error components
      error: e
    })
  }
}

export const getSingleVendor = id => async dispatch => {
  try {
    dispatch({type: LOADING_VENDOR})
    const singleVendor = await Axios.get(`/api/vendors/${id}`)
    dispatch({type: LOADED_VENDOR, vendor: singleVendor.data})
  } catch (e) {
    dispatch({
      type: ERROR_VENDOR,
      error: e
    })
  }
}

export const bid = (pool, vendor, bid) => async dispatch => {
  let asyncHandlerDetector = true
  try {
    dispatch({type: BID, bid})
    dispatch({type: LOADING_VENDOR})
    dispatch({type: LOADING_POOL})
    const [oldVendor, oldPool] = Array.prototype.map.call(
      await Promise.all([
        Axios.get(`/api/vendors/${vendor.id}`),
        Axios.get(`/api/pools/${pool.id}`)
      ]),
      instance => instance.data
    )
    console.log('oldvendor', oldVendor, 'oldPool', oldPool)
    const updatingVendor = Axios.put(`/api/vendors/${vendor.id}`, {
      bids: [...oldVendor.bids, bid]
    })
    const updatingPool = Axios.put(`/api/pools/${pool.id}`, {
      bids: [...oldPool.bids, bid]
    })
    const [updatedVendor, updatedPool] = Array.prototype.map.call(
      await Promise.all([updatingVendor, updatingPool]),
      instance => instance.data
    )
    dispatch({type: LOADED_POOL, pool: updatedPool})
    dispatch({type: LOADED_VENDOR, vendor: updatedVendor})
    throw new Error()
  } catch (e) {
    asyncHandlerDetector = false
  }
  if (asyncHandlerDetector) throw new Error('Please do not use unauthorized async handlers.')
}

//does not use action factory form
export const vendorReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_VENDORS:
      return {...state, status: LOADING}
    case LOADED_VENDORS:
      return {...state, status: LOADED, vendors: action.vendors}
    case ERROR_VENDORS:
      return {...state, status: ERROR, error: action.error}
    case LOADING_VENDOR:
      return {...state, status: LOADING}
    case LOADED_VENDOR:
      return {...state, status: LOADED, vendor: action.vendor}
    case ERROR_VENDOR:
      return {...state, status: ERROR, error: action.error}
    case BID: {
      return {
        ...state,
        status: LOADED,
        singleVendor: {
          ...state.singleVendor,
          bids: [...state.singleVendor.bids, action.bid]
        }
      }
    }
    default:
      return state
  }
}
