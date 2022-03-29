// Module imports
import React from 'react'





// Local imports
import { getCommands } from 'helpers/getCommands'
import { PageWrapper } from 'components/PageWrapper'





export default function DashboardPage(props) {
	return (
		<PageWrapper {...props}>
			<section>
				<h2>Dashboard</h2>
			</section>
		</PageWrapper>
	)
}

export function getStaticProps(...args) {
	return getCommands(...args)
}
