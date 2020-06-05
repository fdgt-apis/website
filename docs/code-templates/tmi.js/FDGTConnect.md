```js
const tmi = require('tmi.js')
const client = new tmi.Client({
	connection: {
		server: 'irc.fdgt.dev',
	},
})

client.connect()
```
