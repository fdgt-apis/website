export function stripMarkdown(markdownString) {
	return markdownString
		.replace(/`(.+?)`/giu, '$1')
		.replace(/\[(.+?)\](?:\(.*?\)|\[.*?\])/giu, '$1')
}
