export const stripMarkdown = markdownString => markdownString
	.replace(/`(.+?)`/giu, '$1')
	.replace(/\[(.+?)\](?:\(.*?\)|\[.*?\])/giu, '$1')
