export const getWordFromIndex = (string, index) => {
	const splitString = string.split(' ')

	const {
		range,
		result,
	} = splitString.reduce((accumulator, item) => {
		const { processedItems } = accumulator

		if (accumulator.result) {
			return accumulator
		}

		const precedentLength = processedItems.join(' ').length

		if ((precedentLength + item.length + 1) >= index) {
			accumulator.range = [precedentLength, precedentLength + item.length + 1]
			accumulator.result = item
		}

		processedItems.push(item)

		return accumulator
	}, {
		processedItems: [],
		range: null,
		result: null,
	})

	return {
		range,
		result,
	}
}
