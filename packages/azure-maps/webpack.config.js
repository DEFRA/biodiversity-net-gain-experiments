const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js'
  },
  devtool: 'source-map',
  devServer: {
    port: 3001,
    client: {
      logging: 'none'
    },
    devMiddleware: {
      stats: 'errors-only'
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'assets', to: 'assets' }]
    }),
    new HtmlPlugin({
      template: 'index.html'
    })
  ]
}
