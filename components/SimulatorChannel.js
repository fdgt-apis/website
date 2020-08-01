// Module imports
import React, {
	useEffect,
	useRef,
} from 'react'
import PropTypes from 'prop-types'





// Local imports
import { SimulatorMessage } from 'components/SimulatorMessage'
import { SimulatorMessageRaid } from 'components/SimulatorMessageRaid'
import { SimulatorMessageResubscription } from 'components/SimulatorMessageResubscription'
import { SimulatorMessageSubscription } from 'components/SimulatorMessageSubscription'
import { SimulatorMessageSystem } from 'components/SimulatorMessageSystem'





const SimulatorChannel = props => {
	const {
		channelName,
		events,
	} = props
	const newestMessageRef = useRef(null)

	useEffect(() => {
		const newestMessageEl = newestMessageRef.current

		if (newestMessageEl) {
			const {
				offsetHeight,
				scrollTop,
				scrollHeight,
			} = newestMessageEl.parentElement.parentElement

			if ((offsetHeight + scrollTop) !== scrollHeight) {
				newestMessageEl.scrollIntoView({ behavior: 'smooth' })
			}
		}
	}, [events])

	return (
		<ol>
			{events.map((event, index) => {
				let Component = null
				let ref = null

				if (index === (events.length - 1)) {
					ref = newestMessageRef
				}

				switch (event.type) {
					case 'message':
						Component = SimulatorMessage
						break

					case 'raid':
						Component = SimulatorMessageRaid
						break

					case 'resub':
						Component = SimulatorMessageResubscription
						break

					case 'sub':
						Component = SimulatorMessageSubscription
						break

					case 'system':
						Component = SimulatorMessageSystem
						break

					default:
						return null
				}

				return (
					<Component
						{...event}
						key={index}
						ref={ref} />
				)
			})}
		</ol>
	)
}

SimulatorChannel.defaultProps = {
	events: [],
}

SimulatorChannel.propTypes = {
	events: PropTypes.array,
}





export { SimulatorChannel }
