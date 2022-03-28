// Module imports
import { NextSeo as NextSEO } from 'next-seo'
import React from 'react'





// Local imports
import { FDGT } from 'components/FDGT'
import { getCommands } from 'helpers/getCommands'
import { Hero } from 'components/Hero'
import { PageWrapper } from 'components/PageWrapper'
import Mote from 'public/images/mote.svg'





export default function HomePage(props) {
	return (
		<PageWrapper {...props}>
			<NextSEO
				description="Building things for Twitch shouldn't empty your wallet. Use FDGT to build your apps and overlays without spending a dime."
				title="Home" />

			<Hero />

			<section>
				<h2>What is <FDGT />?</h2>

				<p><FDGT /> is a drop-in replacement for Twitch IRC. You can connect your overlays, Twitch bots, and other tools to <FDGT /> and test them with simulated events!</p>

				<h2>Why does <FDGT /> exist?</h2>

				<p>Put simply, <FDGT /> is here to help developers simulate Twitch APIs <em>without spending their own cash</em>. It shouldn't cost $25 every time you want to test how your overlay handles tier 3 subscriptions. It shouldn't cost $126 when you want to test your extension's 10,000 bit reward. It should be <em>free</em>.</p>

				<h2>How do I use <FDGT />?</h2>

				<p>Using <FDGT /> is pretty simple. Instead of pointing to <code>irc.twitch.tv</code>, point your code to <code>irc.fdgt.dev</code>. Seriously, <em>it's that easy</em>.</p>

				<p>One of the hardest parts of working with Twitch IRC is that to test your tool with different payloads, you have to perform the real action that would trigger that event.</p>
			</section>
		</PageWrapper>
	)
}

export function getStaticProps(...args) {
	return getCommands(...args)
}
