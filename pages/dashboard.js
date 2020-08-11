// Module imports
import React, {
	useCallback,
  useEffect,
  useState,
} from 'react'
import { useRouter } from 'next/router'





// Local imports
import {
	auth,
	firebase,
} from 'helpers/firebase'
import { getCommands } from 'helpers/getCommands'
import { PageWrapper } from 'components/PageWrapper'
import { useRequireAuthentication } from 'hooks/useRequireAuthentication'





const LoginPage = props => {
	useRequireAuthentication()

	return (
		<PageWrapper {...props}>
			<section>
				<h2>Dashboard</h2>
			</section>
		</PageWrapper>
	)
}

export const getStaticProps = getCommands





export default LoginPage
