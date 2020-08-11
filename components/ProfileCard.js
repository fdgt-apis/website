// Module imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames'
import React from 'react'





// Local imports
import { Card } from 'components/Card'
import { ExternalLink } from 'components/ExternalLink'
import { getAllContributorsEmoji } from 'helpers/getAllContributorsEmoji'





export const ProfileCard = ({ profile }) => {
	const {
		bio,
		contributions,
		login,
		name,
		profile: profileURL,
		twitter,
		url,
		websiteUrl: websiteURL,
	} = profile
	const avatarURL = profile.avatar_url || profile.avatarUrl
	const twitterUsername = profile.twitterUsername || profile.twitter

	const rows = [
		// avatar
		{
			icon: null,
			value: <img src={avatarURL} />,
		},

		// name
		{
			icon: 'user',
			value: name || login,
		},

		// github
		{
			icon: ['fab', 'github'],
			value: (
				<ExternalLink href={websiteURL || url || profileURL}>
					{login}
				</ExternalLink>
			),
		},
	]

	if (twitterUsername) {
		rows.push({
			icon: ['fab', 'twitter'],
			value: (
				<ExternalLink href={`https://twitter.com/${twitterUsername}`}>
					@{twitterUsername}
				</ExternalLink>
			),
		})
	}

	if (contributions?.length) {
		rows.push({
			icon: 'gifts',
			value: (
				<ul className="contributions">
					{contributions.map(contribution => (
						<li
							className={classnames('contribution', contribution)}
							key={contribution}>
							<span
								role="img"
								title={contribution}>
								{getAllContributorsEmoji(contribution)}
							</span>
						</li>
					))}
				</ul>
			),
		})
	}

	return (
		<Card
			className="profile"
			rows={rows} />
	)
}
