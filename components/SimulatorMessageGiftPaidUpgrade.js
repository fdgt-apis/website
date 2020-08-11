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





const SimulatorMessageGiftPaidUpgrade = forwardRef((props, ref) => {
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

			<div className="body">
				<p>
					<strong>{tags['display-name']}</strong><br />

					Is continuing the Gift Sub they got from <span className="accent">{tags['msg-param-sender-name']}</span>
				</p>
			</div>
		</li>
	)
})

SimulatorMessageGiftPaidUpgrade.defaultProps = {
	message: '',
}

SimulatorMessageGiftPaidUpgrade.propTypes = {
	message: PropTypes.string,
	tags: PropTypes.object.isRequired,
}





export { SimulatorMessageGiftPaidUpgrade }
