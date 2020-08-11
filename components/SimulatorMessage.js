// Module imports
import React, {
	forwardRef,
	Fragment,
	useContext,
	useEffect,
	useRef,
} from 'react'
import PropTypes from 'prop-types'





// Local imports
import { SimulatorContext } from 'context/SimulatorContext'
import { SimulatorMessageSubscription } from 'components/SimulatorMessageSubscription'
import { SimulatorMessageSystem } from 'components/SimulatorMessageSystem'





// Local constants
const dateFormatter = new Intl.DateTimeFormat(undefined, {
	hour: 'numeric',
	minute: 'numeric',
})





const SimulatorMessage = forwardRef((props, ref) => {
	const {
		message,
		tags,
	} = props
	const formattedBits = useRef(Intl.NumberFormat().format(parseInt(tags.bits || 0, 10)))
	const timestamp = useRef(dateFormatter.format(new Date(parseInt(tags['tmi-sent-ts'] || Date.now(), 10))))
	const {
		cheermotes,
		emotes,
	} = useContext(SimulatorContext)

	const userColor = tags.color || 'var(--dragon)'
	const userDisplayName = tags['display-name'] || 'fdgt-user'

	return (
		<li
			className="message"
			ref={ref}>
			<time value={tags['tmi-sent-ts']}>{timestamp.current}</time>

			<div className="body">
				<p>
					<span style={{ color: userColor }}>
						<strong>{`${userDisplayName}: `}</strong>
					</span>

					<span>
						{message.split(' ').map((word, wIndex) => {
							const [, cheermoteMatch, cheerAmount] = /^(\w+?)(\d+)$/giu.exec(word) || []
							const cheermoteTiers = cheermotes?.[cheermoteMatch?.toLowerCase()]
							const emoteID = emotes[word.toLowerCase()]

							if (cheermoteTiers) {
								let cheerTier = null

								cheermoteTiers.some(cheermoteTier => {
									if (cheermoteTier.min_bits <= cheerAmount) {
										cheerTier = cheermoteTier
										return true
									}

									return false
								})

								return (
									<Fragment key={wIndex}>
										<img
											className="emote"
											src={cheerTier.images.dark.animated[4]} />
										{' '}
									</Fragment>
								)
							}

							if (emoteID) {
								return (
									<Fragment key={wIndex}>
										<img
											className="emote"
											src={`https://static-cdn.jtvnw.net/emoticons/v1/${emoteID}/4.0`} />
										{' '}
									</Fragment>
								)
							}

							return `${word} `
						})}
					</span>
				</p>

				{(parseInt(tags.bits, 10) > 0) && (
					<div className="message-details">
						This message includes {formattedBits.current} bits
					</div>
				)}
			</div>
		</li>
	)
})

SimulatorMessage.defaultProps = {
	tags: {},
}

SimulatorMessage.propTypes = {
	message: PropTypes.string.isRequired,
	tags: PropTypes.object,
}





export { SimulatorMessage }
