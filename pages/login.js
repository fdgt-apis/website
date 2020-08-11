// Module imports
import React, {
	useCallback,
  useEffect,
  useState,
} from 'react'
import { useRouter } from 'next/router'





// Local imports
import {
	auth,
	firebase,
} from 'helpers/firebase'
import { getCommands } from 'helpers/getCommands'
import { PageWrapper } from 'components/PageWrapper'





const LoginPage = props => {
	const [isLoggedIn, setIsLoggedIn] = useState(Boolean(auth?.currentUser))
	const [isLoggingIn, setIsLoggingIn] = useState(false)

	const Router = useRouter()

	const login = useCallback(async provider => {
		setIsLoggingIn(true)

		try {
			await auth.signInWithPopup(provider)
			setIsLoggedIn(Boolean(auth.currentUser))
		} catch (error) {
			console.log(error)
		}

		setIsLoggingIn(false)
	}, [
		setIsLoggingIn,
		setIsLoggedIn,
	])

	const loginWithGithub = useCallback(() => login(new firebase.auth.GithubAuthProvider), [login])

	const loginWithGoogle = useCallback(() => login(new firebase.auth.GoogleAuthProvider), [login])

	const loginWithTwitter = useCallback(() => login(new firebase.auth.TwitterAuthProvider), [login])

	useEffect(() => auth.onAuthStateChanged(user => {
		if (user) {
			Router.push('/dashboard')
		}
	}), [])

	return (
		<PageWrapper {...props}>
			<section>
				<button
					className="primary"
					disabled={isLoggingIn || isLoggedIn}
					onClick={loginWithGithub}
					type="button">
					Sign in with Github
				</button>

				<button
					className="primary"
					disabled={isLoggingIn || isLoggedIn}
					onClick={loginWithGoogle}
					type="button">
					Sign in with Google
				</button>

				<button
					className="primary"
					disabled={isLoggingIn || isLoggedIn}
					onClick={loginWithTwitter}
					type="button">
					Sign in with Twitter
				</button>

				{isLoggingIn && (
					<span>Logging in...</span>
				)}

				{(!isLoggingIn && isLoggedIn) && (
					<span>Redirecting...</span>
				)}
			</section>
		</PageWrapper>
	)
}

export const getStaticProps = getCommands





export default LoginPage
