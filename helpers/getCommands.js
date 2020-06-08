export const getCommands = async () => {
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

	const dataMocksPath = path.resolve(process.cwd(), 'node_modules', '@fdgt/api', 'src', 'data-mocks')
	const dataMockFilenames = await readdir(dataMocksPath)
	const commands = dataMockFilenames.map(filename => filename.replace(path.extname(filename), ''))

	return {
		props: {
			commands,
		},
	}
}
