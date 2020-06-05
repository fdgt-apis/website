// Module imports
import PropTypes from 'prop-types'
import React from 'react'





// Local imports
import { DocsSubnav } from 'components/DocsSubnav'





export const PageWrapper = props => {
	const {
		children,
		commands,
	} = props

	return (
		<>
			<DocsSubnav commands={commands} />

			<main>
				{children}
			</main>
		</>
	)
}

PageWrapper.defaultProps = {
	commands: null,
}

PageWrapper.propTypes = {
	children: PropTypes.node.isRequired,
	commands: PropTypes.array,
}
