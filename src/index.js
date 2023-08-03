import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { InitializeMessaging } from './screens/App/firebaseNotifications/firebase';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (typeof localStorage.getItem('defaultStore') === 'string') {
  InitializeMessaging();
}

const isSupported = () =>
    'Notification' in window &&
    'serviceWorker' in navigator &&
    'PushManager' in window;

if (typeof localStorage.getItem('defaultStore') === 'string') {
    InitializeMessaging();
}

if (isSupported()) {
    Notification.requestPermission().then(function(result) {});
}