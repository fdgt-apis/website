// Module imports
import { useEffect } from 'react'
import { useRouter } from 'next/router'





// Local imports
import { auth } from 'helpers/firebase'





export const useRequireAuthentication = () => {
	const Router = useRouter()

	useEffect(() => auth.onAuthStateChanged(user => {
		if (!user) {
			Router.push('/login')
		}
	}), [])
}
