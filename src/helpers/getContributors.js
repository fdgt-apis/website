export async function getContributors() {
	const { data } = await fetch('https://api.fdgt.dev/fdgt/v1/contributors').then(response => response.json())

	return {
		props: {
			contributors: data,
		},
	}
}
