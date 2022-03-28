// Module imports
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')





module.exports = {
	async redirects() {
		return [
			{
				source: '/docs',
				destination: '/docs/getting-started',
				permanent: false
			},
		]
	},

	webpack: config => {
		config.module.rules.push({
			exclude: /node_modules/,
			test: /\.svg$/,
			loader: '@svgr/webpack',
			options: {
				icon: true,
				svgo: false,
			},
		})

		config.plugins.push(new CopyWebpackPlugin({
			patterns: [
				{
					flatten: true,
					from: path.resolve('node_modules', 'prismjs', 'components', '*.min.js'),
					to: path.resolve('public', 'prism-grammars'),
				},
			],
		}))

		return config
	},
}
