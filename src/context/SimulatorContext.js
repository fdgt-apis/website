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
const createChannelObject = options => ({
	events: options?.events || [],
	state: options?.state || {
		emoteOnly: false,
		slow: false,
		subs: false,
	},
})
const emotesFetchOptions = { url: '/api/emotes' }
const isSelf = parsedMessage => {
	return parsedMessage.prefix.replace(/^[\w-]+?!([\w-]+?)@[\w-]+?\.tmi\.twitch\.tv/, '$1') === 'fdgt-test'
}
export const SimulatorContext = React.createContext({
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





export function SimulatorContextProvider(props) {
	const { children } = props

	const [channels, setChannels] = useState({
		status: {
			events: [],
		},
	})
	const [cheermotes, setCheermotes] = useState({})
	const [currentChannel, setCurrentChannel] = useState('status')
	const [emotes, setEmotes] = useState({})
	const [isConnecting, setIsConnecting] = useState(true)
	const [isConnected, setIsConnected] = useState(false)

	const joinChannel = useCallback(channelName => socket.send(`JOIN #${channelName.replace(/^#/, '')}`), [])
	const partChannel = useCallback(channelName => socket.send(`PART #${channelName.replace(/^#/, '')}`), [])

	const addEvent = useCallback((channelName, event) => {
		setChannels(oldChannels => {
			const oldChannel = (oldChannels[channelName] || createChannelObject())

			return {
				...oldChannels,
				[channelName]: {
					...oldChannel,
					events: [
						...oldChannel.events,
						event,
					],
				},
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

	const handleChannelStateChange = useCallback(options => {
		const {
			channelName,
			isEnabled,
			key,
			message,
		} = options
		const timestampMS = Date.now()
		const stateChangeMessage = {
			message: message.replace(/This room/, channelName),
			timestamp: moment(timestampMS).format('HH:mm'),
			timestampMS,
			type: 'system',
		}

		setChannels(oldChannels => {
			const oldChannel = (oldChannels[channelName] || createChannelObject())
			const statusChannel = oldChannels['status']
			const state = oldChannel.state

			return {
				...oldChannels,
				status: {
					...statusChannel,
					events: [
						...statusChannel.events,
						stateChangeMessage,
					],
				},
				[channelName]: {
					events: [
						...oldChannel.events,
						stateChangeMessage,
					],
					state: {
						...oldChannel.state,
						[key]: isEnabled,
					},
				},
			}
		})
	}, [
		setChannels,
	])

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
				[channelName]: createChannelObject({
					events: [joinMessage],
				})
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

	const handleNOTICE = useCallback(parsedMessage => {
		const {
			params: [
				channelName,
				message,
			],
			tags,
		} = parsedMessage

		let [
			fullMatch,
			key,
			isEnabled,
		] = (/^(emote_only|slow|subs)_(on|off)$/.exec(tags['msg-id']) || [])

		if (fullMatch) {
			key = key.replace(/_(\w)/, (fullMatch, character) => character.toUpperCase())
			isEnabled = (isEnabled === 'on') ? true : false

			handleChannelStateChange({
				channelName,
				isEnabled,
				key,
				message,
			})
		}
	}, [handleChannelStateChange])

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

			case 'NOTICE':
				handleNOTICE(parsedMessage)
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
		handleNOTICE,
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

	const sendPING = useCallback(params => socket.send(`PING${params ? ` ${params}` : ''}`), [])

	const {
		error: emotesFetchError,
		pending: emotesFetchIsPending,
		value: emotesFetchResponse,
	} = useFetch(emotesFetchOptions, [])

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
			const emotesData = emotesFetchResponse.emotes
			const cheermotesData = emotesFetchResponse.cheermotes

			const emoteDictionary = emotesData.reduce((accumulator, emoteDatum) => {
				accumulator[emoteDatum.name.toLowerCase()] = emoteDatum.id
				return accumulator
			}, {})

			const cheermoteDictionary = cheermotesData.reduce((accumulator, cheermoteDatum) => {
				accumulator[cheermoteDatum.prefix.toLowerCase()] = cheermoteDatum.tiers.reverse()
				return accumulator
			}, {})

			setEmotes(emoteDictionary)
			setCheermotes(cheermoteDictionary)
		}
	}, [
		emotesFetchError,
		emotesFetchResponse,
		setCheermotes,
		setEmotes,
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
