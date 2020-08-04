// Module imports
import React, {
	useEffect,
	useRef,
} from 'react'
import classnames from 'classnames'
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
		state,
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
		<div className="channel">
			{Boolean(state) && (
				<aside>
					<ol className="inline">
						<li>
							<strong>Emote only:</strong>
							<span className={classnames({ enabled: state.emoteOnly })}>
								{' '}{state.emoteOnly ? 'on' : 'off'}
							</span>
						</li>

						<li>
							<strong>Subs only:</strong>
							<span className={classnames({ enabled: state.subs })}>
								{' '}{state.subs ? 'on' : 'off'}
							</span>
						</li>

						<li>
							<strong>Slow mode:</strong>
							<span className={classnames({ enabled: state.slowMode })}>
								{' '}{state.slowMode ? 'on' : 'off'}
							</span>
						</li>
					</ol>
				</aside>
			)}

			<ol className="messages">
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
		</div>
	)
}

SimulatorChannel.defaultProps = {
	state: null,
}

SimulatorChannel.propTypes = {
	events: PropTypes.array.isRequired,
	state: PropTypes.object,
}





export { SimulatorChannel }
