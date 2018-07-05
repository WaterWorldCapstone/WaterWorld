import {getCurrentUser} from './user'

const WRITE_EMAIL = 'WRITE_EMAIL'
const WRITE_PASSWORD = 'WRITE_PASSWORD'
const WRITE_FIRST_NAME = 'WRITE_FIRST_NAME'
const WRITE_LAST_NAME = 'WRITE_LAST_NAME'
const WRITE_ADDRESS = 'WRITE_ADDRESS'

const initialState = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  address: ''
}

const aF = (type, payload) => ({
  type,
  payload
})

export const [
  writeAddress,
  writeEmail,
  writePassword,
  writeFirstName,
  writeLastName
] = [
  val => async dispatch => dispatch(aF(WRITE_ADDRESS, val)),
  val => async dispatch => dispatch(aF(WRITE_EMAIL, val)),
  val => async dispatch => dispatch(aF(WRITE_PASSWORD, val)),
  val => async dispatch => dispatch(aF(WRITE_FIRST_NAME, val)),
  val => async dispatch => dispatch(aF(WRITE_LAST_NAME, val))
]

const disbatch = (fn, obj) => {
  fn(aF(WRITE_ADDRESS, obj.address))
  fn(aF(WRITE_EMAIL, obj.email))
  fn(aF(WRITE_FIRST_NAME, obj.firstName))
  fn(aF(WRITE_LAST_NAME, obj.lastName))
  fn(aF(WRITE_PASSWORD, obj.password))
}

export const populateForm = () => async dispatch => {
  const currentUser = await getCurrentUser()(dispatch)
  console.log(currentUser)
  disbatch(dispatch, currentUser)
}

export default function(state = initialState, action) {
  switch (action.type) {
    case WRITE_EMAIL:
      return {...state, email: action.payload}
    case WRITE_PASSWORD:
      return {...state, password: action.payload}
    case WRITE_FIRST_NAME:
      return {...state, firstName: action.payload}
    case WRITE_LAST_NAME:
      return {...state, lastName: action.payload}
    case WRITE_ADDRESS:
      return {...state, address: action.payload}
    default:
      return state
  }
}
