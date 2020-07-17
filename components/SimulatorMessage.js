// Module imports
import React, {
	forwardRef,
	useContext,
	useEffect,
	useRef,
} from 'react'
import PropTypes from 'prop-types'





// Local imports
import { SimulatorContext } from 'context/SimulatorContext'
import { SimulatorMessageSubscription } from 'components/SimulatorMessageSubscription'
import { SimulatorMessageSystem } from 'components/SimulatorMessageSystem'





const SimulatorMessage = forwardRef((props, ref) => {
	const {
		bits = 0,
		message,
		timestamp,
		timestampMS,
		user,
	} = props
	const formattedBits = useRef(Intl.NumberFormat().format(bits))
	const {
		cheermotes,
		emotes,
	} = useContext(SimulatorContext)

	return (
		<li
			className="message"
			ref={ref}>
			<time value={timestampMS}>{timestamp}</time>

			<p>
				<span style={{ color: user.color }}>
					<strong>{`${user.name}: `}</strong>
				</span>

				<span>
					{message.split(' ').map(word => {
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
								<>
									<img
										className="emote"
										src={cheerTier.images.dark.animated[4]} />
									{' '}
								</>
							)
						}

						if (emoteID) {
							return (
								<>
									<img
										className="emote"
										src={`https://static-cdn.jtvnw.net/emoticons/v1/${emoteID}/4.0`} />
									{' '}
								</>
							)
						}

						return `${word} `
					})}
				</span>

				{Boolean(bits) && (
					<div className="message-details">
						This message includes {formattedBits.current} bits
					</div>
				)}
			</p>
		</li>
	)
})

SimulatorMessage.defaultProps = {
	bits: null,
}

SimulatorMessage.propTypes = {
	bits: PropTypes.string,
	message: PropTypes.string.isRequired,
	timestamp: PropTypes.string.isRequired,
	timestampMS: PropTypes.number.isRequired,
	user: PropTypes.object.isRequired,
}





export { SimulatorMessage }
