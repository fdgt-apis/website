// Module imports
import React, {
	useCallback,
  useEffect,
  useState,
} from 'react'
import { NextSeo as NextSEO } from 'next-seo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import Link from 'next/link'





// Local imports
import {
	auth,
	firestore,
} from 'helpers/firebase'
import { Card } from 'components/Card'
import { getCommands } from 'helpers/getCommands'
import { NewAppModal } from 'components/NewAppModal'
import { PageWrapper } from 'components/PageWrapper'
import { useFirebaseAuthentication } from 'hooks/useFirebaseAuthentication'
import { useRequireAuthentication } from 'hooks/useRequireAuthentication'





const LoginPage = props => {
	const [apps, setApps] = useState({})
	const [newAppModalIsOpen, setNewAppModalIsOpen] = useState(false)

	const appEntries = Object.entries(apps)

	useRequireAuthentication()
	const user = useFirebaseAuthentication()

	const handleAppsSnapshot = useCallback(snapshot => {
		setApps(oldApps => {
			snapshot.docChanges().forEach(change => {
				const {
					doc,
					type,
				} = change

				if (['added', 'modified'].includes(change.type)) {
					oldApps[doc.id] = doc.data()
				}

				if (change.type === 'removed') {
					delete oldApps[doc.id]
				}
			})

			return { ...oldApps }
		})
	}, [setApps])

	const handleNewAppModalSubmit = useCallback(() => setNewAppModalIsOpen(false), [setNewAppModalIsOpen])

	const handleNewAppModalClose = useCallback(() => setNewAppModalIsOpen(false), [setNewAppModalIsOpen])

	const openNewAppModal = useCallback(() => setNewAppModalIsOpen(true), [setNewAppModalIsOpen])

	useEffect(() => {
		if (user) {
			const collection = firestore.collection('apps')
			const query = collection.where('ownerID', '==', user.uid)
			return query.onSnapshot(handleAppsSnapshot)
		}
	}, [
		handleAppsSnapshot,
		user,
	])

	return (
		<>
			<PageWrapper {...props}>
				<NextSEO
					nofollow
					noindex
					title="Dashboard" />

				<section>
					<h2>Dashboard</h2>

					<h3>Your Apps</h3>

					{!appEntries.length && (
						<p>No apps found.</p>
					)}

					{Boolean(appEntries.length) && (
						<ul className="horizontal-grid two-column">
							{appEntries.map(([appID, appData]) => {
								const rows = [
									{
										icon: 'rocket',
										value: appData.name,
									},

									{
										icon: 'info-circle',
										value: appData.description || (
											<span className="text-muted">No description</span>
										),
									},

									{
										icon: 'link',
										value: (
											<ul className="bulleted">
												<li>
													<Link
														as={`/dashboard/app/${appID}`}
														href={`/dashboard/app?id=${appID}`}>
														<a>App Dashboard</a>
													</Link>
												</li>
											</ul>
										),
									},
								]

								return (
									<li key={appID}>
										<Card rows={rows} />
									</li>
								)
							})}
						</ul>
					)}

					<menu type="toolbar">
						<button
							className="primary"
							onClick={openNewAppModal}
							type="button">
							<FontAwesomeIcon
								fixedWidth
								icon="plus" />
							New App
						</button>
					</menu>
				</section>
			</PageWrapper>

			<NewAppModal
				isOpen={newAppModalIsOpen}
				onClose={handleNewAppModalClose}
				onSubmit={handleNewAppModalSubmit} />
		</>
	)
}

export const getStaticProps = getCommands





export default LoginPage
