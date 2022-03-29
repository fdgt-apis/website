export class Twitch {
	/****************************************************************************\
	 * Private instance properties
	\****************************************************************************/

	#accessToken = null

	#displayName = null

	#email = null

	#photoURL = null

	#uid = null





	/****************************************************************************\
	 * Constructor
	\****************************************************************************/

	constructor (accessToken) {
		this.#accessToken = accessToken
	}





	/****************************************************************************\
	 * Public instance methods
	\****************************************************************************/

	async getUser() {
		const response = await fetch('https://api.twitch.tv/helix/users', {
			headers: {
				'Client-ID': this.clientID,
				'Authorization': `Bearer ${this.#accessToken}`,
			},
		})
		const {
			data: [user],
		} = await response.json()

		this.#displayName = user.display_name
		this.#email = user.email
		this.#photoURL = user.profile_image_url
		this.#uid = user.id

		return this.user
	}

	async isAccessTokenValid() {
		const response = await fetch('https://id.twitch.tv/oauth2/validate', {
			headers: {
				'Authorization': `Bearer ${this.#accessToken}`,
			},
		})

		if (!response.ok) {
			return false
		}

		const responseJSON = await response.json()

		this.#uid = responseJSON.user_id
	}





	/****************************************************************************\
	 * Public instance getters/setters
	\****************************************************************************/

	get clientID() {
		return process.env.TWITCH_CLIENT_ID
	}

	get user() {
		return {
			displayName: this.#displayName,
			email: this.#email,
			photoURL: this.#photoURL,
			uid: this.#uid,
		}
	}
}
