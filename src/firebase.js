import { initializeApp } from 'firebase/app';
import {
    getMessaging,
    getToken,
    onMessage,
    isSupported
} from 'firebase/messaging';

import {
    firebaseConfig,
    VAPID_KEY,
} from './firebaseConfig';

//Initialize Firebase Messaging
const InitializeMessaging = () => {
    initializeApp(firebaseConfig);
    isSupported().then(is_supported => {
        if (is_supported) {
            requestForToken().then(fcm_token => {
                localStorage.setItem('FCM_TOKEN', fcm_token);
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
                return currentToken;
            } else {
                console.log(
                    'No registration token available. Request permission to generate one.'
                );
            }
        })
        .catch(err => {
            console.error('An error occurred while retrieving token. ', err);
        });
};

InitializeMessaging();

export const onMessageListener = () =>
    new Promise(resolve => {
        onMessage(getMessaging(), payload => {
            resolve(payload);
        });
});