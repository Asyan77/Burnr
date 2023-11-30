import { csrfFetch } from "./csrf";

//signup
export const createNewUser = async userData => {
    const res = await csrfFetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(userData)
    })
    const user = await res.json()
    return user
  }
