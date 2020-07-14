// Module imports
import {
	useCallback,
	useEffect,
	useState,
} from 'react'





export const useAsync = (options, dependencies = []) => {
	const {
		handler,
		immediate = true
	} = options

	const [pending, setPending] = useState(false)
	const [error, setError] = useState(null)
	const [value, setValue] = useState(null)

	const execute = useCallback(() => {
		setPending(true)
    setValue(null)
		setError(null)

		return handler()
			.then(response => setValue(response))
			.catch(error => setError(error))
			.finally(() => setPending(false))
	}, [
		setError,
		setPending,
		setValue,
		handler,
	])

	useEffect(() => {
		if (immediate) {
      execute()
		}

		return () => {}
	}, [
		...dependencies,
		execute,
		immediate,
	])

	return {
		error,
		execute,
		pending,
		value,
	}
}
