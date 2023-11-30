import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import configureStore from './store/store';
import { csrfFetch, restoreSession } from './utils/csrf';
import{loginUser, logoutUser} from './store/session'

const store = configureStore()

if (import.meta.env.MODE !== "production") {
  restoreSession();
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.loginUser = loginUser
  window.logoutUser = logoutUser
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
