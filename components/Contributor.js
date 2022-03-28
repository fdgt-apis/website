// Module imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames'
import React from 'react'





// Local imports
import { ExternalLink } from 'components/ExternalLink'
import { getAllContributorsEmoji } from 'helpers/getAllContributorsEmoji'





export function Contributor(props) {
	const { contributor } = props
	const {
		avatar_url: avatarURL,
		contributions,
		login,
		name,
		profile,
		twitter,
	} = contributor

	return (
		<table className="contributor">
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

					<td>{name}</td>
				</tr>

				<tr>
					<th>
						<FontAwesomeIcon
							fixedWidth
							icon={['fab', 'github']} />
					</th>

					<td>
						<ExternalLink href={profile}>
							{login}
						</ExternalLink>
					</td>
				</tr>

				{Boolean(twitter) && (
					<tr>
						<th>
							<FontAwesomeIcon
								fixedWidth
								icon={['fab', 'twitter']} />
						</th>

						<td>
							<ExternalLink href={`https://twitter.com/${twitter}`}>
								@{twitter}
							</ExternalLink>
						</td>
					</tr>
				)}

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
			</tbody>
		</table>
	)
}
