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





const SimulatorMessageResubscription = forwardRef((props, ref) => {
	const {
		message,
		tags,
	} = props

	const timestamp = useRef(dateFormatter.format(new Date(parseInt(tags['tmi-sent-ts'], 10))))

	return (
		<li
			className="highlight message resub"
			ref={ref}>
			<time value={tags['tmi-sent-ts']}>{timestamp.current}</time>

			<div className="body">
				<p>
					<strong>{tags['display-name']}</strong><br />

					{(tags['msg-param-sub-plan'] === 'Prime') && (
						<>
							<strong>Resubscribed</strong> with <strong className="accent">Twitch Prime</strong>! They've been subscribed for <strong>{tags['msg-param-cumulative-months']}</strong> months!
						</>
					)}

					{(tags['msg-param-sub-plan'] !== 'Prime') && (
						<>
							<strong>Resubscribed</strong> at <strong className="accent">Tier {tags['msg-param-sub-plan'] / 1000}</strong>! They've been subscribed for <strong>{tags['msg-param-cumulative-months']}</strong> months!
						</>
					)}
				</p>
			</div>
		</li>
	)
})

SimulatorMessageResubscription.defaultProps = {
	message: '',
}

SimulatorMessageResubscription.propTypes = {
	message: PropTypes.string,
	tags: PropTypes.object.isRequired,
}





export { SimulatorMessageResubscription }
