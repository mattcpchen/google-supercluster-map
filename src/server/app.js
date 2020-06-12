const express = require('express')
const path = require('path')

module.exports = function () {
  const app = express()
  app.set('port', process.env.PORT || 57358) // 8080 || 57358

  // webpack with HMR
  if (process.env.NODE_ENV === 'development') {
    const webpack = require('webpack')
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const webpackHotMiddleware = require('webpack-hot-middleware')
    const webpackConfig = require('../../webpack.client.config')

    const compiler = webpack(webpackConfig)
    app.use(
      webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath,
      })
    )
    app.use(webpackHotMiddleware(compiler))
  }

  // static routes
  if (process.env.NODE_ENV === 'development') {
    app.use(express.static(path.join(__dirname, '../../public/')))
    app.use(express.static(path.join(__dirname, '../../dist/')))
  } else if (process.env.NODE_ENV === 'production') {
    app.use(express.static('public'))
    app.use(express.static('dist'))
  }

  // routes
  app.get('/', _index)
  return app
}

const _index = (req, res) => {
  const indexHtmlPath = path.resolve('public/index.html')
  res.sendFile(indexHtmlPath)
}
