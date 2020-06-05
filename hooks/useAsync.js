// Module imports
import { useEffect } from 'react'





export const useAsync = (handler, dependencies = []) => {
	useEffect(() => {
		(async () => await handler())()

		return () => {}
	}, dependencies)
}
