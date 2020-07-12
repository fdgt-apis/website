// Module imports
import React, {
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react'





// Local imports
import { SimulatorChannel } from 'components/SimulatorChannel'
import { SimulatorContext } from 'context/SimulatorContext'





export const Simulator = () => {
	const [message, setMessage] = useState('')
	const {
		channels,
		isConnected,
		isConnecting,
		sendMessage,
	} = useContext(SimulatorContext)

	const handleMessageChange = useCallback(event => setMessage(event.target.value), [setMessage])
	const handleMessageSubmit = useCallback(event => {
		event.preventDefault()
		sendMessage('#fdgt', message)
		setMessage('')
	}, [
		message,
		sendMessage,
		setMessage,
	])

	return (
		<div className="simulator">
			<header>
				<h2>Simulator</h2>

				<div
					className="status"
					hidden={isConnected}>
					{isConnecting && 'Connecting...'}
					{(!isConnecting && isConnected) && 'Connected!'}
					{(!isConnecting && !isConnected) && 'Disconnected. 😞'}
				</div>
			</header>

			<div className="channel">
				{Object.entries(channels).map(([channelName, events]) => (
					<SimulatorChannel
						events={events}
						key={channelName} />
				))}
			</div>

			<form onSubmit={handleMessageSubmit}>
				<input
					onChange={handleMessageChange}
					value={message} />

				<button type="submit">Send</button>
			</form>
		</div>
	)
}
