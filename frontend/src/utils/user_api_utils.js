import { csrfFetch } from "./csrf";

//signup
export const createNewUser = async userData => {
  const res = await csrfFetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(userData)
  })
  return res
}

export const grabAllUsers = async () => {
  const res = await csrfFetch('/api/users', {
    method: 'GET'
  })
  return res
}

export const grabOneUser = async (userId) => {
  const res = await csrfFetch(`/api/users/${userId}`, {
    method: 'GET'
  })
  return res
}



export const destroyUser = async() => {

  const res = await csrfFetch('/api/users', {
    method: 'DELETE',
  })
  return res
}