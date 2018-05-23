const app = require('express')()
const { createServer } = require('http')

const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')

const config = require('./webpack.config.js')
const compiler = webpack(config)

const { Server } = require('colyseus')
const GameRoom = require('./rooms/game')

const gameServer = new Server({
  server: createServer(app)
})

new GameRoom
gameServer.register('game', GameRoom)

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))

gameServer.listen(3000)
console.log('app listening on port 3000')
