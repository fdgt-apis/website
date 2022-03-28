// Module imports
import React, {
	Fragment,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react'
import classnames from 'classnames'
import Fuse from 'fuse.js'





// Local imports
import { getWordFromIndex } from 'helpers/getWordFromIndex'
import { replaceRangeInString } from 'helpers/replaceRangeInString'
import { SimulatorContext } from 'context/SimulatorContext'
import { useAsync } from 'hooks/useAsync'
import { useFetch } from 'hooks/useFetch'





// Local constants
const fuse = new Fuse([], {
	includeMatches: true,
})
const ircCommands = [
	'join',
	'msg',
	'part',
	'ping',
]





export function SimulatorForm(props) {
	const inputRef = useRef(null)
	const [autocompleteActiveIndex, setAutocompleteActiveIndex] = useState(0)
	const [autocompleteList, setAutocompleteList] = useState([])
	const [history, setHistory] = useState([''])
	const [historyIndex, setHistoryIndex] = useState(0)
	const [message, setMessage] = useState('')
	const retrieveCommandParams = useRef({})
	const {
		addMessage,
		currentChannel,
		isConnected,
		isConnecting,
		joinChannel,
		partChannel,
		sendMessage,
		sendPING,
	} = useContext(SimulatorContext)
	const {
		error: commandsFetchError,
		pending: commandsFetchIsPending,
		value: commandsFetchResponse,
	} = useFetch({
		url: `${process.env.NEXT_PUBLIC_FDGT_API_URL}/fdgt/v1/commands?includeParams=true`,
	}, [])

	const commandsData = commandsFetchResponse?.data || {}
	const commands = Object.keys(commandsData)

	useEffect(() => {
		if (!commandsFetchIsPending) {
			fuse.setCollection(commands)
		}
	}, [
		commands,
		commandsFetchIsPending,
	])

	const contextuallyUpdateMessage = useCallback(newValue => {
		const cursorPosition = inputRef.current.selectionStart
		const {
			range: [start, end],
			result,
		} = getWordFromIndex(message, cursorPosition)

		if (result.startsWith('/')) {
			newValue = `/${newValue}`
		} else if (result.startsWith('-')) {
			newValue = ` --${newValue}`
		}

		setMessage(replaceRangeInString(message, newValue, start, end))
	}, [
		message,
		setMessage,
	])

	const handleAutocompleteSelection = useCallback(event => {
		contextuallyUpdateMessage(event.target.value)
		setAutocompleteList([])
		inputRef.current?.focus()
	}, [
		contextuallyUpdateMessage,
		setAutocompleteList,
	])

	const handleDownArrowKey = useCallback(event => {
		event.preventDefault()
		if (!message && !autocompleteList.length) {
			let newHistoryIndex = historyIndex - 1

			if (newHistoryIndex < 0) {
				newHistoryIndex = history.length - 1
			}

			setHistoryIndex(newHistoryIndex)
		} else {
			let newActiveIndex = autocompleteActiveIndex + 1

			if (newActiveIndex > autocompleteList.length - 1) {
				newActiveIndex = 0
			}

			setAutocompleteActiveIndex(newActiveIndex)
		}
	}, [
		autocompleteActiveIndex,
		autocompleteList,
		historyIndex,
		setAutocompleteActiveIndex,
		setHistoryIndex,
	])

	const handleUpArrowKey = useCallback(event => {
		event.preventDefault()

		if (!message && !autocompleteList.length) {
			let newHistoryIndex = historyIndex + 1

			if (newHistoryIndex > (history.length - 1)) {
				newHistoryIndex = 0
			}

			setHistoryIndex(newHistoryIndex)
		} else {
			let newActiveIndex = autocompleteActiveIndex - 1

			if (newActiveIndex < 0) {
				newActiveIndex = autocompleteList.length - 1
			}

			setAutocompleteActiveIndex(newActiveIndex)
		}
	}, [
		autocompleteActiveIndex,
		autocompleteList,
		history,
		historyIndex,
		setAutocompleteActiveIndex,
		setHistoryIndex,
	])

	const handleEnterKey = useCallback(event => {
		if (autocompleteList.length) {
			let item = autocompleteList[autocompleteActiveIndex]

			event.preventDefault()

			if (typeof item !== 'string') {
				item = item.item
			}

			contextuallyUpdateMessage(item)
			setAutocompleteList([])
			inputRef.current.focus()
		}
	}, [
		autocompleteList,
		autocompleteActiveIndex,
		contextuallyUpdateMessage,
		setAutocompleteList,
	])

	const handleKeydown = useCallback(event => {
		if (![9, 13, 38, 40].includes(event.which)) {
			return
		}

		switch (event.which) {
			case 9:
			case 13:
				handleEnterKey(event)
				break

			case 38:
				handleUpArrowKey(event)
				break

			case 40:
				handleDownArrowKey(event)
				break
		}
	}, [
		handleDownArrowKey,
		handleEnterKey,
		handleUpArrowKey,
	])

	const handleMessageChange = useCallback(event => {
		const { value } = event.target
		const [command, ...args] = value.split(' ')
		const commandIsValid = fuse._docs.includes(command)
		const cursorPosition = inputRef.current.selectionStart

		const { result: currentAutocompleteTarget } = getWordFromIndex(value, cursorPosition)

		if (historyIndex > 0) {
			setHistoryIndex(0)
		}

		if (value && value[cursorPosition - 1] !== ' ') {
			if (currentAutocompleteTarget === command) {
				if (command.startsWith('/')) {
					fuse.setCollection(ircCommands)
				} else {
					fuse.setCollection(commands || [])
				}
			} else if (currentAutocompleteTarget?.startsWith('-')) {
				fuse.setCollection((commandsData?.[command] || []).map(({ name }) => name))
			} else {
				fuse.setCollection([])
			}

			if (currentAutocompleteTarget) {
				let query = currentAutocompleteTarget.replace(/^--?/, '')
				let results = fuse._docs

				if (query) {
					results = fuse.search(query).reverse()
				}

				setAutocompleteList(results)
				setAutocompleteActiveIndex(results.length - 1)
			} else {
				setAutocompleteList([])
			}
		}

		setMessage(value)
	}, [
		commands,
		message,
		setAutocompleteList,
		setHistoryIndex,
		setMessage,
	])

	const handleMessageSubmit = useCallback(event => {
		event.preventDefault()

		const [command] = message.split(' ')
		const subMessage = message.split(' ').slice(1).join(' ')

		setHistory(oldHistory => ([
			'',
			message,
			...oldHistory.slice(1, 9),
		]))

		setHistoryIndex(0)

		if (command.startsWith('/')) {
			switch (command) {
				case '/join':
					joinChannel(subMessage)
					break

				case '/msg':
					sendMessage(currentChannel, subMessage)
					break

				case '/part':
					partChannel(subMessage)
					break

				case '/ping':
					sendPING(subMessage)
					break

				default:
					addMessage('status', `Unrecognized command: ${command}`)
			}
		} else {
			sendMessage(currentChannel, message)
		}

		setMessage('')
	}, [
		historyIndex,
		message,
		sendMessage,
		setHistory,
		setHistoryIndex,
		setMessage,
	])

	const handleMouseOverAutocompleteItem = useCallback(index => () => {
		setAutocompleteActiveIndex(index)
	}, [setAutocompleteActiveIndex])

	useEffect(() => {
		const inputElement = inputRef.current
		inputElement.addEventListener('keydown', handleKeydown)
		return () => inputElement.removeEventListener('keydown', handleKeydown)
	}, [handleKeydown])

	return (
		<form onSubmit={handleMessageSubmit}>
			<ol className="autocomplete">
				{autocompleteList.map((result, autocompleteIndex) => {
					let value = null
					let renderedValue = null

					if (typeof result !== 'string') {
						const {
							item,
							matches: [{ indices }],
						} = result

						value = item

						renderedValue = indices.map((match, index) => {
							const [start, end] = match
							const isLastIndex = (index === (indices.length - 1))

							return (
								<Fragment key={index}>
									{item.substring(indices[index - 1]?.[1] + 1 || 0, start)}

									<strong>{item.substring(start, end + 1)}</strong>

									{isLastIndex && item.substring(end + 1)}
								</Fragment>
							)
						})
					} else {
						value = result
						renderedValue = result
					}

					return (
						<li key={value}>
							<button
								className={classnames({
									active: autocompleteActiveIndex === autocompleteIndex,
								})}
								onClick={handleAutocompleteSelection}
								onMouseOver={handleMouseOverAutocompleteItem(autocompleteIndex)}
								type="button"
								value={value}>
								{renderedValue}
							</button>
						</li>
					)
				})}
			</ol>

			<input
				disabled={isConnecting || !isConnected}
				onChange={handleMessageChange}
				placeholder="Message"
				ref={inputRef}
				value={message || history[historyIndex]} />

			<button
				disabled={isConnecting || !isConnected}
				type="submit">
				Send
			</button>
		</form>
	)
}
