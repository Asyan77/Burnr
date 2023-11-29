import { combineReducers, applyMiddleware, compose, legacy_createStore } from 'redux';
import thunk from 'redux-thunk'
import logger from 'redux-logger'
// import sessionsReducer from './sessionsReducer';
// import photoReducer from './photosReducer';
// import commentsReducer from './commentsReducer';

let enhancer;
if (import.meta.env.MODE === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const rootReducer = combineReducers({
//   session: sessionsReducer,
//   photos: photoReducer,
//   comments: commentsReducer
})

const configureStore = (preloadedState = {}) => (
  legacy_createStore( rootReducer, preloadedState, enhancer(thunk, logger) )
)

export default configureStore;