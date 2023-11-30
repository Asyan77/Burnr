import { combineReducers, applyMiddleware, compose, legacy_createStore } from 'redux';
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import sessionReducer from './session';
import userReducer from './user';
// import sessionsReducer from './sessionsReducer';
// import photoReducer from './photosReducer';
// import commentsReducer from './commentsReducer';


const rootReducer = combineReducers({
    session: sessionReducer,
    user: userReducer
  //   photos: photoReducer,
  //   comments: commentsReducer
})

// let enhancer;

// if (import.meta.env.MODE === 'production') {
//   enhancer = applyMiddleware(thunk);
// } else {
//   const logger = (await import("redux-logger")).default;
//   const composeEnhancers =
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//   enhancer = composeEnhancers(applyMiddleware(thunk, logger));
// }


const configureStore = (preloadedState = {}) => (
  legacy_createStore( rootReducer, preloadedState, applyMiddleware(thunk, logger) )
)

export default configureStore;