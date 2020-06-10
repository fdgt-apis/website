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





export const getStaticPaths = async () => {
	const [
		fs,
		path,
	] = await Promise.all([
		import('fs'),
		import('path'),
	])

	const dataMocksPath = path.resolve(process.cwd(), 'node_modules', '@fdgt/api', 'src', 'data-mocks')
	const dataMockFilenames = fs.readdirSync(dataMocksPath)

	return {
		fallback: false,
		paths: dataMockFilenames.map(filename => ({
			params: {
				command: filename.replace(path.extname(filename), ''),
			},
		})),
	}
}





export const getStaticProps = async initialProps => {
	const { params } = initialProps
	const [
		{ default: frontmatter },
		fs,
		path,
		{ promisify },
		{ default: jsdoc2md },
	] = await Promise.all([
		import('frontmatter'),
		import('fs'),
		import('path'),
		import('util'),
		import('jsdoc-to-markdown'),
	])
	const readdir = promisify(fs.readdir)

	const dataMocksPath = path.resolve(process.cwd(), 'node_modules', '@fdgt/api', 'src', 'data-mocks')
	const dataMockFilenames = await readdir(dataMocksPath)
	const commands = dataMockFilenames.map(filename => filename.replace(path.extname(filename), ''))
	const jsdocHelpersPath = path.resolve(process.cwd(), 'helpers', 'jsdocHelpers')
	const jsdocPartialsPath = path.resolve(process.cwd(), 'helpers', 'jsdocPartials')

	const [
		{ props: codeTemplateProps },
		{ props: exampleModeProps },
		doc,
	] = await Promise.all([
		getCodeTemplates(),
		getExampleModes(),
		jsdoc2md.render({
			files: path.resolve(dataMocksPath, `${params.command}.js`),
			'heading-depth': 1,
			helper: [
				path.resolve(jsdocHelpersPath, 'firstLine.js'),
			],
			partial: [
				path.resolve(jsdocPartialsPath, 'docs.hbs'),
				path.resolve(jsdocPartialsPath, 'examples.hbs'),
				path.resolve(jsdocPartialsPath, 'params.hbs'),
			],
		}),
	])

	const {
		data,
		content,
	} = frontmatter(doc)

	return {
		props: {
			...codeTemplateProps,
			...exampleModeProps,
			commands,
			doc: content,
			meta: data,
		},
	}
}
