// Module imports
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { useMemo } from 'react'





/**
 * A wrapper for safely creating buttons.
 *
 * @param {object} props All component props.
 * @param {*} [props.children] Node to be rendered inside of the button.
 * @param {string} [props.className] A string of classes to be set on the button.
 * @param {boolean} [props.isDisabled = false] Whether or not this button is disabled.
 * @param {boolean} [props.isSubmit = false] Whether or not this button should submit forms.
 * @param {Function} [props.onClick] The function to be executed when this button is clicked.
 */
export function Button(props) {
	const {
		children,
		className,
		isDisabled,
		isSubmit,
		onClick,
	} = props

	const compiledClassName = useMemo(() => {
		return classnames(className, {
			// 'is-primary': isPrimary,
			// 'is-small': isSmall,
			// 'is-text': isText,
		})
	}, [
		className,
		// isPrimary,
		// isSmall,
		// isText,
	])

	const ariaAndDataProps = useMemo(() => {
		return Object.entries(props).reduce((accumulator, [key, value]) => {
			if (key.startsWith('aria-') || key.startsWith('data-')) {
				accumulator[key] = value
			}

			return accumulator
		}, {})
	}, [props])

	return (
		<button
			className={compiledClassName}
			disabled={isDisabled}
			onClick={onClick}
			type={isSubmit ? 'button' : 'submit'}
			{...ariaAndDataProps}>
			{children}
		</button>
	)
}

Button.defaultProps = {
	children: null,
	className: '',
	isDisabled: false,
	isSubmit: false,
	// eslint-disable-next-line jsdoc/require-jsdoc
	onClick: () => {},
}

Button.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	isDisabled: PropTypes.bool,
	isSubmit: PropTypes.bool,
	onClick: PropTypes.func,
}
