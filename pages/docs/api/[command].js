// Module imports
import React, {
	useContext,
} from 'react'
import ReactMarkdown from 'react-markdown'





// Local imports
import { DocsSubnav } from 'components/DocsSubnav'
import { ExampleModeContext } from 'context/ExampleModeContext'
import { getCodeTemplates } from 'helpers/getCodeTemplates'
import { getExampleModes } from 'helpers/getExampleModes'
import { PageWrapper } from 'components/PageWrapper'
import markdownConfig from 'helpers/reactMarkdownConfig'





export default props => {
	const {
		setCodeTemplates,
		setExampleModes,
	} = useContext(ExampleModeContext)
	const {
		codeTemplates,
		commands,
		exampleModes,
		markdownDocument,
	} = props

	setCodeTemplates(codeTemplates)
	setExampleModes(exampleModes)

	return (
		<PageWrapper {...props}>
			<section>
				{!markdownDocument && (
					'This command has not yet been documented.'
				)}

				{Boolean(markdownDocument) && (
					<ReactMarkdown
						{...markdownConfig}
						escapeHtml={false}
						source={markdownDocument} />
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

	const dataMocksPath = path.resolve(process.cwd(), 'node_modules', '@fdgt/api', 'data-mocks')
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
		fs,
		path,
		{ promisify },
		{ default: jsdoc2md },
	] = await Promise.all([
		import('fs'),
		import('path'),
		import('util'),
		import('jsdoc-to-markdown'),
	])
	const readdir = promisify(fs.readdir)

	const dataMocksPath = path.resolve(process.cwd(), 'node_modules', '@fdgt/api', 'data-mocks')
	const dataMockFilenames = await readdir(dataMocksPath)
	const commands = dataMockFilenames.map(filename => filename.replace(path.extname(filename), ''))
	const jsdocPartialsPath = path.resolve(process.cwd(), 'helpers', 'jsdocPartials')

	const [
		{ props: codeTemplateProps },
		{ props: exampleModeProps },
		markdownDocument,
	] = await Promise.all([
		getCodeTemplates(),
		getExampleModes(),
		jsdoc2md.render({
			files: path.resolve(dataMocksPath, `${params.command}.js`),
			'heading-depth': 1,
			partial: [
				path.resolve(jsdocPartialsPath, 'examples.hbs'),
			],
		}),
	])

	return {
		props: {
			...codeTemplateProps,
			...exampleModeProps,
			commands,
			markdownDocument,
		},
	}
}
