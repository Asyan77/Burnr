import { createNewPhoto, grabAllPhotos, grabAllUserPhotos, grabOnePhoto } from "../utils/photo_api_utils";

// Type Constants
export const RECEIVE_ALL_PHOTOS = 'photo/RECEIVE_ALL_PHOTOS';
export const RECEIVE_ALL_USER_PHOTOS = 'photo/RECEIVE_ALL_USER_PHOTOS';
export const RECEIVE_ONE_PHOTO = 'photo/RECEIVE_ONE_PHOTO';
export const DESTROY_PHOTO = 'photo/DESTROY_PHOTO';

// Action Creators
export const receiveAllPhotos = (photos) => ({
  type: RECEIVE_ALL_PHOTOS,
  photos
});

export const receiveAllUserPhotos = (photos) => ({
  type: RECEIVE_ALL_USER_PHOTOS,
  photos
});

export const receiveOnePhoto = data => ({
    type: RECEIVE_ONE_PHOTO,
    data
  });

export const deletePhoto = photoId => ({
type: DESTROY_PHOTO,
  photoId
});

// Thunk Action Creators
export const getAllPhotos = () => async dispatch => {
  const res = await grabAllPhotos()
  if (res.ok) {
    const photos =  await res.json();
    return dispatch(receiveAllPhotos(photos));
  } else {
    const data = await res.json();
    console.log(data, "could not recieve all photos")
    return data.errors
  }
};

export const getAllUserPhotos = (userId) => async dispatch => {
  const res = await grabAllUserPhotos(userId)
  if (res.ok) {
    const photos =  await res.json();
    return dispatch(receiveAllUserPhotos(photos));
  } else {
    const data = await res.json();
    console.log(data, "could not recieve all users photos")
    return data.errors
  }
};

export const getOnePhoto = (photoId) => async dispatch => {
    const res = await grabOnePhoto(photoId)
    if (res.ok) {
      const photo =  await res.json();

      return dispatch(receiveOnePhoto(photo));
    } else {
      const data = await res.json();
      console.log(data, "could not recieve one photo")
      return data.errors
    }
  };


  export const uploadOnePhoto = (photoDetails) => async dispatch => {
    const res = await createNewPhoto(photoDetails)
    if (res.ok) {
      const photo = await res.json();
      await dispatch(receiveOnePhoto(photo));
      return res
    } else {
      const data = await res.json();
      console.log(data, "could not recieve all users photos")
      return data.errors
    }
  };


export const allPhotos = (state) => state.photos ? Object.values(state.photos) : null
export const onePhoto = (id) => (state) => state.photos[id]
export const getUserPhotos = (userId) => (state) => state.photos ? Object.values(state.photos).filter(photo => photo.userId === userId) : null



const photoReducer = (state ={}, action) => {
  const nextState = Object.assign({},state);

  switch (action.type) {
    case RECEIVE_ALL_PHOTOS:
        return { ...nextState, ...action.photos };
    case RECEIVE_ALL_USER_PHOTOS:
        return { ...nextState, ...action.photos };
    case RECEIVE_ONE_PHOTO:
        nextState[action.data.photo.id] = action.data.photo;
        return nextState
    // return action.photos
    // case SET_CURRENT_USER:
    //   nextState[action.user.id]= action.user;
    //   return nextState;
    // case DESTROY_USER:
    //   delete nextState[action.userId];
    //   return nextState;
    default:
      return state;
  }
};

export default photoReducer;