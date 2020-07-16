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





export const SimulatorForm = props => {
	const inputRef = useRef(null)
	const [autocompleteActiveIndex, setAutocompleteActiveIndex] = useState(0)
	const [autocompleteList, setAutocompleteList] = useState([])
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
		} else if (result.startsWith('--')) {
			newValue = ` --${newValue}`
		}

		setMessage(replaceRangeInString(message, newValue, start, end))
	}, [
		message,
		setMessage,
	])

	const handleAutocompleteSelection = useCallback(event => {
		console.log('handleAutocompleteSelection', event.target.value)
		contextuallyUpdateMessage(event.target.value)
		setAutocompleteList([])
		inputRef.current?.focus()
	}, [
		contextuallyUpdateMessage,
		setAutocompleteList,
	])

	const handleDownArrowKey = useCallback(event => {
		event.preventDefault()

		let newActiveIndex = autocompleteActiveIndex + 1

		if (newActiveIndex > autocompleteList.length - 1) {
			newActiveIndex = 0
		}

		return setAutocompleteActiveIndex(newActiveIndex)
	}, [
		autocompleteActiveIndex,
		autocompleteList,
		setAutocompleteActiveIndex,
	])

	const handleUpArrowKey = useCallback(event => {
		event.preventDefault()

		let newActiveIndex = autocompleteActiveIndex - 1

		if (newActiveIndex < 0) {
			newActiveIndex = autocompleteList.length - 1
		}

		return setAutocompleteActiveIndex(newActiveIndex)
	}, [
		autocompleteActiveIndex,
		autocompleteList,
		setAutocompleteActiveIndex,
	])

	const handleEnterKey = useCallback(event => {
		if (autocompleteList.length) {
			event.preventDefault()
			contextuallyUpdateMessage(autocompleteList[autocompleteActiveIndex].item)
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
		if (![13, 38, 40].includes(event.which)) {
			return
		}

		switch (event.which) {
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

		if (currentAutocompleteTarget === command) {
			if (command.startsWith('/')) {
				fuse.setCollection(ircCommands)
			} else {
				fuse.setCollection(commands || [])
			}
		} else if (currentAutocompleteTarget?.startsWith('--')) {
			fuse.setCollection((commandsData?.[command] || []).map(({ name }) => name))
		} else {
			fuse.setCollection([])
		}

		if (currentAutocompleteTarget) {
			const results = fuse.search(currentAutocompleteTarget.replace(/^--/, '')).reverse()
			setAutocompleteList(results)
			setAutocompleteActiveIndex(results.length - 1)
		} else {
			setAutocompleteList([])
		}

		setMessage(value)
	}, [
		commands,
		message,
		setAutocompleteList,
		setMessage,
	])

	const handleMessageSubmit = useCallback(event => {
		event.preventDefault()

		const [command] = message.split(' ')
		const subMessage = message.split(' ').slice(1).join(' ')

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
					sendPING()
					break

				default:
					addMessage('status', `Unrecognized command: ${command}`)
			}
		} else {
			sendMessage(currentChannel, message)
		}

		setMessage('')
	}, [
		message,
		sendMessage,
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
					const {
						item,
						matches: [{ indices }],
					} = result

					return (
						<li key={item}>
							<button
								className={classnames({
									active: autocompleteActiveIndex === autocompleteIndex,
								})}
								onClick={handleAutocompleteSelection}
								onMouseOver={handleMouseOverAutocompleteItem(autocompleteIndex)}
								type="button"
								value={item}>
								{indices.map((match, index) => {
									const [start, end] = match
									const isLastIndex = (index === (indices.length - 1))

									return (
										<Fragment key={index}>
											{item.substring(indices[index - 1]?.[1] + 1 || 0, start)}

											<strong>{item.substring(start, end + 1)}</strong>

											{isLastIndex && item.substring(end + 1)}
										</Fragment>
									)
								})}
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
				value={message} />

			<button
				disabled={isConnecting || !isConnected}
				type="submit">
				Send
			</button>
		</form>
	)
}
