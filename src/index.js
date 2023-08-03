import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { InitializeMessaging } from './firebase';
import { Provider } from 'react-redux';
import store from './flag';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
