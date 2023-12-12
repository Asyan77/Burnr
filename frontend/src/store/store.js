import { combineReducers, applyMiddleware, compose, legacy_createStore } from 'redux';
import thunk from 'redux-thunk'
import sessionReducer from './session';
import userReducer from './user';
import photoReducer from './photo';
import commentReducer from './comment';


const rootReducer = combineReducers({
    session: sessionReducer,
    users: userReducer,
    photos: photoReducer,
    comments: commentReducer
})

let enhancer;
if (import.meta.env.MODE === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}


const configureStore = (preloadedState = {}) => (
  legacy_createStore( rootReducer, preloadedState, enhancer )
)

export default configureStore;