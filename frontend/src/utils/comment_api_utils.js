import { csrfFetch } from "./csrf";


export const grabAllComments = async (photoId)=> {
    const res = await csrfFetch(`/api/comments?photoId=${photoId}`, {
      method: 'GET'
    })
    return res
}

export const grabAllPhotosComments = async (commentId)=> {
    const res = await csrfFetch(`/api/comments/${commentId}`, {
      method: 'GET'
    })
    return res
}

//create a comment
export const createNewComment = async commentData => {
  const res = await csrfFetch('/api/comments', {
    method: 'POST',
    body: commentData
  })
  return res
}


//update a comment
export const editComment = async (commentId, commentData) => {
    const res = await csrfFetch(`/api/comments/${commentId}`, {
      method: 'PATCH',
      body: commentData
    })
    return res
  }


//delete a comment
export const destroyComment = async(commentId) => {
  const res = await csrfFetch(`/api/comments/${commentId}`, {
    method: 'DELETE',
  })
  return res
}