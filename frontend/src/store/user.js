import { createNewUser } from "../utils/user_api_utils";


// Type Constants
export const RECEIVE_CURRENT_USER = 'user/RECEIVE_CURRENT_USER';
export const SET_CURRENT_USER = 'user/setCurrentUser';
export const DESTROY_USER = 'user/DESTROY_USER';

// Action Creators
export const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user
});


export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  user
});

// export const removeCurrentUser = userId => ({
//   type: REMOVE_CURRENT_USER,
//   userId
// });

// Thunk Action Creators
export const createUser = userData => async dispatch => {
  const res = await createNewUser(userData)
  console.log(res)
  if (res.ok) {
    const data =  await res.json();
    sessionStorage.setItem('currentUser', JSON.stringify(data.user.username));
    sessionStorage.setItem('currentUserId', JSON.stringify(data.user.id))
    return dispatch(receiveCurrentUser(data.user));
  } else {
    const data = await res.json();
    return data.errors
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
    case SET_CURRENT_USER:
      nextState[action.user.id] = action.user;
      return nextState;
    case DESTROY_USER:
      delete nextState[action.userId];
      return nextState;
    default:
      return state;
  }
};

export default userReducer;