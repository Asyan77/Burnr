import { csrfFetch } from "./csrf";


export const grabAllPhotos = async ()=> {
    const res = await csrfFetch('/api/photos', {
      method: 'GET'
    })
    return res
}

export const grabOnePhoto = async (photoId)=> {
    const res = await csrfFetch('/api/photos', {
      method: 'GET',
      body: JSON.stringify(photoId)
    })
    return res
}




//upload a photo
// export const createNewPhoto = async userData => {
//   const res = await csrfFetch('/api/users', {
//     method: 'POST',
//     body: JSON.stringify(userData)
//   })
//   return res
// }

//delete a photo
// export const destroyPhoto = async() => {

//   const res = await csrfFetch('/api/users', {
//     method: 'DELETE',
//   })
//   return res
// }