import {LOADING, LOADED, ERROR} from './index'
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
  singleVendor: {},
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
    default:
      return state
  }
}
