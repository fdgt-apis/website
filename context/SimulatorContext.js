// Module imports
import React, {
	useCallback,
	useEffect,
	useState,
} from 'react'
import { parse as parseIRCMessage } from 'irc-message'
import moment from 'moment'
import PropTypes from 'prop-types'





// Local imports
import { useFetch } from 'hooks/useFetch'





// Local constants
const isSelf = parsedMessage => {
	return parsedMessage.prefix.replace(/^[\w-]+?!([\w-]+?)@[\w-]+?\.tmi\.twitch\.tv/, '$1') === 'fdgt-test'
}
const SimulatorContext = React.createContext({
	addMessage: () => {},
	channels: {},
	cheermotes: {},
	currentChannel: 'status',
	emotes: null,
	handleChannelSelect: () => {},
	isConnecting: false,
	isConnected: false,
	joinChannel: () => {},
	partChannel: () => {},
	sendMessage: () => {},
	sendPING: () => {},
})





// Local variables
let socket = null





const SimulatorContextProvider = props => {
	const { children } = props

	const [channels, setChannels] = useState({ status: [] })
	const [currentChannel, setCurrentChannel] = useState('status')
	const [isConnecting, setIsConnecting] = useState(true)
	const [isConnected, setIsConnected] = useState(false)
	const [emotes, setEmotes] = useState({})
	const [cheermotes, setCheermotes] = useState({})

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

	const addMessage = useCallback((channelName, message, type = 'system') => {
		const timestampMS = Date.now()

		addEvent(channelName, {
			message,
			timestamp: moment(timestampMS).format('HH:mm'),
			timestampMS,
			type,
		})
	}, [addEvent])

	const handleChannelSelect = useCallback(channelName => setCurrentChannel(channelName), [setCurrentChannel])

	const handleSystemMessage = useCallback(parsedMessage => {
		const {
			params: [, message],
		} = parsedMessage
		const timestampMS = Date.now()
		addEvent('status', {
			message,
			timestamp: moment(timestampMS).format('HH:mm'),
			timestampMS,
			type: 'system',
		})
		setIsConnected(true)
		setIsConnecting(false)
	}, [
		addEvent,
		setIsConnected,
		setIsConnecting,
	])

	const handleJOIN = useCallback(parsedMessage => {
		const {
			params: [channelName],
		} = parsedMessage
		const timestampMS = Date.now()

		if (isSelf(parsedMessage)) {
			const joinMessage = {
				message: `Joined ${channelName}`,
				timestamp: moment(timestampMS).format('HH:mm'),
				timestampMS,
				type: 'system',
			}

			setChannels(oldChannels => ({
				...oldChannels,
				[channelName]: [joinMessage],
			}))
			setCurrentChannel(channelName)
			addEvent('status', joinMessage)
		}
	}, [
		setChannels,
		currentChannel,
	])

	const handlePART = useCallback(parsedMessage => {
		const {
			params: [channelName],
		} = parsedMessage

		if (isSelf(parsedMessage)) {
			setChannels(oldChannels => {
				const newChannels = { ...oldChannels }
				delete newChannels[channelName]
				return newChannels
			})
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
		const timestampMS = isSelf(parsedMessage) ? undefined : parseInt(tags['tmi-sent-ts'], 10)

		addEvent(channelName, {
			bits: tags.bits,
			message,
			tags,
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
			tags,
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
			case '001':
			case '002':
			case '003':
			case '004':
			case '372':
			case '375':
			case '376':
				handleSystemMessage(parsedMessage)
				break

			case 'JOIN':
				handleJOIN(parsedMessage)
				break

			case 'PART':
				handlePART(parsedMessage)
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
		handleJOIN,
		handlePRIVMSG,
		handleUSERNOTICE,
	])

	const handleSocketClose = useCallback(() => {
		setIsConnected(false)
	}, [setIsConnected])

	const handleSocketOpen = useCallback(() => {
		const timestampMS = Date.now()

		addEvent('status', {
			message: 'Connected!',
			timestamp: moment(timestampMS).format('HH:mm'),
			timestampMS,
			type: 'system',
		})

		socket.send('CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership')
		socket.send('PASS oauth:definitely-a-token')
		socket.send('NICK fdgt-test')
		socket.send('JOIN #fdgt')

		setIsConnecting(false)
		setIsConnected(true)
	}, [
		addEvent,
		setIsConnected,
		setIsConnecting,
	])

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

	const sendPING = useCallback(() => socket.send('PING'), [])

	const {
		error: emotesFetchError,
		pending: emotesFetchIsPending,
		value: emotesFetchResponse,
	} = useFetch({
		headers: {
			Accept: 'application/vnd.twitchtv.v5+json',
			'Client-ID': process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID,
		},
		url: 'https://api.twitch.tv/kraken/chat/emoticon_images?emotesets=0',
	}, [])

	const {
		error: cheermotesFetchError,
		pending: cheermotesFetchIsPending,
		value: cheermotesFetchResponse,
	} = useFetch({
		url: '/api/cheermotes',
	}, [])

	useEffect(() => {
		const timestampMS = Date.now()

		addEvent('status', {
			message: 'Connecting...',
			timestamp: moment(timestampMS).format('HH:mm'),
			timestampMS,
			type: 'system',
		})

		socket = new WebSocket(process.env.NEXT_PUBLIC_FDGT_WEBSOCKET_URL)
		socket.onclose = handleSocketClose
		socket.onmessage = handleSocketMessage
		socket.onopen = handleSocketOpen

		return () => socket.close()
	}, [])

	useEffect(() => {
		if (emotesFetchResponse) {
			const emotesData = emotesFetchResponse.emoticon_sets[0]
			const emoteDictionary = {}
			emotesData.forEach((emoteDatum) => {
				emoteDictionary[emoteDatum.code.toLowerCase()] = emoteDatum.id
			})
			setEmotes(emoteDictionary)
		}
	}, [
		emotesFetchResponse,
		setEmotes,
	])

	useEffect(() => {
		if (cheermotesFetchResponse) {
			const cheermoteDictionary = {}

			cheermotesFetchResponse.forEach((cheermoteDatum) => {
				cheermoteDictionary[cheermoteDatum.prefix.toLowerCase()] = cheermoteDatum.tiers.reverse()
			})

			setCheermotes(cheermoteDictionary)
		}
	}, [
		cheermotesFetchResponse,
		setCheermotes,
	])

	return (
		<SimulatorContext.Provider
			value={{
				addMessage,
				channels,
				cheermotes,
				currentChannel,
				emotes,
				handleChannelSelect,
				isConnecting,
				isConnected,
				joinChannel,
				partChannel,
				sendMessage,
				sendPING,
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
