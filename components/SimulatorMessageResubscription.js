// Module imports
import React, {
	forwardRef,
} from 'react'
import PropTypes from 'prop-types'





const SimulatorMessageResubscription = forwardRef((props, ref) => {
	const {
		details,
		message,
		tags,
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
						<strong>Resubscribed</strong> with <span className="plan-name">Twitch Prime</span>! They've been subscribed for <strong>{tags['msg-param-cumulative-months']}</strong> months!
					</>
				)}

				{(details.plan !== 'Prime') && (
					<>
						<strong>Resubscribed</strong> at Tier {details.plan / 1000}! They've been subscribed for <strong>{tags['msg-param-cumulative-months']}</strong> months!
					</>
				)}
			</p>
		</li>
	)
})

SimulatorMessageResubscription.defaultProps = {
	message: '',
}

SimulatorMessageResubscription.propTypes = {
	details: PropTypes.object.isRequired,
	message: PropTypes.string,
	timestamp: PropTypes.string.isRequired,
	timestampMS: PropTypes.number.isRequired,
	user: PropTypes.object.isRequired,
}





export { SimulatorMessageResubscription }
