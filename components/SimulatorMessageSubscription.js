// Module imports
import React, {
	forwardRef,
} from 'react'
import PropTypes from 'prop-types'





const SimulatorMessageSubscription = forwardRef((props, ref) => {
	const {
		details,
		message,
		timestamp,
		timestampMS,
		user,
	} = props

	return (
		<li
			className="subscription"
			ref={ref}>
			<time value={timestampMS}>{timestamp}</time>

			<p>
				<strong className="username">{user.name}</strong><br />

				{(details.plan === 'Prime') && (
					<>
						<strong>Subscribed</strong> with <span className="plan-name">Twitch Prime</span>
					</>
				)}

				{(details.plan !== 'Prime') && (
					<>
						<strong>Subscribed</strong> at Tier {details.plan / 1000}
					</>
				)}
			</p>
		</li>
	)
})

SimulatorMessageSubscription.defaultProps = {
	message: '',
}

SimulatorMessageSubscription.propTypes = {
	details: PropTypes.object.isRequired,
	message: PropTypes.string,
	timestamp: PropTypes.string.isRequired,
	timestampMS: PropTypes.number.isRequired,
	user: PropTypes.object.isRequired,
}





export { SimulatorMessageSubscription }
