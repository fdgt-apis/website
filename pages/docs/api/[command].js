// Module imports
import React, {
	useContext,
} from 'react'
import { NextSeo as NextSEO } from 'next-seo'
import ReactMarkdown from 'react-markdown'





// Local imports
import { DocsSubnav } from 'components/DocsSubnav'
import { ExampleModeContext } from 'context/ExampleModeContext'
import { getCodeTemplates } from 'helpers/getCodeTemplates'
import { getCommands } from 'helpers/getCommands'
import { getExampleModes } from 'helpers/getExampleModes'
import { PageWrapper } from 'components/PageWrapper'
import { stripMarkdown } from 'helpers/stripMarkdown'
import markdownConfig from 'helpers/reactMarkdownConfig'





export default props => {
	const {
		setCodeTemplates,
		setExampleModes,
	} = useContext(ExampleModeContext)
	const {
		codeTemplates,
		commands,
		doc,
		exampleModes,
		meta,
	} = props

	setCodeTemplates(codeTemplates)
	setExampleModes(exampleModes)

	return (
		<PageWrapper {...props}>
			<NextSEO
				description={stripMarkdown(meta.description)}
				title={`${stripMarkdown(meta.title)} event`} />

			<section>
				{!doc && (
					'This command has not yet been documented.'
				)}

				{Boolean(doc) && (
					<ReactMarkdown
						{...markdownConfig}
						escapeHtml={false}
						source={doc} />
				)}
			</section>
		</PageWrapper>
	)
}





export const getStaticPaths = async initialProps => {
	const { data } = await fetch('https://api.fdgt.dev/fdgt/v1/commands').then(response => response.json())

	return {
		fallback: false,
		paths: data.map(command => ({
			params: {
				command,
			},
		})),
	}
}





export const getStaticProps = async initialProps => {
	const { params } = initialProps

	const [
		{ props: codeTemplateProps },
		{ props: commands },
		{ props: exampleModeProps },
		{ data },
	] = await Promise.all([
		getCodeTemplates(),
		getCommands(),
		getExampleModes(),
		fetch(`https://api.fdgt.dev/fdgt/v1/commands/${params.command}`).then(response => response.json()),
	])

	return {
		props: {
			...codeTemplateProps,
			...commands,
			...exampleModeProps,
			doc: data.content,
			meta: {
				description: data.description || '',
				title: data.title || '',
			},
		},
	}
}
