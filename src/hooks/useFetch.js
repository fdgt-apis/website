// Module imports
import { useCallback } from 'react'





// Local imports
import { useAsync } from 'hooks/useAsync'





export function useFetch(options = {}, asyncOptions = {}) {
	const { url } = options

	const handler = useCallback(() => {
		return fetch(url, options).then(response => response.json())
	}, [
		options,
		url,
	])

	return useAsync({
		...asyncOptions,
		handler,
	}, [handler])
}
