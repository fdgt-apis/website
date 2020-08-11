// Module imports
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import TextareaAutosize from 'react-autosize-textarea'





// Local imports
import { CharacterCount } from 'components/CharacterCount'





const Input = forwardRef((props, ref) => {
  const {
    allowOverflow,
		error,
		id,
		label,
    maxLength,
    multiline,
    prefix,
    showCharacterCount,
    type,
    value,
  } = props
  const passableProps = {
    ...props,
    ref,
  }
  const [errors, setErrors] = useState([])

  if (allowOverflow) {
    delete passableProps.maxLength
  }

  delete passableProps.allowOverflow
  delete passableProps.error
  delete passableProps.multiline
  delete passableProps.prefix
  delete passableProps.showCharacterCount
  delete passableProps.type

  useEffect(() => {
    if (ref) {
      const checkValidity = () => {
        ref.current.checkValidity()
      }
      const handleInvalid = () => {
        ref.current.setCustomValidity('invalid')
      }

      ref.current.addEventListener('input', checkValidity)
      ref.current.addEventListener('invalid', handleInvalid)

      return () => {
        ref.current.removeEventListener('input', checkValidity)
        ref.current.removeEventListener('invalid', handleInvalid)
      }
    }
  })

  return (
    <div className="input-container">
			{Boolean(label) && (
				<label htmlFor={id}>
					{label}
				</label>
			)}

      {Boolean(prefix) && (
        <span className="prefix">
          {prefix}
        </span>
      )}

      {multiline && (
        <TextareaAutosize {...passableProps} />
      )}

      {!multiline && (
        <input
          {...passableProps}
          type={type} />
      )}

      {Boolean(error) && (
        <span>{error}</span>
      )}

      {(maxLength && showCharacterCount) && (
				<CharacterCount
					maxLength={maxLength}
					value={value} />
      )}
    </div>
  )
})

Input.defaultProps = {
  allowOverflow: false,
  error: '',
  multiline: false,
  prefix: '',
  showCharacterCount: true,
  type: 'text',
}

Input.propTypes = {
  allowOverflow: PropTypes.bool,
  error: PropTypes.string,
  multiline: PropTypes.bool,
  prefix: PropTypes.string,
  showCharacterCount: PropTypes.bool,
  type: PropTypes.string,
}





export { Input }
