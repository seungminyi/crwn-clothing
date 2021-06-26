import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyA05wpJNNS-DrXE9nEutDo6DmtCC0IrdYk",
    authDomain: "crwn-db-56f88.firebaseapp.com",
    projectId: "crwn-db-56f88",
    storageBucket: "crwn-db-56f88.appspot.com",
    messagingSenderId: "367333815417",
    appId: "1:367333815417:web:50c93c0d836963267ed0a8",
    measurementId: "G-CB1L6RCZWE"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }

    return userRef
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const Provider = new firebase.auth.GoogleAuthProvider();
Provider.setCustomParameters({ prompt: 'select_account' })

export const signInwithGoogle = () => auth.signInWithPopup(Provider);

export default firebase