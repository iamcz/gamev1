const app = require('express')()
const http = require('http').Server(app)

const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')

const config = require('./webpack.config.js')
const compiler = webpack(config)

const io = require('socket.io')(3001)

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))

io.on('connection', function (client) {
  console.log('a user connected')

  client.on('disconnect', function () {
    console.log('user disconnected')
  })

  client.on('chat message', function (msg) {
    io.emit('chat message', msg);
  })
})

// Serve the files on port 3000.
http.listen(3000, function () {
  console.log('app listening on port 3000\n')
})
