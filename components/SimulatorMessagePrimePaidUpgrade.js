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





const SimulatorMessagePrimePaidUpgrade = forwardRef((props, ref) => {
	const {
		message,
		tags,
	} = props

	const timestamp = useRef(dateFormatter.format(new Date(parseInt(tags['tmi-sent-ts'], 10))))

	return (
		<li
			className="highlight message giftpaidupgrade"
			ref={ref}>
			<time value={tags['tmi-sent-ts']}>{timestamp.current}</time>

			<p>
				<strong>{tags['display-name']}</strong><br />

				Converted from a Twitch Prime sub to a <span className="accent">Tier {tags['msg-param-sub-plan'] / 1000}</span> sub!
			</p>
		</li>
	)
})

SimulatorMessagePrimePaidUpgrade.defaultProps = {
	message: '',
}

SimulatorMessagePrimePaidUpgrade.propTypes = {
	message: PropTypes.string,
	tags: PropTypes.object.isRequired,
}





export { SimulatorMessagePrimePaidUpgrade }
