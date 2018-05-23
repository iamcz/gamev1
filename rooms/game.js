const { Room } = require('colyseus')


module.exports = class GameRoom extends Room {
  onInit(options) {
    console.log("GameRoom created!")
  }
  onJoin(client) {
    this.broadcast(`${client.sessionId} joined.`)
  }
  onLeave(client) {
    this.broadcast(`${client.sessionId} left.`)
  }
  onMessage(client, data) {
    console.log(`GameRoom received message from ${client.sessionId}: ${data}`)
    this.broadcast(`(${client.sessionId}) ${data.message}`)
  }
  onDispose() {
    console.log("Dispose GameRoom")
  }
}
