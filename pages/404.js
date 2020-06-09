// Module imports
import React from 'react'





// Local imports
import { ErrorPage } from 'components/ErrorPage'
import { getCommands } from 'helpers/getCommands'
import { PageWrapper } from 'components/PageWrapper'





export default props => (
	<PageWrapper {...props}>
		<ErrorPage statusCode={404} />
	</PageWrapper>
)





export const getStaticProps = getCommands
