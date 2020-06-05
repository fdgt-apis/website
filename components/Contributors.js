// Module imports
import React from 'react'





// Local imports
import { Contributor } from 'components/Contributor'
import { FDGT } from 'components/FDGT'





export const Contributors = props => {
	const { contributors } = props

	return (
		<>
			<h2>Contributors</h2>

			<p>Meet the wonderful people that build and maintain <FDGT /> for the community!</p>

			<ul className="contributors">
				{contributors.map(contributor => (
					<li key={contributor.login}>
						<Contributor contributor={contributor} />
					</li>
				))}
			</ul>
		</>
	)
}
