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





const SimulatorMessageSubGift = forwardRef((props, ref) => {
	const {
		message,
		tags,
	} = props

	const timestamp = useRef(dateFormatter.format(new Date(parseInt(tags['tmi-sent-ts'], 10))))

	return (
		<li
			className="highlight message subgift"
			ref={ref}>
			<time value={tags['tmi-sent-ts']}>{timestamp.current}</time>

			<p>
				<strong>{tags['display-name']}</strong><br />

				Gifted a <span className="accent">Tier {tags['msg-param-sub-plan'] / 1000}</span> sub to <span className="accent">{tags['msg-param-recipient-display-name']}</span>!<br />

				They have given <span className="accent">{tags['msg-param-sender-count']}</span> gift sub{tags['msg-param-sender-count'] > 1 ? 's' : ''} in the channel!
			</p>
		</li>
	)
})

SimulatorMessageSubGift.defaultProps = {
	message: '',
}

SimulatorMessageSubGift.propTypes = {
	message: PropTypes.string,
	tags: PropTypes.object.isRequired,
}





export { SimulatorMessageSubGift }
