// Module imports
import Link from 'next/link'





export const DocsSubnav = props => {
	const { commands } = props

	return (
		<nav
			aria-labelledby="commands-nav"
			className="area-nav vertical">
			<ol>
				<li>
					<header>Documentation</header>

					<ol>
						<li>
							<Link href="/docs/getting-started">
								<a id="commands-nav">Getting Started</a>
							</Link>
						</li>

						{/* <li>
							<Link href="/docs/features">
								<a id="commands-nav">Basic Features</a>
							</Link>
						</li> */}
					</ol>
				</li>

				<li>
					<header>API Reference</header>

					<ul>
						{commands.map(command => (
							<li key={command}>
								<Link href={`/docs/api/${command}`}>
									<a>{command}</a>
								</Link>
							</li>
						))}
					</ul>
				</li>
			</ol>
		</nav>
	)
}
