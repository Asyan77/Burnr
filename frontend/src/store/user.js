import { createNewUser } from "../utils/user_api_utils";


// Type Constants
export const RECEIVE_CURRENT_USER = 'user/RECEIVE_CURRENT_USER';
export const REMOVE_CURRENT_USER = 'user/REMOVE_CURRENT_USER';

// Action Creators
export const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user
});

export const removeCurrentUser = userId => ({
  type: REMOVE_CURRENT_USER,
  userId
});

// Thunk Action Creators
export const createUser = userData => async dispatch => {
  const res = await createNewUser(userData)
  if (res.ok) {
    console.log('step 6, res was ok')
    const data =  await res.json();
    console.log(data)
    sessionStorage.setItem('currentUser', JSON.stringify(data.user.username));
    sessionStorage.setItem('currentUserId', JSON.stringify(data.user.id))
    return dispatch(receiveCurrentUser(data.user));
  } else {
    const data = await res.json();
    console.log("step 7, res was not ok. here is res:")
    console.log(res)
  }
};

// Selectors

// Reducer
const userReducer = (state ={}, action) => {
  const nextState = Object.assign(state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      nextState[action.user.id] = action.user;
      return nextState;
    case REMOVE_CURRENT_USER:
      delete nextState[action.userId];
      return nextState;
    default:
      return state;
  }
};

export default userReducer;