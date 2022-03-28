export async function getCommands() {
	const { data } = await fetch('https://api.fdgt.dev/fdgt/v1/commands').then(response => response.json())

	return {
		props: {
			commands: data,
		},
	}
}
