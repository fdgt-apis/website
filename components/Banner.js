// Module imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'





// Module imports
import { ExternalLink } from './ExternalLink'





export function Banner() {
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
