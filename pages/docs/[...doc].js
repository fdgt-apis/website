// Module imports
import React, {
	useContext,
} from 'react'
import ReactMarkdown from 'react-markdown'





// Local imports
import { ExampleModeContext } from 'context/ExampleModeContext'
import { getCodeTemplates } from 'helpers/getCodeTemplates'
import { getCommands } from 'helpers/getCommands'
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
		doc,
		exampleModes,
	} = props

	setCodeTemplates(codeTemplates)
	setExampleModes(exampleModes)

	return (
		<PageWrapper {...props}>
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

	const docsPath = path.resolve(process.cwd(), 'docs')
	const docFilenames = fs.readdirSync(docsPath).filter(filename => (path.extname(filename) === '.md'))

	return {
		fallback: false,
		paths: docFilenames.map(filename => ({
			params: {
				doc: [filename.replace(path.extname(filename), '')],
			},
		})),
	}
}





export const getStaticProps = async initialProps => {
	const [
		fs,
		path,
		{ promisify },
	] = await Promise.all([
		import('fs'),
		import('path'),
		import('util'),
	])
	const { params } = initialProps
	const readFile = promisify(fs.readFile)

	const docsPath = path.resolve(process.cwd(), 'docs')
	const docPath = path.resolve(docsPath, `${params.doc.join('/')}.md`)

	const [
		{ props: codeTemplateProps },
		{ props: commandProps },
		{ props: exampleModeProps },
		doc,
	] = await Promise.all([
		getCodeTemplates(),
		getCommands(),
		getExampleModes(initialProps),
		readFile(docPath, 'utf8'),
	])

	return {
		props: {
			...codeTemplateProps,
			...commandProps,
			...exampleModeProps,
			doc,
		},
	}
}
