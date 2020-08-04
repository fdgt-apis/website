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





const SimulatorMessageSubscription = forwardRef((props, ref) => {
	const {
		message,
		tags,
	} = props

	const timestamp = useRef(dateFormatter.format(new Date(parseInt(tags['tmi-sent-ts'], 10))))

	return (
		<li
			className="highlight message sub"
			ref={ref}>
			<time value={tags['tmi-sent-ts']}>{timestamp.current}</time>

			<div className="body">
				<p>
					<strong>{tags['display-name']}</strong><br />

					{(tags['msg-param-sub-plan'] === 'Prime') && (
						<>
							<strong>Subscribed</strong> with <span className="accent">Twitch Prime</span>
						</>
					)}

					{(tags['msg-param-sub-plan'] !== 'Prime') && (
						<>
							<strong>Subscribed</strong> at <strong className="accent">Tier {tags['msg-param-sub-plan'] / 1000}</strong>
						</>
					)}
				</p>
			</div>
		</li>
	)
})

SimulatorMessageSubscription.defaultProps = {
	message: '',
}

SimulatorMessageSubscription.propTypes = {
	message: PropTypes.string,
	tags: PropTypes.object.isRequired,
}





export { SimulatorMessageSubscription }
