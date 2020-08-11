// Module imports
import React, {
	forwardRef,
	useRef,
} from 'react'
import PropTypes from 'prop-types'





// Local constants
const dateFormatter = new Intl.DateTimeFormat(undefined, {
	hour: 'numeric',
	minute: 'numeric',
})





const SimulatorMessageSystem = forwardRef((props, ref) => {
	const { message } = props

	const timestampMS = useRef(Date.now())
	const timestamp = useRef(dateFormatter.format(timestampMS.current))

	return (
		<li
			className="message system"
			ref={ref}>
			<time value={timestampMS.current}>{timestamp.current}</time>

			<div className="body">
				<p>{message}</p>
			</div>
		</li>
	)
})

SimulatorMessageSystem.propTypes = {
	message: PropTypes.string.isRequired,
}





export { SimulatorMessageSystem }
