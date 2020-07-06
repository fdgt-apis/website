```js
const ChatClient = require('twitch-chat-client').default
const client = ChatClient.anonymous({
	// Requires twitch.js version 4.1.0+
	hostName: 'irc.fdgt.dev',
})

client.connect()
```
