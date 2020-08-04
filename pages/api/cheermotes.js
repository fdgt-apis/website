// Local imports
import createEndpoint from 'helpers/createEndpoint'
import httpStatus from 'helpers/httpStatus'





const {
	TWITCH_CLIENT_ID,
	TWITCH_CLIENT_SECRET,
} = process.env

export const handler = async (request, response) => {
	let accessToken = null
	let cheermotesResponse = null

	try {
		const response = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${TWITCH_CLIENT_ID}&client_secret=${TWITCH_CLIENT_SECRET}&grant_type=client_credentials`, {
			method: 'post',
		}).then(response => response.json())

		accessToken = response.access_token
	} catch (error) {
		return response.status(httpStatus.INTERNAL_SERVER_ERROR).end()
	}

	try {
		cheermotesResponse = await fetch('https://api.twitch.tv/helix/bits/cheermotes', {
			headers: {
				'Client-ID': TWITCH_CLIENT_ID,
				'Authorization': `Bearer ${accessToken}`,
			},
		}).then(response => response.json())
	} catch (error) {
		return response.status(httpStatus.INTERNAL_SERVER_ERROR).end()
	}

  response.status(httpStatus.OK).json(cheermotesResponse.data)
}





export default createEndpoint({
  allowedMethods: ['get'],
  handler,
})
