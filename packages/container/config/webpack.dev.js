const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

const devConfig = {
	mode: 'development',
	output: {
		publicPath: 'http://localhost:8080/'
	},
	devServer: {
		port: 8080,
		/* historyApiFallback: {
			index: 'index.html'
		} */
		historyApiFallback: true
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'container',
			remotes: {
				marketing: 'my_marketing@http://localhost:8081/remoteEntry.js',
				auth: 'my_auth@http://localhost:8082/remoteEntry.js',
				dashboard: 'my_dashboard@http://localhost:8083/remoteEntry.js'
			},
			shared: packageJson.dependencies
			// shared: ['react', 'react-dom']
		})
	]
}

module.exports = merge(commonConfig, devConfig)
