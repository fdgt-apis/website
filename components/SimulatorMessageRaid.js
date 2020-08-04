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





const SimulatorMessageRaid = forwardRef((props, ref) => {
	const { tags } = props

	const timestamp = useRef(dateFormatter.format(new Date(parseInt(tags['tmi-sent-ts'], 10))))

	return (
		<li
			className="highlight message raid"
			ref={ref}>
			<time value={tags['tmi-sent-ts']}>{timestamp.current}</time>

			<div className="body">
				<p>
					<strong>{tags['msg-param-displayName']}</strong><br />
					<strong>Raided</strong> with <strong className="accent">{tags['msg-param-viewerCount']}</strong> viewers!
				</p>
			</div>
		</li>
	)
})

SimulatorMessageRaid.propTypes = {
	tags: PropTypes.object.isRequired,
}





export { SimulatorMessageRaid }
