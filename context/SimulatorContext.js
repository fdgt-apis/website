// Module imports
import React, {
	useCallback,
	useEffect,
	useState,
} from 'react'
import { parse as parseIRCMessage } from 'irc-message'
import moment from 'moment'
import PropTypes from 'prop-types'





// Local constants
const SimulatorContext = React.createContext({
	isConnecting: false,
	isConnected: false,
	channels: {},
	joinChannel: () => {},
	partChannel: () => {},
	sendMessage: () => {},
})





// Local variables
let socket = null





const SimulatorContextProvider = props => {
	const { children } = props

	const [channels, setChannels] = useState({})
	const [isConnecting, setIsConnecting] = useState(true)
	const [isConnected, setIsConnected] = useState(false)

	const joinChannel = useCallback(channelName => socket.send(`JOIN #${channelName.replace(/^#/, '')}`), [])
	const partChannel = useCallback(channelName => socket.send(`PART #${channelName.replace(/^#/, '')}`), [])

	const addEvent = useCallback((channelName, event) => {
		setChannels(oldChannels => {
			const events = oldChannels[channelName] || []

			return {
				...oldChannels,
				[channelName]: [
					...events,
					event,
				],
			}
		})
	}, [setChannels])

	const handleJoin = useCallback((channelName, username, self) => {
		if (self) {
			setChannels(oldChannels => ({
				...oldChannels,
				[channelName]: [],
			}))
		}
	}, [setChannels])
	const handlePRIVMSG = useCallback(parsedMessage => {
		const {
			params: [
				channelName,
				message,
			],
			prefix,
			tags,
		} = parsedMessage
		const self = prefix.replace(/\w+?!(\w+?)@\w+?\.tmi\.twitch\.tv/, '$1') === 'fdgt-test'
		const timestampMS = self ? undefined : parseInt(tags['tmi-sent-ts'], 10)

		addEvent(channelName, {
			message,
			timestamp: moment(timestampMS).format('HH:mm'),
			timestampMS,
			type: 'message',
			user: {
				color: tags.color,
				name: tags['display-name'],
			},
		})
	}, [addEvent])
	const handleUSERNOTICE = useCallback(parsedMessage => {
		const {
			params: [
				channelName,
				message,
			],
			tags,
		} = parsedMessage
		const timestampMS = parseInt(tags['tmi-sent-ts'], 10)

		addEvent(channelName, {
			details: {
				name: tags['msg-param-sub-plan-name'],
				plan: tags['msg-param-sub-plan'],
			},
			message,
			timestamp: moment(timestampMS).format('HH:mm'),
			timestampMS,
			type: tags['msg-id'],
			user: {
				color: tags.color,
				name: tags['display-name'],
			},
		})
	}, [addEvent])

	const handleSocketMessage = useCallback(({ data }) => {
		const parsedMessage = parseIRCMessage(data)

		switch (parsedMessage.command) {
			case '376':
				setIsConnected(true)
				setIsConnecting(false)
				break

			case 'PRIVMSG':
				handlePRIVMSG(parsedMessage)
				break

			case 'PING':
				socket.send('PONG')
				break

			case 'USERNOTICE':
				handleUSERNOTICE(parsedMessage)
				break
		}
	}, [
		handlePRIVMSG,
		handleUSERNOTICE,
		setIsConnected,
		setIsConnecting,
	])

	const handleSocketClose = useCallback(() => {
		setIsConnected(false)
	}, [setIsConnected])

	const handleSocketOpen = useCallback(() => {
		socket.send('CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership')
		socket.send('PASS oauth:definitely-a-token')
		socket.send('NICK fdgt-test')
		socket.send('JOIN #fdgt')

		setIsConnecting(false)
		setIsConnected(true)
	}, [setIsConnected])

	const sendMessage = useCallback((channelName, message) => {
		const timestampMS = Date.now()

		addEvent(channelName, {
			message,
			timestamp: moment(timestampMS).format('HH:mm'),
			timestampMS,
			type: 'message',
			user: {
				color: 'var(--dragon)',
				name: 'fdgt-user',
			},
		})
		socket.send(`PRIVMSG ${channelName.replace(/^#/, '')} :${message}`)
	}, [])

	useEffect(() => {
		socket = new WebSocket(process.env.NEXT_PUBLIC_FDGT_WEBSOCKET_URL)
		socket.onclose = handleSocketClose
		socket.onmessage = handleSocketMessage
		socket.onopen = handleSocketOpen

		return () => socket.close()
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
