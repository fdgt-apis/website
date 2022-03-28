// Module imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames'
import React from 'react'





// Local imports
import { ExternalLink } from 'components/ExternalLink'
import { getAllContributorsEmoji } from 'helpers/getAllContributorsEmoji'





export function ProfileCard(props) {
	const { profile } = props
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

	return (
		<table className="profile-card">
			<tbody>
				<tr>
					<th></th>

					<td className="avatar">
						<img src={avatarURL} />
					</td>
				</tr>

				<tr>
					<th>
						<FontAwesomeIcon
							fixedWidth
							icon="user" />
					</th>

					<td>{name || login}</td>
				</tr>

				<tr>
					<th>
						<FontAwesomeIcon
							fixedWidth
							icon={['fab', 'github']} />
					</th>

					<td>
						<ExternalLink href={websiteURL || url || profileURL}>
							{login}
						</ExternalLink>
					</td>
				</tr>

				{Boolean(twitterUsername) && (
					<tr>
						<th>
							<FontAwesomeIcon
								fixedWidth
								icon={['fab', 'twitter']} />
						</th>

						<td>
							<ExternalLink href={`https://twitter.com/${twitterUsername}`}>
								@{twitterUsername}
							</ExternalLink>
						</td>
					</tr>
				)}

				{Boolean(contributions?.length) && (
					<tr>
						<th>
							<FontAwesomeIcon
								fixedWidth
								icon="gifts" />
						</th>

						<td>
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
						</td>
					</tr>
				)}
			</tbody>
		</table>
	)
}
