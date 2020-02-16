const path = require('path');

module.exports = {
	resolve: {
		modules: ['node_modules', 'es2015']
	},
	target: 'node',
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname),
		filename: 'bundle.js'
	},
	// mode: "development",
	mode: "production"
};