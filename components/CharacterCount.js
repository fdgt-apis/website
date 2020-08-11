// Module imports
import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'





const CharacterCount = props => {
  const {
    maxLength,
    value,
  } = props

  const isAllGood = value.length < (maxLength * 0.75)
  const isInWarningZone = (value.length >= (maxLength * 0.75)) && (value.length < maxLength)
  const isInDangerZone = value.length >= maxLength

  return (
    <span
      className={classnames({
        'character-count': true,
        'text-primary': isAllGood,
        'text-warning': isInWarningZone,
        'text-danger': isInDangerZone,
      })}
      hidden={!value}>

      <span
        className="characters-remaining"
        hidden={isAllGood}>
        {maxLength - value.length}
      </span>
    </span>
  )
}

CharacterCount.defaultProps = {
  maxLength: null,
}

CharacterCount.propTypes = {
  maxLength: PropTypes.number,
  value: PropTypes.string.isRequired,
}





export { CharacterCount }
