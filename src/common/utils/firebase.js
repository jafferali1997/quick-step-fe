import { initializeApp } from 'firebase/app';
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  getAuth,
  signInWithPopup
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA8esHDqnVfYr6UYvxoH9f2qDb2tBnHW6g',
  authDomain: 'quick-steps-5ba7e.firebaseapp.com',
  projectId: 'quick-steps-5ba7e',
  storageBucket: 'quick-steps-5ba7e.appspot.com',
  messagingSenderId: '1091446903478',
  appId: '1:1091446903478:web:8d57439f766781407c0c17',
  measurementId: 'G-JGWJN7BX84'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = (loginWithOAuth) => {
  signInWithPopup(auth, googleProvider)
    .then(async (result) => {
      loginWithOAuth('google', result.user.email, result.user.accessToken);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const facebookProvider = new FacebookAuthProvider();
export const signInWithFacebook = (loginWithOAuth) => {
  signInWithPopup(auth, facebookProvider)
    .then((result) => {
      loginWithOAuth('facebook', result.user.email, result.user.accessToken);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const microsoftProvider = new OAuthProvider('microsoft.com');
microsoftProvider.setCustomParameters({
  prompt: 'consent',
  tenant: 'cc4b89a2-8d97-417b-a63c-aeb2ef26dab8'
});
export const signInWithMicrosoft = (loginWithOAuth) => {
  signInWithPopup(auth, microsoftProvider)
    .then((result) => {
      loginWithOAuth('microsoft', result.user.email, result.user.accessToken);
    })
    .catch((error) => {
      console.log(error.message);
    });
};
