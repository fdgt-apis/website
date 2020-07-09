// Module imports
import React, {
	useCallback,
	useRef,
} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'





// Local imports
import { FDGT } from 'components/FDGT'
import { SpinnyMote } from 'components/SpinnyMote'





export const Hero = () => (
	<section className="hero">
		<SpinnyMote />

		<div className="call-to-action">
			<h2><FDGT /></h2>

			<p><FDGT /> is designed to make the life of Twitch Developers easier. From building Twitch bots, to designing overlays, to developing extensions, we provide the tools you need to build amazing things on Twitch &mdash; without breaking the bank.</p>

			<Link
				as="/docs/getting-started"
				href="/docs/[...doc]">
				<a className="button">
					Get Started

					<FontAwesomeIcon
						fixedWidth
						icon="chevron-right" />
				</a>
			</Link>
		</div>
	</section>
)
