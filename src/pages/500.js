// Module imports
import React from 'react'





// Local imports
import { ErrorPage } from 'components/ErrorPage'
import { getCommands } from 'helpers/getCommands'
import { PageWrapper } from 'components/PageWrapper'





export default function InternalErrorPage(props) {
	return (
		<PageWrapper {...props}>
			<ErrorPage statusCode={500} />
		</PageWrapper>
	)
}

export function getStaticProps(...args) {
	return getCommands(...args)
}
