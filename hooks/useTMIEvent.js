// Module imports
import { useEffect } from 'react'





export function useTMIEvent(client, eventType, handler) {
	useEffect(() => {
		client.on(eventType, handler)
		return () => client.removeListener(eventType, handler)
	}, [handler])
}
