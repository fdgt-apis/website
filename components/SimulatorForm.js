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
import { SimulatorContext } from 'context/SimulatorContext'
import { useAsync } from 'hooks/useAsync'





// Local constants
const fuse = new Fuse([], {
	includeMatches: true,
})





export const SimulatorForm = () => {
	const inputRef = useRef(null)
	const [autocompleteActiveIndex, setAutocompleteActiveIndex] = useState(0)
	const [autocompleteList, setAutocompleteList] = useState([])
	const [message, setMessage] = useState('')
	const {
		isConnected,
		isConnecting,
		sendMessage,
	} = useContext(SimulatorContext)

	const handleAutocompleteSelection = useCallback(event => {
		setAutocompleteList([])
		setAutocompleteActiveIndex(0)
		setMessage(event.target.value)
		inputRef.current?.focus()
	}, [
		setAutocompleteActiveIndex,
		setAutocompleteList,
		setMessage,
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
			setMessage(autocompleteList[autocompleteActiveIndex].item)
			setAutocompleteList([])
			setAutocompleteActiveIndex(0)
			inputRef.current.focus()
		}
	}, [
		autocompleteList,
		autocompleteActiveIndex,
		setAutocompleteActiveIndex,
		setAutocompleteList,
		setMessage,
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
		autocompleteActiveIndex,
		autocompleteList,
		setAutocompleteActiveIndex,
		setAutocompleteList,
		setMessage,
	])

	const handleMessageChange = useCallback(event => {
		const { value } = event.target
		const results = fuse.search(value).reverse()

		setMessage(value)
		setAutocompleteList(results)
		setAutocompleteActiveIndex(results.length - 1)
	}, [
		setAutocompleteList,
		setMessage,
	])

	const handleMessageSubmit = useCallback(event => {
		event.preventDefault()
		sendMessage('#fdgt', message)
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

	useAsync(async () => {
		const { data } = await fetch('https://api.fdgt.dev/fdgt/v1/commands').then(response => response.json())
		fuse.setCollection(data)
	}, [])

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
