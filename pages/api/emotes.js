// Local imports
import createEndpoint from 'helpers/createEndpoint'
import httpStatus from 'helpers/httpStatus'





const {
	TWITCH_CLIENT_ID,
	TWITCH_CLIENT_SECRET,
} = process.env

export async function handler(request, response) {
	let accessToken = null
	let allEmotes = null

	try {
		const accessTokenURL = `https://id.twitch.tv/oauth2/token?client_id=${TWITCH_CLIENT_ID}&client_secret=${TWITCH_CLIENT_SECRET}&grant_type=client_credentials`
		const response = await fetch(accessTokenURL, {
			method: 'post',
		})
		const responseJSON = await response.json()

		accessToken = responseJSON.access_token
	} catch (error) {
		return response.status(httpStatus.INTERNAL_SERVER_ERROR).end()
	}

	try {
		const twitchRequestParams = {
			headers: {
				'Client-ID': TWITCH_CLIENT_ID,
				'Authorization': `Bearer ${accessToken}`,
			},
		}

		const responses = await Promise.all([
			fetch('https://api.twitch.tv/helix/chat/emotes/global', twitchRequestParams),
			fetch('https://api.twitch.tv/helix/bits/cheermotes', twitchRequestParams),
		])
		const responseJSONs = await Promise.all(responses.map(response => response.json()))

		allEmotes = {
			emotes: responseJSONs[0].data,
			cheermotes: responseJSONs[1].data,
		}
	} catch (error) {
		return response.status(404).end()
	}

	response.status(httpStatus.OK).json(allEmotes)
}





export default createEndpoint({
	allowedMethods: ['get'],
	handler,
})
