// Module imports
import React, {
	useContext,
} from 'react'





// Local imports
import { SimulatorChannel } from 'components/SimulatorChannel'
import { SimulatorContext } from 'context/SimulatorContext'
import { SimulatorForm } from 'components/SimulatorForm'





export const Simulator = () => {
	const {
		channels,
		isConnected,
		isConnecting,
	} = useContext(SimulatorContext)

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

			<SimulatorForm />
		</div>
	)
}
