import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import configureStore from './store/store';
import { csrfFetch, restoreSession } from './utils/csrf';
import{loginUser, logoutUser} from './store/session'

const csrfToken = sessionStorage.getItem('X-CSRF-Token')

const initializeApp = () => {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  let initialState;
  if (currentUser) {
    initialState = {
      users: {
        [currentUser.id]: currentUser
      },
      session: {
        currentUser: currentUser.username,
        currentUserId: currentUser.id
      }
    }
  }
  
  const store = configureStore(initialState)

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
);

  if (import.meta.env.MODE !== "production") {
    restoreSession();
    window.store = store;
    window.csrfFetch = csrfFetch;
    window.loginUser = loginUser;
    window.logoutUser = logoutUser;
  }
}

restoreSession().then(initializeApp)