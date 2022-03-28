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





export const SimulatorMessageExtendSubscription = forwardRef((props, ref) => {
	const {
		message,
		tags,
	} = props

	const timestamp = useRef(dateFormatter.format(new Date(parseInt(tags['tmi-sent-ts'], 10))))
	const extendedToDate = new Date

	extendedToDate.setMonth(tags['msg-param-sub-benefit-end-month'])

	const extendedToMonthString = new Intl.DateTimeFormat(undefined, { month: 'long' }).format(extendedToDate)

	return (
		<li
			className="highlight message extendsub"
			ref={ref}>
			<time value={tags['tmi-sent-ts']}>{timestamp.current}</time>

			<div className="body">
				<p>
					<strong>{tags['display-name']}</strong><br />

					Extended their subscription through <span className="accent">{extendedToMonthString}</span>!
				</p>
			</div>
		</li>
	)
})

SimulatorMessageExtendSubscription.defaultProps = {
	message: '',
}

SimulatorMessageExtendSubscription.propTypes = {
	message: PropTypes.string,
	tags: PropTypes.object.isRequired,
}
