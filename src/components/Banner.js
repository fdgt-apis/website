// Module imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'





// Module imports
import { Button } from 'components/Button.js'
import { ExternalLink } from 'components/ExternalLink.js'
import { useStore } from 'store/react.js'





export function Banner() {
	const [
		isLoggedIn,
		loginWithTwitch,
		logout,
	] = useStore(state => ([
		state.isLoggedIn,
		state.loginWithTwitch,
		state.logout,
	]))

	return (
		<header role="banner">
			<nav>
				<ol>
					<li>
						<Link href="/">
							<a>
								<FontAwesomeIcon
									fixedWidth
									icon="home" />
								Home
							</a>
						</Link>
					</li>

					<li>
						<Link
							as="/docs/getting-started"
							href="/docs/[...doc]">
							<a>
								<FontAwesomeIcon
									fixedWidth
									icon="book" />
								Docs
							</a>
						</Link>
					</li>

					<li>
						<Link href="/about">
							<a>
								<FontAwesomeIcon
									fixedWidth
									icon="users" />
								About
							</a>
						</Link>
					</li>
				</ol>

				<ol>
					<li>
						{!isLoggedIn && (
							<Button onClick={loginWithTwitch}>
								<FontAwesomeIcon
									fixedWidth
									icon="right-to-bracket" />
								Login
							</Button>
						)}

						{isLoggedIn && (
							<Button onClick={logout}>
								<FontAwesomeIcon
									fixedWidth
									icon="right-to-bracket" />
								Logout
							</Button>
						)}
					</li>

					<li>
						<ExternalLink href="https://github.com/fdgt-apis/api">
							<FontAwesomeIcon
								fixedWidth
								icon={['fab', 'github']} />
							Fork it on Github!
						</ExternalLink>
					</li>
				</ol>
			</nav>
		</header>
	)
}
