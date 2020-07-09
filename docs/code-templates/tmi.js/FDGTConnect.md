```js
const tmi = require('tmi.js')
const client = new tmi.Client({
	connection: {
		// The secure config is required if you're using tmi on the server.
		// Node doesn't handle automatically upgrading .dev domains to use TLS.
		secure: true,
		server: 'irc.fdgt.dev',
	},
})

client.connect()
```
