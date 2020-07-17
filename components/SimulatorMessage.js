// Module imports
import React, {
	forwardRef,
	useRef,
} from 'react'
import PropTypes from 'prop-types'





// Local imports
import { SimulatorMessageSubscription } from 'components/SimulatorMessageSubscription'
import { SimulatorMessageSystem } from 'components/SimulatorMessageSystem'





const SimulatorMessage = forwardRef((props, ref) => {
	const {
		bits = 0,
		message,
		timestamp,
		timestampMS,
		user,
	} = props
	const formattedBits = useRef(Intl.NumberFormat().format(bits))

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

				{Boolean(bits) && (
					<div className="message-details">
						This message includes {formattedBits.current} bits
					</div>
				)}
			</p>
		</li>
	)
})

SimulatorMessage.defaultProps = {
	bits: null,
}

SimulatorMessage.propTypes = {
	bits: PropTypes.string,
	message: PropTypes.string.isRequired,
	timestamp: PropTypes.string.isRequired,
	timestampMS: PropTypes.number.isRequired,
	user: PropTypes.object.isRequired,
}





export { SimulatorMessage }
