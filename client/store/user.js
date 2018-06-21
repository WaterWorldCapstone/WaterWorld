import axios from "axios";
import history from "../history";

/**
 * ACTION TYPES
 */
const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get("/auth/me");
    dispatch(getUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

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

export const logout = () => async dispatch => {
  try {
    await axios.post("/auth/logout");
    dispatch(removeUser());
    history.push("/login");
  } catch (err) {
    console.error(err);
  }
};

//donor signup
export const donorSignup = (email, password, address) => async dispatch => {
  try {
    const donor = await axios.post("/auth/signup", {
      user: { email: email, password: password },
      type: { address: address },
      userType: "donor"
    });
    dispatch(getUser(donor.data))
    // history.push("/home");
  } catch (err) {
    console.err(err);
  }
};

//vendor signup
export const vendorSignup = (email, password, address, continent, country, town, companyName) => async dispatch => {
  try {
    const vendor = await axios.post("/auth/signup", {
      user: { email: email, password: password},
      type: {address: address}, continent: continent, country: country, town: town, companyName: companyName
    })
    dispatch(getUser(vendor.data))
  } catch(err) {
    console.err(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
}
