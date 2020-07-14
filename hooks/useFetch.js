// Module imports
import { useCallback } from 'react'





// Local imports
import { useAsync } from 'hooks/useAsync'





export const useFetch = (options = {}, asyncOptions = {}) => {
	const {
		url,
	} = options

	const handler = useCallback(() => {
		return fetch(url, options).then(response => response.json())
	}, [])

	return useAsync({
		...asyncOptions,
		handler,
	})
}
