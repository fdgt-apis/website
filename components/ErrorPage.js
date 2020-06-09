// Module imports
import React from 'react'





// Local imports
import Mote from 'public/images/mote.svg'





// Local constants
const statusMessages = {
	404: 'Probably Gone Forever',
	500: 'Ah crap.',
}





export const ErrorPage = props => {
	const {
		statusCode = 500,
	} = props

	return (
		<section>
			<h2><code>{statusCode}</code> {statusMessages[statusCode]}</h2>

			{(statusCode === 404) && (
				<>
					<p>I swear that page was around here somewhere.</p>
					<p>We'll send Mote to look for it and... uh... I guess we'll let you know if it turns up?</p>
					<Mote
						data-action="search"
						style={{
							fontSize: '10em',
							width: '100%',
						}} />
				</>
			)}

			{(statusCode !== 404) && (
				<>
					<Mote
						data-emotion="sad"
						style={{
							float: 'left',
							fontSize: '10em',
						}} />
					<p>Welp, we've gone and messed up. Something is <em>very</em> broken.</p>
					<p>We'll have Mote take a look at it. Mote's not exactly an engineer, though, so don't be surprised when everything comes toppling down.</p>
				</>
			)}
		</section>
	)
}
