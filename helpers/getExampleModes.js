export const getExampleModes = async () => {
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

	const codeTemplatesPath = path.resolve(process.cwd(), 'docs', 'code-templates')
	const exampleModes = await readdir(codeTemplatesPath)

	exampleModes.sort((a, b) => {
		const aX = a.toLowerCase()
		const bX = b.toLowerCase()

		if (aX > bX) {
			return 1
		}

		if (aX < bX) {
			return -1
		}

		return 0
	})

	return {
		props: {
			exampleModes,
		},
	}
}
