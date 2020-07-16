// Module imports
import React, {
	useCallback,
	useContext,
	useState,
} from 'react'
import {
  animated,
  useSpring,
} from 'react-spring'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames'
import useResizeAware from 'react-resize-aware'





// Local imports
import { SimulatorChannel } from 'components/SimulatorChannel'
import { SimulatorContext } from 'context/SimulatorContext'
import { SimulatorForm } from 'components/SimulatorForm'





export const Simulator = () => {
	const [isOpen, setIsOpen] = useState(false)
	const {
		channels,
		currentChannel,
		handleChannelSelect,
	} = useContext(SimulatorContext)
  const [resizeListener, { height }] = useResizeAware()
  const spring = useSpring({
    from: {
      height: '0vh',
      width: '10rem',
    },
    to: async next => {
			if (isOpen) {
				await next({ width: '40vw' })
				await next({ height: '40vh' })
			} else {
				await next({ height: '0vh' })
				await next({ width: '10rem' })
			}
		},
  })

	const handleClose = useCallback(() => setIsOpen(false), [setIsOpen])
	const handleOpen = useCallback(() => setIsOpen(true), [setIsOpen])

	const handleChannelClick = useCallback(event => {
		handleChannelSelect(event.target.value)
	}, [handleChannelSelect])

	return (
		<div className="simulator">
			<header>
				<h2>Simulator</h2>

				<menu type="toolbar">
					{isOpen && (
						<button
							onClick={handleClose}
							type="button">
							<FontAwesomeIcon
								fixedWidth
								icon="times" />
						</button>
					)}

					{!isOpen && (
						<button
							onClick={handleOpen}
							type="button">
							<FontAwesomeIcon
								fixedWidth
								icon="angle-up" />
						</button>
					)}
				</menu>
			</header>

			<animated.div style={spring}>
				{resizeListener}

				<ul className="channel-list">
					{Object.keys(channels).map(channelName => (
						<li key={channelName}>
							<button
								className={classnames({
									active: (currentChannel === channelName),
								})}
								onClick={handleChannelClick}
								title={channelName}
								type="button"
								value={channelName}>
								{channelName}
							</button>
						</li>
					))}
				</ul>

				<div className="channel">
					<SimulatorChannel
						channelName={currentChannel}
						events={channels[currentChannel]}
						key={currentChannel} />
				</div>

				<SimulatorForm currentChannel={currentChannel} />
			</animated.div>
		</div>
	)
}
