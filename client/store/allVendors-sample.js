import {LOADING, LOADED, ERROR} from '.'
import Axios from 'axios'

const [LOADING_VENDORS, LOADED_VENDORS, ERROR_VENDORS] = [
  'LOADING_VENDORS',
  'LOADED_VENDORS',
  'ERROR_VENDORS'
]
/*  two versions of everything written
    one that doesn't use the action factory
    and one that does.
*/

//action factory
const aF = (type, payload) => {
  type, payload
}

//this one does not use action factory
const initialState = {
  status: LOADING,
  vendors: []
}

const initialStateWithAF = {
  status: LOADING,
  collection: []
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

export const getVendorsUsingAF = () => async dispatch => {
  try {
    dispatch(aF(LOADING_VENDORS))
    const allVendors = await Axios.get(`/api/vendors`)
    dispatch(aF(LOADED_VENDORS, allVendors.data))
  } catch (e) {
    dispatch(aF(ERROR_VENDORS, e))
  }
}

//does not use action factory form
export const allVendorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_VENDORS:
      return {...state, status: LOADING}
    case LOADED_VENDORS:
      return {...state, status: LOADED, vendors: action.vendors}
    case ERROR_VENDORS:
      return {...state, status: ERROR, error: action.error}
    default:
      return state
  }
}

export const allVendorsReducerWithAF = (state = initialStateWithAF, action) => {
  switch (action.type) {
    case LOADING_VENDORS:
      return {...state, status: LOADING}
    case LOADED_VENDORS:
      return {...state, status: LOADED, collection: action.payload}
    case ERROR_VENDORS:
      return {...state, status: ERROR, error: action.payload}
    default:
      return state
  }
}

/* POSTLUDE
    This reducer does only the call to /vendors;
    another reducer would handle the call to /vendors/:id.
    If we import this one as allVendors
    and the other one as singleVendor
    into the index, we access the store values thus:
    (this.)props.allVendors.vendors
    (this.)props.singleVendor.vendor

    with action factory form:
    (this.)props.allVendors.collection
    (this.)props.singleVendor.collection

    and for both, we access loading status via
    (this.)props.allVendors.status
    (this.)props.singleVendor.status

    in a component, assuming we use mapStateToProps:

    render = () => {
      switch (props.allVendors.status) {
        case LOADING: {
          return <Loading componentName="AllVendors" />
            // a custom Loading component with the name
            // passed in as a prop
        }
        case ERROR: {
          return <Error error: props.allVendors.error />
            // a custom Error component with the error
            // passed in as a prop
        }
        case LOADED: {
          return (the main form of the component)
        }
        default: return <h1> Matt, we miss you! But we miss John more. </h1>
      }
    }
*/
