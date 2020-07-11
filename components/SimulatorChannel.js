// Module imports
import PropTypes from 'prop-types'
import React from 'react'





const SimulatorChannel = props => {
	const { events } = props

	return (
		<div className="channel">
			<ol>
				{events.map((event, index) => {
					const {
						message,
						method,
						timestamp,
						ts,
						type,
						user,
					} = event

					switch (type) {
						case 'subscription':
							return (
								<li
									className="subscription"
									key={index}>
									<time value={ts}>{timestamp}</time>
									<p>
										<strong className="username">{user.name}</strong><br />
										{(method.plan === 'Prime') && (
											<>
												<strong>Subscribed</strong> with <span className="plan-name">Twitch Prime</span>
											</>
										)}
										{(method.plan !== 'Prime') && (
											<>
												<strong>Subscribed</strong> at Tier {method.plan / 1000}
											</>
										)}
									</p>
								</li>
							)

						case 'message':
							default:
								return (
									<li
										className="message"
										key={index}>
										<time value={ts}>{timestamp}</time>
										<p>
											<span style={{ color: user.color }}>
												<strong>{`${user.name}: `}</strong>
											</span>
											<span>{message}</span>
										</p>
									</li>
								)
					}
				})}
			</ol>
		</div>
	)
}

SimulatorChannel.defaultProps = {
	events: [],
}

SimulatorChannel.propTypes = {
	events: PropTypes.array,
}





export { SimulatorChannel }
