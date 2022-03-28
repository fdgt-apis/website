// Module imports
import React, {
	useCallback,
	useEffect,
	useState,
} from 'react'
import LocalForage from 'localforage'
import PropTypes from 'prop-types'





// Local imports
import { useAsync } from 'hooks/useAsync'




export const ExampleModeContext = React.createContext({
	codeTemplates: {},
	currentExampleMode: null,
	exampleModes: [],
	setCodeTemplates: () => {},
	setCurrentExampleMode: () => {},
	setExampleModes: () => {},
})





export function ExampleModeContextProvider(props) {
	const { children } = props

	const [codeTemplates, setCodeTemplates] = useState({})
	const [currentExampleMode, setCurrentExampleMode] = useState(null)
	const [exampleModes, setExampleModes] = useState([])

	const getPersistedExampleMode = useCallback(async () => {
		const persistedExampleMode = await LocalForage.getItem('fdgt.example-mode')

		if (!persistedExampleMode) {
			await LocalForage.setItem('fdgt.example-mode', 'tmi.js')
		}

		return persistedExampleMode || 'tmi.js'
	}, [])

	const {
		pending: persistentExampleModeIsPending,
		value: persistentExampleModeValue,
	} = useAsync({
		handler: getPersistedExampleMode,
	}, [])

	useEffect(() => {
		if (!persistentExampleModeIsPending) {
			setCurrentExampleMode(persistentExampleModeValue)
		}
	}, [
		setCurrentExampleMode,
		persistentExampleModeIsPending,
		persistentExampleModeValue,
	])

	return (
		<ExampleModeContext.Provider
			value={{
				codeTemplates,
				currentExampleMode,
				exampleModes,
				setCodeTemplates: newCodeTemplates => setCodeTemplates(newCodeTemplates),
				setCurrentExampleMode: async exampleMode => {
					await LocalForage.setItem('fdgt.example-mode', exampleMode)
					setCurrentExampleMode(exampleMode)
				},
				setExampleModes: newExampleModes => setExampleModes(newExampleModes),
			}}>
			{children}
		</ExampleModeContext.Provider>
	)
}

ExampleModeContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
}
