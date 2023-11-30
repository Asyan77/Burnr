import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import configureStore from './store/store';
import { csrfFetch, restoreSession } from './utils/csrf';

const store = configureStore()
// if (sessionStorage.getItem("X-CSRF-Token"))

if (import.meta.env.MODE !== "production") {
  restoreSession();
  window.store = store;
  window.csrfFetch = csrfFetch;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
