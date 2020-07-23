import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyCooXtV9qmrQ7egQoPal5QPqT6_Fvik7dw',
  authDomain: 'crwn-db-2b4ce.firebaseapp.com',
  databaseURL: 'https://crwn-db-2b4ce.firebaseio.com',
  projectId: 'crwn-db-2b4ce',
  storageBucket: 'crwn-db-2b4ce.appspot.com',
  messagingSenderId: '348232262094',
  appId: '1:348232262094:web:e7729efd3c04b2e53fcb9f'
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('ERROR CREATING USER', error.message)
    }
  }

  return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
