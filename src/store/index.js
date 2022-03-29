// Module imports
import {
	onAuthStateChanged,
	signInWithCustomToken,
	signOut,
} from 'firebase/auth'
import create from 'zustand/vanilla'


// Module imports
import { auth as firebaseAuth } from 'helpers/firebase.js'





export const store = create((set, get) => ({
	isLoggedIn: false,
	isLoggingIn: false,
	user: null,

	async loginWithTwitch() {
		location = '/api/auth/twitch/redirect'
	},

	async loginWithCustomToken(token) {
		set({ isLoggingIn: true })

		const { user } = await signInWithCustomToken(firebaseAuth, token)

		set({
			isLoggedIn: Boolean(user),
			isLoggingIn: false,
			user,
		})
	},

	async logout() {
		await signOut(firebaseAuth)
	},
}))

onAuthStateChanged(firebaseAuth, user => {
	store.setState({
		isLoggedIn: Boolean(user),
		user,
	})
})
