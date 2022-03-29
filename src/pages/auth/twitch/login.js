// Module imports
import React, {
	useEffect,
	useMemo,
	useState,
} from 'react'
import { useRouter } from 'next/router'





// Local imports
import { getCommands } from 'helpers/getCommands.js'
import { PageWrapper } from 'components/PageWrapper.js'
import { useStore } from 'store/react.js'





export default function HomePage(props) {
	const Router = useRouter()
	const [
		isLoggedIn,
		loginWithCustomToken,
	] = useStore(state => ([
		state.isLoggedIn,
		state.loginWithCustomToken,
	]))

	const [firebaseToken, setFirebaseToken] = useState(null)
	const accessToken = useMemo(() => {
		if (typeof window === 'undefined') {
			return ''
		}

		const searchParams = new URLSearchParams(location.hash.substring(1))

		return searchParams.get('access_token')
	}, [])

	useEffect(async () => {
		if (accessToken && !firebaseToken) {
			const response = await fetch('/api/auth/twitch/login', {
				body: JSON.stringify({ accessToken }),
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'post',
			})

			const responseJSON = await response.json()

			setFirebaseToken(responseJSON.token)
		}
	}, [
		accessToken,
		firebaseToken,
		setFirebaseToken,
	])

	useEffect(async () => {
		if (!isLoggedIn && firebaseToken) {
			await loginWithCustomToken(firebaseToken)
			Router.replace('/dashboard')
		}
	}, [
		firebaseToken,
		isLoggedIn,
		loginWithCustomToken,
	])

	return (
		<PageWrapper {...props}>
			<section>
				<p>Verifying credentials...</p>
			</section>
		</PageWrapper>
	)
}

export function getStaticProps(...args) {
	return getCommands(...args)
}
