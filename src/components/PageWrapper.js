// Module imports
import { DefaultSeo as DefaultSEO } from 'next-seo'
import PropTypes from 'prop-types'
import React from 'react'





// Local imports
import { DocsSubnav } from 'components/DocsSubnav'





export function PageWrapper(props) {
	const {
		children,
		commands,
	} = props

	return (
		<>
			<DefaultSEO titleTemplate="%s | fdgt.dev" />

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
