// Module imports
import Link from 'next/link'





export function DocsSubnav(props) {
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
							<Link
								as="/docs/getting-started"
								href="/docs/[...doc]">
								<a id="commands-nav">Getting Started</a>
							</Link>
						</li>

						{/* <li>
							<Link
								as="/docs/features"
								href="/docs/[...doc]">
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
								<Link
									as={`/docs/api/${command}`}
									href="/docs/api/[command]">
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
