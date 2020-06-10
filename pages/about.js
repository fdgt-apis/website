// Module imports
import { NextSeo as NextSEO } from 'next-seo'
import classnames from 'classnames'
import React from 'react'





// Local imports
import { Contributors } from 'components/Contributors'
import { ExternalLink } from 'components/ExternalLink'
import { getCommands } from 'helpers/getCommands'
import { getContributors } from 'helpers/getContributors'
import { getAllContributorsEmoji } from 'helpers/getAllContributorsEmoji'
import { FDGT } from 'components/FDGT'
import { PageWrapper } from 'components/PageWrapper'





export default props => {
	const { contributors } = props

	return (
		<PageWrapper {...props}>
			<NextSEO
				description="FDGT was built by developers, for developers. These are those developers!"
				title="About" />

			<section>
				<h2>About</h2>

				<p><FDGT /> is a mock API built as a drop-in replacement for the Twitch IRC API. It allows developers to test events from the Twitch API <strong>without</strong> having to spend their money.</p>

				<p>As both a livestreamer and a programmer, I originally built <FDGT /> for myself to make development of my stream overlay easier. As I built it out, though, I realized </p>

				<h3>Why does <FDGT /> exist?</h3>

				<p>Twitch is an amazing platform for content and community, and they provide a lot of APIs to make it easier for folx like myself to create <em>really cool things</em>. What they don't provide is any sort of testing apparatus which would allow us to test those <em>really cool things</em>. That means that to build <em>really cool things</em>, we usually have to spend our own cash.</p>

				<p>While I get that Twitch is a company and needs to make money, it shouldn't be gouging the developers that are investing their time to make the platform <em>even more cool</em>.</p>

				<p>This is why <FDGT /> exists. It's here to allow developers using the Twitch platform to make awesome things without having to empty their wallet.</p>
			</section>

			<section>
				<h2>Help &amp; Support</h2>

				<p>Need some help using <FDGT />? No problem! Hop on to the <ExternalLink href="https://discord.gg/k3bth3f">Trezy Studios Discord</ExternalLink> and we'll be happy to help! <span role="img" title="Heart emoji">❤️</span></p>
			</section>

			<section>
				<Contributors contributors={contributors} />
			</section>
		</PageWrapper>
	)
}





export const getStaticProps = async () => {
	const [
		{ props: commandsProps },
		{ props: contributorProps },
	] = await Promise.all([
		getCommands(),
		getContributors(),
	])

	return {
		props: {
			...commandsProps,
			...contributorProps,
		},
	}
}
