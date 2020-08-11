// Module imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'





const Card = props => {
	const {
		className,
		rows,
	} = props

	return (
		<table className={classnames(className, 'card')}>
			<tbody>
				{rows.map((row, index) => (
					<tr key={index}>
						<th>
							{Boolean(row.icon) && (
								<FontAwesomeIcon
									fixedWidth
									icon={row.icon} />
							)}
						</th>

						<td>{row.value}</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

Card.defaultProps = {
	className: '',
}

Card.propTypes = {
	className: PropTypes.string,
	rows: PropTypes.array.isRequired,
}

export { Card }
