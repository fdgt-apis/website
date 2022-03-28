// Module imports
import React, {
	Fragment,
} from 'react'
import { NextSeo as NextSEO } from 'next-seo'
import classnames from 'classnames'





// Local imports
import { ProfileGrid } from 'components/ProfileGrid'
import { ExternalLink } from 'components/ExternalLink'
import { FDGT } from 'components/FDGT'
import { getAllContributorsEmoji } from 'helpers/getAllContributorsEmoji'
import { getCommands } from 'helpers/getCommands'
import { getContributors } from 'helpers/getContributors'
import { getSponsors } from 'helpers/getSponsors'
import { PageWrapper } from 'components/PageWrapper'





export default function AboutPage(props) {
	const {
		contributors,
		sponsors,
		sponsorshipTiers,
	} = props

	return (
		<PageWrapper {...props}>
			<NextSEO
				description="FDGT was built by developers, for developers. These are those developers!"
				title="About" />

			<section>
				<h2>About</h2>

				<p><FDGT /> is a mock API built as a drop-in replacement for the Twitch IRC API. It allows developers to test events from the Twitch API <strong>without</strong> having to spend their money.</p>

				<p>As both a livestreamer and a programmer, I originally built <FDGT /> for myself so that I could build my stream overlay without spending all of my cash to test stuff. As I built it out, though, I realized that <FDGT /> was a tool that the community had been dreaming about for years...</p>

				<h3>Why does <FDGT /> exist?</h3>

				<p>Twitch is an amazing platform for content and community, and they provide a lot of APIs to make it easier for folx like myself to create <em>really cool things</em>. What they don't provide is any sort of testing apparatus which would allow us to test those <em>really cool things</em>. That means that to build <em>really cool things</em>, we usually have to spend our own cash.</p>

				<p>While I get that Twitch is a company and needs to make money, it shouldn't be gouging the developers that are investing their time to make the platform <em>even more cool</em>.</p>

				<p>This is why <FDGT /> exists. It's here to allow developers using the Twitch platform to make awesome things without having to empty their wallet.</p>
			</section>

			<section>
				<h2>Halp!</h2>

				<p>Need some help using <FDGT />? No problem! Hop on to the <ExternalLink href="https://discord.gg/k3bth3f">Trezy Studios Discord</ExternalLink> and we'll be happy to help! <span role="img" title="Heart emoji">❤️</span></p>
			</section>

			<section>
				<h2>Support</h2>

				<p>Want to help support the development and maintenance of <FDGT />? <ExternalLink href="https://discord.gg/k3bth3f">Sponsor Trezy on Github</ExternalLink>!</p>

				{Boolean(Object.values(sponsors).length) && (
					<>
						<h3>Sponsors</h3>

						<p>These are the <strong>amazing</strong> folx that are helping financially support the <FDGT /> project!</p>

						{Object.values(sponsorshipTiers).reverse().map(sponsorshipTier => {
							if (!sponsorshipTier.sponsors.length) {
								return null
							}

							return (
								<Fragment key={sponsorshipTier.id}>
									<h4>{sponsorshipTier.name}</h4>

									<ProfileGrid profiles={sponsorshipTier.sponsors.map(sponsorID => sponsors[sponsorID].attributes)} />
								</Fragment>
							)
						})}
					</>
				)}

				<h3>Contributors</h3>

				<p>Meet the wonderful people that build and maintain <FDGT /> for the community!</p>

				<ProfileGrid profiles={contributors} />
			</section>
		</PageWrapper>
	)
}

AboutPage.getInitialProps = async () => {
	const [
		{ props: commandsProps },
		{ props: contributorProps },
		{ props: sponsorProps },
	] = await Promise.all([
		getCommands(),
		getContributors(),
		getSponsors(),
	])

	return {
		...commandsProps,
		...contributorProps,
		...sponsorProps,
	}
}
