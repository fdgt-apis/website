// Local imports
import createEndpoint from 'helpers/createEndpoint.js'
import { Firebase } from 'helpers/firebase.admin.js'
import httpStatus from 'helpers/httpStatus.js'
import { Twitch } from 'helpers/twitch.admin.js'





export async function handler(request, response) {
	const firebase = new Firebase
	const twitch = new Twitch(request.body.accessToken)

	let token = null

	try {
		await twitch.isAccessTokenValid()

		const twitchUser = await twitch.getUser()
		const firebaseUser = await firebase.getUser(twitchUser.uid)

		if (!firebaseUser) {
			await firebase.createUserFromTwitch(twitchUser)
		}

		token = await firebase.createCustomToken(twitchUser.uid)
	} catch (error) {
		console.log(error)
	}

	response.status(httpStatus.OK).json({ token })
}





export default createEndpoint({
	allowedMethods: ['post'],
	handler,
})
