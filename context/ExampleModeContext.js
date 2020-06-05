// Module imports
import React, {
	useState,
} from 'react'
import LocalForage from 'localforage'
import PropTypes from 'prop-types'





// Local imports
import { useAsync } from 'hooks/useAsync'




const ExampleModeContext = React.createContext({
	codeTemplates: {},
	currentExampleMode: null,
	exampleModes: [],
	setCodeTemplates: () => {},
	setCurrentExampleMode: () => {},
	setExampleModes: () => {},
})





const ExampleModeContextProvider = props => {
	const { children } = props

	const [codeTemplates, setCodeTemplates] = useState({})
	const [currentExampleMode, setCurrentExampleMode] = useState(null)
	const [exampleModes, setExampleModes] = useState([])

	useAsync(async () => {
		const persistedExampleMode = await LocalForage.getItem('fdgt.example-mode')

		if (!persistedExampleMode) {
			await LocalForage.setItem('fdgt.example-mode', 'tmi.js')
		}

		setCurrentExampleMode(persistedExampleMode || 'tmi.js')
	})

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

export {
	ExampleModeContext,
	ExampleModeContextProvider,
}
