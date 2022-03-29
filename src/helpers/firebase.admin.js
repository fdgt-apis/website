// Module imports
import admin from 'firebase-admin'





export class Firebase {
	/****************************************************************************\
	 * Public instance methods
	\****************************************************************************/

	createUser(userData) {
		return this.auth.createUser({
			disabled: false,
			emailVerified: false,
			...userData,
		})
	}

	createUserFromTwitch(twitchUser) {
		return this.createUser(twitchUser)
	}

	createCustomToken(uid) {
		return this.auth.createCustomToken(uid)
	}

	async getUser(uid) {
		let user = null

		try {
			user = await this.auth.getUser(uid)
		} catch (error) {}

		return user
	}





	/****************************************************************************\
	 * Public instance getters/setters
	\****************************************************************************/

	get app() {
		return admin.apps[0] || admin.initializeApp({
			credential: admin.credential.cert({
				authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
				authUri: process.env.FIREBASE_AUTH_URI,
				clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
				clientId: process.env.FIREBASE_CLIENT_ID,
				clientX509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL,
				privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
				privateKey: process.env.FIREBASE_PRIVATE_KEY,
				projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
				tokenUri: process.env.FIREBASE_TOKEN_URI,
				type: process.env.FIREBASE_TYPE,
			}),
			databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
		})
	}

	get auth() {
		return this.app.auth()
	}
}
