// Local imports
import createEndpoint from 'helpers/createEndpoint'
import httpStatus from 'helpers/httpStatus'





export async function handler(request, response) {
	const twitchRedirectURL = new URL('/auth/twitch/login', process.env.NEXT_PUBLIC_PUBLIC_URL)
	const twitchAuthURL = new URL('/oauth2/authorize', 'https://id.twitch.tv')

	twitchAuthURL.searchParams.append('response_type', 'token')
	twitchAuthURL.searchParams.append('client_id', process.env.TWITCH_CLIENT_ID)
	twitchAuthURL.searchParams.append('redirect_uri', twitchRedirectURL.toString())
	twitchAuthURL.searchParams.append('scope', 'user:read:email')
	// twitchAuthURL.searchParams.append('state', 'http://localhost')

	response.redirect(httpStatus.TEMPORARY_REDIRECT, twitchAuthURL.toString())
}





export default createEndpoint({
	allowedMethods: ['get'],
	handler,
})
