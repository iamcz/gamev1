const app = require('express')()
const http = require('http').Server(app)

const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')

const config = require('./webpack.config.js')
const compiler = webpack(config)

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))

// Serve the files on port 3000.
http.listen(3000, function () {
  console.log('app listening on port 3000\n')
})
