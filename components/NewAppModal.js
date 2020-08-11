// Module imports
import React, {
	useCallback,
	useState,
} from 'react'
import PropTypes from 'prop-types'





// Local imports
import {
	auth,
	firestore,
} from 'helpers/firebase'
import { Input } from 'components/Input'
import { Modal } from 'components/Modal'





const NewAppModal = props => {
	const {
		isOpen,
		onClose,
		onSubmit,
	} = props
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [appDescription, setAppDescription] = useState('')
	const [appName, setAppName] = useState('')

	const handleAppDescriptionChange = useCallback(event => setAppDescription(event.target.value), [setAppDescription])
	const handleAppNameChange = useCallback(event => setAppName(event.target.value), [setAppName])

	const handleSubmit = useCallback(async event => {
		event.preventDefault()

		const collection = firestore.collection('apps')

		setIsSubmitting(true)

		try {
			await collection.add({
				description: appDescription,
				name: appName,
				ownerID: auth.currentUser.uid,
			})

			onSubmit()
			setAppDescription('')
			setAppName('')
			setIsSubmitting(false)
		} catch (error) {
			setIsSubmitting(false)
		}
	}, [
		appDescription,
		appName,
		setAppDescription,
		setAppName,
	])

	return (
		<Modal
			onClose={onClose}
			isOpen={isOpen}
			title="Create App">
			<p>Creating an app allows you to track your logs and requests in your dashboard!</p>

			<form onSubmit={handleSubmit}>
				<Input
					id="new-app::app-name"
					label="App Name"
					onChange={handleAppNameChange}
					placeholder="My Bot"
					required
					value={appName} />

				<Input
					id="new-app::app-description"
					label="App Description"
					multiline
					onChange={handleAppDescriptionChange}
					placeholder="This is for the bot that handles my Twitch channel commands!"
					value={appDescription} />

				<footer>
					<menu type="toolbar">
						<ul>
							<li>
								<button
									disabled={isSubmitting}
									type="submit">
									Create App
								</button>
							</li>
						</ul>
					</menu>
				</footer>
			</form>
		</Modal>
	)
}

NewAppModal.defaultProps = {
	onClose: () => {},
	onSubmit: () => {},
}

NewAppModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func,
	onSubmit: PropTypes.func,
}





export { NewAppModal }
