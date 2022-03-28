// Module imports
import React, {
	useContext,
} from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'





// Local imports
import { ExampleModeContext } from 'context/ExampleModeContext'
import { Code } from 'components/Code'
import markdownConfig from 'helpers/reactMarkdownConfig'





export function Shortcode(props) {
	const {
		attributes,
		children,
		identifier,
	} = props
	const {
		codeTemplates,
		currentExampleMode,
	} = useContext(ExampleModeContext)

	const shortcodes = {
		codetemplate: codeTemplateProps => {
			const {
				template: templateName,
			} = codeTemplateProps

			let template = codeTemplates[currentExampleMode]?.[templateName]

			if (!template) {
				return null
			}

			template = template.replace(/\{\{(\w+)\}\}/gu, (match, variableName) => {
				return codeTemplateProps[variableName]
			})

			return (
				<ReactMarkdown
					{...markdownConfig}
					escapeHtml={false}
					source={template} />
			)
		},
	}

	const ShortcodeComponent = shortcodes[identifier.toLowerCase()] || (() => null)

	return (
		<ShortcodeComponent {...attributes}>
			{children}
		</ShortcodeComponent>
	)
}

Shortcode.defaultProps = {
	children: null,
}

Shortcode.propTypes = {
	attributes: PropTypes.object.isRequired,
	children: PropTypes.node,
	identifier: PropTypes.string.isRequired,
}
