import { csrfFetch } from "./csrf";


export const grabAllPhotos = async ()=> {
    const res = await csrfFetch('/api/photos', {
      method: 'GET'
    })
    return res
}

export const grabAllUserPhotos = async (userId)=> {
  const res = await csrfFetch(`/api/photos?user_id=${userId}`, {
    method: 'GET'
  })
  return res
}

export const grabOnePhoto = async (photoId)=> {
    const res = await csrfFetch(`/api/photos/${photoId}`, {
      method: 'GET',
    })
    return res
}

export const createNewPhoto = async (photoDetails) => {
  const res = await csrfFetch('/api/photos', {
    method: 'POST',
    body: photoDetails
  })
  return res
}

export const destroyPhoto = async (photoId) => {
  const res = await csrfFetch(`/api/photos/${photoId}`, {
    method: 'DELETE'
  })
  return res
}