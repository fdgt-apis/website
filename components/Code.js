// Module imports
import React, {
	useContext,
  useEffect,
  useRef,
	useState,
} from 'react'
import classnames from 'classnames'
import Prism from 'prismjs'
import PropTypes from 'prop-types'





// Local imports
import { ExampleModeContext } from 'context/ExampleModeContext'





const renderToken = (token, index) => {
	if (typeof token === 'string') {
		return token
	}

	return (
		<span
			className={classnames('token', token.type)}
			key={index}>
			{Array.isArray(token.content) && token.content.map(renderToken)}
			{!Array.isArray(token.content) && token.content.toString()}
		</span>
	)
}

const renderTokens = tokens => {
	const lines = tokens.reduce((accumulator, token, index) => {
		const addLine = () => accumulator.push([])
		const addToken = token => accumulator[accumulator.length - 1].push(token)

		if (/\n/.test(token)) {
			if (/[^\n]/.test(token)) {
				token.split('\n').forEach((item, itemIndex) => {
					if (item) {
						addToken(item, `${index}-${itemIndex}`)
					} else {
						addLine()
					}
				})
			} else {
				addLine()
			}
		} else {
			addToken(token, index)
		}

		return accumulator
	}, [[]])

	return lines.map((line, index) => (
		<div key={index}>
			{Boolean(line.length) && line.map(renderToken)}
			{!line.length && <span>&nbsp;</span>}
		</div>
	))
}





export const Code = props => {
	const {
		language,
    value,
	} = props
	const {
		currentExampleMode,
		exampleModes,
		setCurrentExampleMode,
	} = useContext(ExampleModeContext)
	let grammar = null
	let tokens = []

	if (typeof window !== 'undefined') {
		grammar = Prism.languages[language]
		tokens = Prism.tokenize(value.replace(/(?:^\n+|\n+$)/gu, ''), grammar)
	}

  return (
		<div className="example-wrapper">
			<menu type="toolbar">
				<ul>
					{exampleModes.map(exampleMode => (
						<li>
							<button
								className={classnames({ active: currentExampleMode === exampleMode })}
								onClick={() => setCurrentExampleMode(exampleMode)}
								type="button">
								{exampleMode}
							</button>
						</li>
					))}
				</ul>

				<ol className="meta">
					<li className="language">
						{['javascript', 'js'].includes(language) && 'JavaScript'}
						{['cs', 'csharp', 'dotnet'].includes(language) && 'C#'}
					</li>
				</ol>
			</menu>

			<pre className={`line-numbers language-${language}`}>
				<code className={`language-${language}`}>
					{renderTokens(tokens)}
				</code>
			</pre>
		</div>
  )
}

Code.propTypes = {
  value: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
}
