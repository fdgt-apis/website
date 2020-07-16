// Module imports
import React, {
	forwardRef,
} from 'react'
import PropTypes from 'prop-types'





const SimulatorMessageSystem = forwardRef((props, ref) => {
	const {
		message,
		timestamp,
		timestampMS,
	} = props

	return (
		<li
			className="system"
			ref={ref}>
			<time value={timestampMS}>{timestamp}</time>

			<p>{message}</p>
		</li>
	)
})

SimulatorMessageSystem.propTypes = {
	message: PropTypes.string.isRequired,
	timestamp: PropTypes.string.isRequired,
	timestampMS: PropTypes.number.isRequired,
}





export { SimulatorMessageSystem }
