// Module imports
import React, {
	useCallback,
	useEffect,
	useState,
} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'





// Module imports
import { auth } from 'helpers/firebase'
import { ExternalLink } from 'components/ExternalLink'





export const Banner = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(Boolean(auth?.currentUser))

	const logout = useCallback(() => auth.signOut(), [isLoggedIn])

	useEffect(() => auth.onAuthStateChanged(user => {
		setIsLoggedIn(Boolean(user))
	}), [])

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
					{isLoggedIn && (
						<>
							<li>
								<Link href="/dashboard">
									<a>
										<FontAwesomeIcon
											fixedWidth
											icon="tachometer-alt" />
										Dashboard
									</a>
								</Link>
							</li>

							<li>
								<button
									onClick={logout}>
									<FontAwesomeIcon
										fixedWidth
										icon={['fab', 'github']} />
									Logout
								</button>
							</li>
						</>
					)}

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
