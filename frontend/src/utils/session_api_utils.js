import { csrfFetch } from "./csrf";

//sign in
export const loginSession = user => (
  csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify(user)
  })
);


//sign out
export const deleteSession = () => (
  csrfFetch('/api/session', {
    method: 'DELETE'
  })
);


