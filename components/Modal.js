// Module imports
import React, {
	useCallback,
	useEffect,
} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'





export const Modal = props => {
	const {
		children,
		isOpen,
		onClose,
		title,
	} = props

	const handleKeyUp = useCallback(event => {
		if (event.code === 'Escape') {
			onClose()
		}
	}, [onClose])

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('keyup', handleKeyUp)
		} else {
			document.removeEventListener('keyup', handleKeyUp)
		}

		return () => document.removeEventListener('keyup', handleKeyUp)
	}, [isOpen])

	if (!isOpen) {
		return null
	}

	return (
		<div className="modal-wrapper">
			<div className="modal panel">
				<header>
					<h2>{title}</h2>

					<button
						onClick={onClose}
						type="button">
						<FontAwesomeIcon
							fixedWidth
							icon="times" />
					</button>
				</header>

				<div className="panel-content">
					{children}
				</div>
			</div>
		</div>
	)
}

Modal.defaultProps = {
	onClose: () => {},
}

Modal.propTypes = {
	children: PropTypes.node.isRequired,
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func,
	title: PropTypes.string.isRequired,
}
