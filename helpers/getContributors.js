export const getContributors = async () => {
	const [
		fs,
		path,
		{ promisify },
	] = await Promise.all([
		import('fs'),
		import('path'),
		import('util')
	])
	const readFile = promisify(fs.readFile)

	const contributorsPath = path.resolve(process.cwd(), 'node_modules', '@fdgt/api', '.all-contributorsrc')
	const allContributorsFile = await readFile(contributorsPath, 'utf8')
	const { contributors } = JSON.parse(allContributorsFile)

	await Promise.all(contributors.map(async contributor => {
		const profile = await fetch(`https://api.github.com/users/${contributor.login}`, {
			headers: {
				Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
			},
		})
		const profileJSON = await profile.json()

		contributor.twitter = profileJSON.twitter_username
	}))

	return {
		props: {
			contributors,
		},
	}
}
