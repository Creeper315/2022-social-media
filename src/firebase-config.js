// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
    getAuth,
    GoogleAuthProvider,
    FacebookAuthProvider,
} from 'firebase/auth';
import { getStorage } from 'firebase/storage';
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCQs0af4AKb9s1pD8bd-PVv1488Vj5e-zM',
    authDomain: 'project-8931586100489646887.firebaseapp.com',
    projectId: 'project-8931586100489646887',
    storageBucket: 'project-8931586100489646887.appspot.com',
    messagingSenderId: '528639164102',
    appId: '1:528639164102:web:d5af7904022380d7eee1c7',
    measurementId: 'G-C88JCSP5DJ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const google_provider = new GoogleAuthProvider();
export const facebook_provider = new FacebookAuthProvider();
facebook_provider.setCustomParameters({ display: 'popup' });
