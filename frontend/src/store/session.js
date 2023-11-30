import { deleteSession, loginSession } from "../utils/session_api_utils";

const SET_CURRENT_USER = 'session/setCurrentUser';
const REMOVE_CURRENT_USER = 'session/removeCurrentUser';

// action creators
export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  user
});

export const removeCurrentUser = (userId) => ({
  type: REMOVE_CURRENT_USER,
  userId
});


//thunk action creators
export const loginUser = user => async dispatch => {
  const res = await loginSession(user);
  if (res.ok) {
    const data = await res.json();
    sessionStorage.setItem('currentUser', JSON.stringify(data.user.username));
    dispatch(setCurrentUser(data.user))
  } else {
    console.log("could not log user in")
  }
}

export const logoutUser = userId => async dispatch => {
  const res = await deleteSession();
  if (res.ok) {
    sessionStorage.setItem('currentUser', null)
    dispatch(removeCurrentUser())
  } else {
    console.log("could not log out current user")
  }
}

// selectors


//reducers
function sessionReducer(state = {currentUserId : null}, action) {
  const nextState = {...state}
    switch (action.type) {
      case SET_CURRENT_USER:
        nextState.currentUser = action.user.username
        nextState.currentUserId = action.user.id
        return nextState
      case REMOVE_CURRENT_USER:
        nextState.currentUser = null
        nextState.currentUserId = null
        return nextState
      default:
        return state;
    }
  }
  
  export default sessionReducer;