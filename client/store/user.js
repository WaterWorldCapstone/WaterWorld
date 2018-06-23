import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const ADD_NEW_USER = 'ADD_NEW_USER'
const UPDATED_USER_CART = 'UPDATED_USER_CART'
const UPDATE_USER = 'UPDATE_USER'
/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => {
  if (user && user.error && user.error.config) {
    return {
      type: GET_USER,
      user: {
        ...user,
        error: user.error && {
          ...user.error,
          config: {
            ...user.error.config,
            data: JSON.parse(user.error.config.data)
          }
        }
      }
    }
  }
  return {type: GET_USER, user}
}
const removeUser = () => ({type: REMOVE_USER})
const addNewUser = user => ({type: ADD_NEW_USER, user})
const updatedUserCart = user => ({type: UPDATED_USER_CART, user})
const updatedUser = user => ({type: UPDATE_USER, user})

/**
 * THUNK CREATORS
 */

// Adds cart to user "cart" column through user update
export const updateUserCart = user => async dispatch => {
  try {
    const {data} = await axios.put(`/api/users/${user.id}`, user)
    dispatch(updatedUserCart(data))
  } catch (error) {
    console.error(error)
  }
}

export const AddUser = user => dispatch =>
  axios
    .post(`/auth/signup`, user)
    .then(
      res => {
        dispatch(addNewUser(res.data))
        history.push('/products')
      },
      authError => {
        dispatch(addNewUser({error: authError}))
      }
    )
    .catch(err => console.error(err))

export const updateUser = user => dispatch =>
  axios
    .put(`/auth/${user.id}`, user)
    .then(
      res => {
        dispatch(updatedUser(res.data))
        history.push('/products')
      },
      authError => {
        dispatch(updatedUser({error: authError}))
      }
    )
    .catch(err => console.error(err))

export const me = () => dispatch =>
  axios
    .get('/auth/me')
    .then(res => dispatch(getUser(res.data || defaultUser)))
    .catch(err => console.log(err))

//donor signup

export const donorSignup = (
  email,
  password,
  address,
  firstName,
  lastName
) => async dispatch => {
  try {
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
    // history.push("/home");
  } catch (err) {
    console.err(err);
  }
};

//vendor signup
export const vendorSignup = (email, password, firstName, lastName, address, continent, country, town, companyName) => async dispatch => {
  try {
    const vendor = await axios.post("/auth/signup", {
      user: { email: email, password: password, firstName: firstName, lastName: lastName},
      type: {address: address, continent: continent, country: country, town: town, companyName: companyName
    },
  userType: "vendor"})
    dispatch(getUser(vendor.data))
  } catch(err) {
    console.err(err)
  }
}

//vendor signup
export const vendorSignup = (
  email,
  password,
  firstName,
  lastName,
  address,
  continent,
  country,
  town,
  companyName
) => async dispatch => {
  try {
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
  } catch (err) {
    console.err(err)
  }
}


/**
 * REDUCER
 */

const userReducer = (state = defaultUser, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case ADD_NEW_USER:
      return action.user
    case UPDATED_USER_CART:
      return action.user
    case UPDATE_USER:
      return action.user
    default:
      return state
  }
}

export default userReducer
