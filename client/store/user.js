import axios from 'axios'
import history from '../history'
import {LOADING, LOADED} from './constants'
const asyncHandler = require('express-async-handler')

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const GETTING_CURRENT_USER = 'GETTING_CURRENT_USER'
const GOT_CURRENT_USER = 'GOT_CURRENT_USER'
/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */

export const me = () =>
  asyncHandler(async dispatch => {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  })

// export const auth = (email, password, method) => async dispatch => {
//   let res;
//   try {
//     res = await axios.post(`/auth/${method}`, { email, password });
//   } catch (authError) {
//     return dispatch(getUser({ error: authError }));
// }

//   try {
//     dispatch(getUser(res.data));
//     history.push("/home");
//   } catch (dispatchOrHistoryErr) {
//     console.error(dispatchOrHistoryErr);
//   }
// };
export const login = (email, password) =>
  asyncHandler(async dispatch => {
    const res = await axios.post('/auth/login', {email, password})
    dispatch(getUser(res.data))
    history.push('/')
  })
export const logout = () =>
  asyncHandler(async dispatch => {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  })

//donor signup
export const donorSignup = ({email, password, address, firstName, lastName}) =>
  asyncHandler(async dispatch => {
    const donor = await axios.post('/auth/signup', {
      user: {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
      },
      type: {address: address},
      userType: 'donor'
    })
    dispatch(getUser(donor.data))
    history.push('/')
  })

//vendor signup
export const vendorSignup = ({
  email,
  password,
  firstName,
  lastName,
  address,
  continent,
  country,
  town,
  companyName
}) =>
  asyncHandler(async dispatch => {
    const vendor = await axios.post('/auth/signup', {
      user: {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
      },
      type: {
        address: address,
        continent: continent,
        country: country,
        town: town,
        companyName: companyName
      },
      userType: 'vendor'
    })
    dispatch(getUser(vendor.data))
    history.push('/')
  })

export const getCurrentUser = userId => async dispatch => {
  dispatch({type: 'GETING_CURRENT_USER'})
  const gottenUser = await axios.get(`/api/users/${userId}`)
  dispatch({type: GOT_CURRENT_USER, payload: gottenUser.data})
}
/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case GETTING_CURRENT_USER:
      return {...state, status: LOADING}
    case GOT_CURRENT_USER:
      return {...state, status: LOADED, currentUser: action.payload}
    default:
      return state
  }
}
