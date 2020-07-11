// Module imports
import React, {
	useCallback,
	useEffect,
	useState,
} from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import tmi from 'tmi.js'





// Local imports
import { useTMIEvent } from 'hooks/useTMIEvent'





// Local constants
const client = new tmi.Client({
	channels: [ 'fdgt' ],
	connection: {
		server: 'irc.fdgt.dev',
	},
	identity: {
		username: 'fdgt-test',
		password: 'oauth:definitely-a-token'
	},
})
const SimulatorContext = React.createContext({
	isConnecting: false,
	isConnected: false,
	channels: {},
	joinChannel: () => {},
	partChannel: () => {},
	sendMessage: () => {},
})





const SimulatorContextProvider = props => {
	const { children } = props

	const [channels, setChannels] = useState({})
	const [isConnecting, setIsConnecting] = useState(false)
	const [isConnected, setIsConnected] = useState(false)

	const joinChannel = useCallback(() => {}, [])
	const partChannel = useCallback(() => {}, [])
	const sendMessage = useCallback((channel, message) => client.say(channel, message), [])

	const addEvent = useCallback((channelName, event) => {
		setChannels(oldChannels => {
			const events = oldChannels[channelName]

			return {
				...oldChannels,
				[channelName]: [
					...events,
					event,
				],
			}
		})
	}, [setChannels])

	const handleConnected = useCallback(() => {
		setIsConnected(true)
		setIsConnecting(false)
	}, [
		setIsConnected,
		setIsConnecting,
	])
	const handleConnecting = useCallback(() => {
		setIsConnected(false)
		setIsConnecting(true)
	}, [
		setIsConnected,
		setIsConnecting,
	])
	const handleJoin = useCallback((channelName, username, self) => {
		if (self) {
			setChannels(oldChannels => ({
				...oldChannels,
				[channelName]: [],
			}))
		}
	}, [setChannels])
	const handleMessage = useCallback((channelName, userstate, message, self) => {
		const ts = self ? undefined : parseInt(userstate['tmi-sent-ts'], 10)

		addEvent(channelName, {
			message,
			timestamp: moment(ts).format('HH:mm'),
			ts,
			type: 'message',
			user: {
				color: userstate.color,
				name: userstate['display-name'],
			},
		})
	}, [addEvent])
	const handleSubscription = useCallback((channelName, username, method, message, userstate) => {
		const ts = parseInt(userstate['tmi-sent-ts'], 10)

		addEvent(channelName, {
			method,
			timestamp: moment(ts).format('HH:mm'),
			ts,
			type: 'subscription',
			user: {
				color: userstate.color,
				name: userstate['display-name'],
			},
		})
	}, [addEvent])

	useTMIEvent(client, 'connecting', handleConnecting)
	useTMIEvent(client, 'connected', handleConnected)
	useTMIEvent(client, 'join', handleJoin)
	useTMIEvent(client, 'message', handleMessage)
	useTMIEvent(client, 'subscription', handleSubscription)

	useEffect(() => {
		client.connect()

		return () => client.disconnect()
	}, [])

	return (
		<SimulatorContext.Provider
			value={{
				channels,
				isConnecting,
				isConnected,
				joinChannel,
				partChannel,
				sendMessage,
			}}>
			{children}
		</SimulatorContext.Provider>
	)
}

SimulatorContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
}

export {
	SimulatorContext,
	SimulatorContextProvider,
}
