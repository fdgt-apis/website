// Module imports
import React from 'react'





// Local imports
import { ProfileCard } from 'components/ProfileCard'
import { FDGT } from 'components/FDGT'





export const ProfileGrid = props => {
	const { profiles } = props

	return (
		<ul className="profile-grid">
			{profiles.map(profile => (
				<li key={profile.login}>
					<ProfileCard profile={profile} />
				</li>
			))}
		</ul>
	)
}
