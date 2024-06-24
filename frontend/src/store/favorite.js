//Type Constants

import { grabAllUserFavorites } from "../utils/favorite_api_utils";

export const RECEIVE_ALL_FAVORITES = 'favorite/RECIEVE_ALL_FAVORITES'
export const DESTROY_FAVORITE = 'favorite/DESTROY_FAVORITE'

//Action Creators

export const receiveAllFavorites = (favPhotos) => ({
    type: RECEIVE_ALL_FAVORITES,
    favPhotos
});


export const destroyFavorite = (faveId) => ({
    type: DESTROY_FAVORITE,
    photoId
})


export const getAllUserFavorites = (userId) => async dispatch => {
    const res = await grabAllUserFavorites(userId)
    if (res.ok) {
        const faves = await res.json()
        return dispatch(receiveAllFavorites(faves))
    } else {
        const faves = await res.json()
        return faves.errors
    }
}


export const removeFavorite = (faveId) => async dispatch => {
    const res = await deleteFavorite(faveId);
    if (res.ok) {
        dispatch(destroyFavorite(faveId))
    } else {
        const data = res.json()
        return data.errors
    }
}


export const userFavorites = (userId) => (state) => state.faves ? Object.values(state.faves).filter(fav => fav.userId === userId) : null

const favoriteReducer = (state = {}, action) => {
    const nextState = Object.assign({}, state)

    switch (action.type) {
        case RECEIVE_ALL_FAVORITES:
            return {...nextState, ...action.favPhotos}
        case DESTROY_FAVORITE:
            delete nextState[action.photoId]
            return nextState
        default:
            return state
    }


}

export default favoriteReducer