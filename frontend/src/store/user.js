
import { createNewUser, grabAllUsers, grabOneUser } from "../utils/user_api_utils";
import { SET_CURRENT_USER} from "./session";


// Type Constants
export const RECEIVE_CURRENT_USER = 'user/RECEIVE_CURRENT_USER';
export const RECEIVE_ONE_USER = 'user/RECEIVE_ONE_USER';
export const SET_ALL_USERS = 'user/SET_ALL_USERS'
export const DESTROY_USER = 'user/DESTROY_USER';

// Action Creators
export const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user
});

export const receiveOneUser = user => ({
  type: RECEIVE_ONE_USER,
  user
});


export const setAllUsers = users => ({
  type: SET_ALL_USERS,
  users
})

// export const removeCurrentUser = userId => ({
//   type: REMOVE_CURRENT_USER,
//   userId
// });



// Thunk Action Creators
export const createUser = userData => async dispatch => {
  const res = await createNewUser(userData)
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


export const getAllUsers = () => async dispatch => {
  const res = await grabAllUsers();
  if(res.ok) {
    const data = await res.json();
    return dispatch(setAllUsers(data))
  } else {
    const data = await res.json()
    return data.errors
  }
}

export const getOneUser = (userId) => async dispatch => {
  const res = await grabOneUser(userId);
  if(res.ok) {
    const data = await res.json();
    return dispatch(receiveOneUser(data))
  } else {
    const data = await res.json()
    return data.errors
  }
}

export const getUsername = (userId) => (state) => state.users[userId].username 
export const getUser = (userId) => (state) => state.users[userId]


const userReducer = (state ={}, action) => {
  const nextState = Object.assign({},state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      nextState[action.user.id] = action.user;
      return nextState;
    case RECEIVE_ONE_USER:
      nextState[action.user.id] = action.user;
      return nextState;
    case SET_ALL_USERS:
      return action.users;
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