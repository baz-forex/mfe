const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

const prodConfig = {
	mode: 'production',
	output: {
		filename: '[name].[contenthash].js',
		publicPath: '/dashboard/latest/'
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'my_dashboard',
			filename: 'remoteEntry.js',
			exposes: {
				'./DashboardApp': './src/bootstrap'
			},
			shared: packageJson.dependencies
			// shared: ['react', 'react-dom']
		})
	]
}

module.exports = merge(commonConfig, prodConfig)
