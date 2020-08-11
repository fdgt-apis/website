// Module imports
import firebase from 'firebase/app'
/* eslint-disable import/no-unassigned-import */
import 'firebase/auth'
import 'firebase/firestore'
/* eslint-enable import/no-unassigned-import */





// Local variables
let auth = null
let firestore = null





if (!firebase.apps.length) {
  firebase.initializeApp({
		apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
		appID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
		authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
		databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
		messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
		projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
		storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	})
  auth = firebase.auth()
  firestore = firebase.firestore()
}





export {
	auth,
	firebase,
	firestore,
}
