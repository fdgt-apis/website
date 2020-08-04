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





const SimulatorMessageSubMysteryGift = forwardRef((props, ref) => {
	const {
		message,
		tags,
	} = props

	const timestamp = useRef(dateFormatter.format(new Date(parseInt(tags['tmi-sent-ts'], 10))))

	return (
		<li
			className="highlight message submysterygift"
			ref={ref}>
			<time value={tags['tmi-sent-ts']}>{timestamp.current}</time>

			<p>
				<strong>{tags['display-name']}</strong><br />

				Is gifting <span className="accent">{tags['msg-param-mass-gift-count']} Tier {tags['msg-param-sub-plan'] / 1000} Subs</span> to the community!<br />

				They've gifted a total of <span className="accent">{tags['msg-param-sender-count']}</span> Gift Subs in the channel!
			</p>
		</li>
	)
})

SimulatorMessageSubMysteryGift.defaultProps = {
	message: '',
}

SimulatorMessageSubMysteryGift.propTypes = {
	message: PropTypes.string,
	tags: PropTypes.object.isRequired,
}





export { SimulatorMessageSubMysteryGift }
