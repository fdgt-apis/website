// Module imports
import PropTypes from 'prop-types'
import React from 'react'





// Local imports
import { FDGT } from 'components/FDGT'
import Mote from 'public/images/mote.svg'





export const Brand = props => (
	<span className="brand">
		<span style={{ fontSize: `${props.scale}em` }}>
			<Mote />
			<FDGT />
		</span>
	</span>
)

Brand.defaultProps = {
	scale: 1,
}

Brand.propTypes = {
	scale: PropTypes.number,
}
