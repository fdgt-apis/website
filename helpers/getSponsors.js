export async function getSponsors() {
	const {
		data: sponsors,
		included,
	} = await fetch('https://api.fdgt.dev/fdgt/v1/sponsors').then(response => response.json())

	const sponsorshipTiers = included.reduce((accumulator, sponsorshipTier) => {
		accumulator[sponsorshipTier.id] = {
			...sponsorshipTier.attributes,
			sponsors: [],
		}
		return accumulator
	}, {})

	Object.values(sponsors).forEach(sponsor => {
		sponsorshipTiers[sponsor.relationships.tier.data.id].sponsors.push(sponsor.id)
	})

	return {
		props: {
			sponsors,
			sponsorshipTiers,
		},
	}
}
