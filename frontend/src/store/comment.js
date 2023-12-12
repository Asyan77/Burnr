import { createNewComment, destroyComment, editComment, grabAllComments, grabAllPhotosComments} from "../utils/comment_api_utils";

// Type Constants
export const RECEIVE_ALL_COMMENTS = 'comments/RECEIVE_ALL_COMMENTS';
export const RECEIVE_ALL_PHOTOS_COMMENTS = 'comments/RECEIVE_ALL_PHOTOS_COMMENTS';
export const CREATE_COMMENT = 'comments/CREATE_COMMENT'
export const UPDATE_COMMENT = 'comments/UPDATE_COMMENT'
export const DESTROY_COMMENT = 'comments/DESTROY_COMMENT';

// Action Creators
export const receiveAllComments = (comments) => ({
  type: RECEIVE_ALL_COMMENTS,
  comments
});

export const receiveAllPhotosComments = comments => ({
    type: RECEIVE_ALL_PHOTOS_COMMENTS,
    comments
  });

export const createAComment = comment => ({
type: CREATE_COMMENT,
comment
});

export const updateAComment = comment => ({
type: UPDATE_COMMENT,
comment
});

export const deleteAComment = commentId => ({
type: DESTROY_COMMENT,
commentId
});

// Thunk Action Creators
export const getAllComments = () => async dispatch => {
  const res = await grabAllComments()
  if (res.ok) {
    const comments =  await res.json();
    return dispatch(receiveAllComments(comments));
  } else {
    const data = await res.json();
    console.log(data, "could not recieve all comments")
    return data.errors
  }
};

export const getAllPhotosComments = (photoId) => async dispatch => {
    const res = await grabAllPhotosComments(photoId)
    if (res.ok) {
      const comments =  await res.json();
      return dispatch(receiveAllPhotosComments(comments));
    } else {
      const data = await res.json();
      console.log(data, "could not recieve all photos comments")
      return data.errors
    }
  };

export const createComment =(commentData) => async dispatch => {
  const res = await createNewComment(commentData);
  if (res.ok) {
    const data = await res.json();
    return dispatch(createAComment(data))
  } else {
    const data = await res.json()
    console.log(data, "could not create a new comment")
    return data.errors
  }
}

export const updateComment =(commentId, commentData) => async dispatch => {
  const res = await editComment(commentId, commentData)
  if (res.ok) {
    const data = await res.json();
    return dispatch(updateAComment(data))
  } else {
    const data = await res.json()
    console.log(data, "could not update this comment")
    return data.errors
  }
}

export const deleteComment = (commentId) => async dispatch => {
  const res = await destroyComment(commentId);
  if(res.ok) {
    return dispatch(deleteAComment(commentId))
  } else {
    const data = await res.json()
    console.log(data, "could not delete comment")
    return data.errors
  }
}

export const allComments = (state) => state.comments ? Object.values(state.comments) : null
export const allPhotosComments = (photoId) => (state) => state.comments ? Object.values(state.comments).filter(comment => comment.photoId === photoId) : null


const commentReducer = (state ={}, action) => {
  const nextState = Object.assign(state);

  switch (action.type) {
    case RECEIVE_ALL_COMMENTS:
        return { ...nextState, ...action.comments };
    case RECEIVE_ALL_PHOTOS_COMMENTS:
        return {...action.comments };
    case CREATE_COMMENT:
         nextState[action.comment.id]= action.comment;
        return nextState;
    case UPDATE_COMMENT:
        nextState[action.comment.id] = { ...nextState[action.comment.id], ...action.comment };
        return nextState;   
    case DESTROY_COMMENT:
      delete nextState[action.commentId];
      return nextState;
    default:
      return state;
  }
};

export default commentReducer;