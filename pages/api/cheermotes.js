// Local imports
import createEndpoint from 'helpers/createEndpoint'
import httpStatus from 'helpers/httpStatus'





const {
	NEXT_PUBLIC_TWITCH_CLIENT_ID,
	TWITCH_CLIENT_SECRET,
} = process.env

export const handler = async (request, response) => {
	const {
		access_token: accessToken,
	} = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${NEXT_PUBLIC_TWITCH_CLIENT_ID}&client_secret=${TWITCH_CLIENT_SECRET}&grant_type=client_credentials`, {
		method: 'post',
	}).then(response => response.json())

	// console.log({ accessTokenResponse })
	const cheermotes = await fetch('https://api.twitch.tv/helix/bits/cheermotes', {
		headers: {
			'Client-ID': NEXT_PUBLIC_TWITCH_CLIENT_ID,
			'Authorization': `Bearer ${accessToken}`,
		},
	}).then(response => response.json())

  response.status(httpStatus.OK).json(cheermotes.data)
}





export default createEndpoint({
  allowedMethods: ['get'],
  handler,
})
