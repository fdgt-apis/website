export function replaceRangeInString(string, replacement, start, end) {
	return `${string.substring(0, start)}${replacement}${string.substring(end + 1)}`
}
