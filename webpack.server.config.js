const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: 'development',
  entry: './src/server/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'server.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(jpg|jpeg|png)$/,
        use: {
          loader: 'url-loader',
        },
      },
    ],
  },
  target: 'node',
  externals: [nodeExternals()],
  optimization: {
    nodeEnv: false,
  },
}
