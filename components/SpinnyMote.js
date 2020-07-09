// Module imports
import React, {
	useCallback,
	useState,
} from 'react'
import {
	animated,
	useTransition,
} from 'react-spring'





// Local imports
import Mote from 'public/images/mote.svg'





export const SpinnyMote = () => {
	const [shouldSpin, setShouldSpin] = useState(false)

	const centerTransition = useTransition(true, null, {
		// enter: item => [{
		// 	opacity: item.opacity,
		// 	height: item.height,
		// }],
		update: item => async next => {
			await next({ transform: 'scale(0.5)' })
		},
		from: {
			transform: 'scale(1)',
		}
	})

	const handleClick = useCallback(() => {
		if (!shouldSpin) {
			setShouldSpin(true)
		}
	}, [setShouldSpin])

	if (shouldSpin) {
		return (
			<div className="mote-wrapper spinny-mote">
				{centerTransition.map(({ item, key, props }) => (
					<animated.div
						className="mote-wrapper"
						key={key}
						style={props}>
						<Mote />
					</animated.div>
				))}
			</div>
		)
	}

	return (
		<div
			className="mote-wrapper"
			onClick={handleClick}>
			<div>
				<Mote />
			</div>
		</div>
	)
}
