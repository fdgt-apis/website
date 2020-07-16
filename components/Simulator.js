// Module imports
import React, {
	useCallback,
	useContext,
	useState,
} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames'





// Local imports
import { SimulatorChannel } from 'components/SimulatorChannel'
import { SimulatorContext } from 'context/SimulatorContext'
import { SimulatorForm } from 'components/SimulatorForm'





export const Simulator = () => {
	const [currentChannel, setCurrentChannel] = useState('status')
	const [isOpen, setIsOpen] = useState(false)
	const {
		channels,
		isConnected,
		isConnecting,
	} = useContext(SimulatorContext)

	const handleClose = useCallback(() => setIsOpen(false), [setIsOpen])
	const handleOpen = useCallback(() => setIsOpen(true), [setIsOpen])

	const handleChannelClick = useCallback(event => {
		setCurrentChannel(event.target.value)
	}, [setCurrentChannel])

	return (
		<div
			className="simulator"
			data-open={isOpen}>
			<header>
				<h2>Simulator</h2>

				<menu type="toolbar">
					{isOpen && (
						<button
							onClick={handleClose}
							type="button">
							<FontAwesomeIcon
								fixedWidth
								icon="times" />
						</button>
					)}

					{!isOpen && (
						<button
							onClick={handleOpen}
							type="button">
							<FontAwesomeIcon
								fixedWidth
								icon="angle-up" />
						</button>
					)}
				</menu>

				<div
					className="status"
					hidden={isConnected}>
					{isConnecting && 'Connecting...'}
					{(!isConnecting && isConnected) && 'Connected!'}
					{(!isConnecting && !isConnected) && 'Disconnected. 😞'}
				</div>
			</header>

			<ul className="channel-list">
				{Object.keys(channels).map(channelName => (
					<li key={channelName}>
						<button
							className={classnames({
								active: (currentChannel === channelName),
							})}
							onClick={handleChannelClick}
							type="button"
							value={channelName}>
							{channelName}
						</button>
					</li>
				))}
			</ul>

			<div className="channel">
				<SimulatorChannel
					channelName={currentChannel}
					events={channels[currentChannel]}
					key={currentChannel} />
			</div>

			<SimulatorForm />
		</div>
	)
}
