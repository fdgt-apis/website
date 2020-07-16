// Module imports
import React, {
	forwardRef,
} from 'react'
import PropTypes from 'prop-types'





// Local imports
import { SimulatorMessageSubscription } from 'components/SimulatorMessageSubscription'
import { SimulatorMessageSystem } from 'components/SimulatorMessageSystem'





const SimulatorMessage = forwardRef((props, ref) => {
	const {
		message,
		timestamp,
		timestampMS,
		user,
	} = props

	return (
		<li
			className="message"
			ref={ref}>
			<time value={timestampMS}>{timestamp}</time>

			<p>
				<span style={{ color: user.color }}>
					<strong>{`${user.name}: `}</strong>
				</span>

				<span>{message}</span>
			</p>
		</li>
	)
})

SimulatorMessage.propTypes = {
	message: PropTypes.string.isRequired,
	timestamp: PropTypes.string.isRequired,
	timestampMS: PropTypes.number.isRequired,
	user: PropTypes.object.isRequired,
}





export { SimulatorMessage }
