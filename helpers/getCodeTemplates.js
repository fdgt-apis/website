// Module imports
import reduce from 'awaity/reduce'





export const getCodeTemplates = async () => {
	const [
		fs,
		path,
		{ promisify },
	] = await Promise.all([
		import('fs'),
		import('path'),
		import('util'),
	])
	const readdir = promisify(fs.readdir)
	const readFile = promisify(fs.readFile)
	const stat = promisify(fs.stat)

	const getFiles = async directory => {
		const directoryContents = await readdir(directory)

		return reduce(directoryContents, async (accumulator, item) => {
			const filepath = path.resolve(directory, item)
			const fileStats = await stat(filepath)

			if (fileStats.isDirectory()) {
				accumulator[item] = await getFiles(filepath)
			} else if (path.extname(item) === '.md') {
				accumulator[item.replace(/\.md$/iu, '')] = await readFile(filepath, 'utf8')
			}

			return accumulator
		}, {})
	}

	const codeTemplatesPath = path.resolve(process.cwd(), 'docs', 'code-templates')
	const codeTemplates = await getFiles(codeTemplatesPath)

	return {
		props: {
			codeTemplates,
		},
	}
}
