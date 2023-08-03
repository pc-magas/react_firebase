import { initializeApp } from 'firebase/app';
import {
    getMessaging,
    getToken,
    onMessage,
    isSupported
} from 'firebase/messaging';

import {
    firebaseConfig
} from './firebaseConfig';

//Initialize Firebase Messaging
export const InitializeMessaging = () => {
    isSupported().then(is_supported => {
        if (
            is_supported &&
            (process.env.REACT_APP_ENVIRONMENT === 'staging' ||
                process.env.REACT_APP_ENVIRONMENT === 'production' ||
                true)
        ) {
            console.log(`FCM Supported: ${is_supported} `);
            navigator.permissions
                .query({ name: 'notifications' })
                .then(function(result) {
                    if (result.state === 'granted') {
                        initializeApp(firebaseConfig);
                        requestForToken().then(fcm_token => {
                            localStorage.setItem('FCM_TOKEN', fcm_token);
                        });
                        //console.log(getApps());
                    }
                });
        } else {
            return false;
        }
    });
};

const requestForToken = () => {
    const messaging = getMessaging();
    return getToken(messaging, {
        vapidKey: VAPID_KEY
    })
        .then(currentToken => {
            if (currentToken) {
                //console.log('current token for client: ', currentToken);
                return currentToken;
                // Perform any other neccessary action with the token
            } else {
                // Show permission request UI
                console.log(
                    'No registration token available. Request permission to generate one.'
                );
            }
        })
        .catch(err => {
            console.log('An error occurred while retrieving token. ', err);
        });
};


export const onMessageListener = () =>
    new Promise(resolve => {
        onMessage(getMessaging(), payload => {
            resolve(payload);
        });
});