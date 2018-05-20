export default function printMe(socket) {
  console.log('I get called from print.js!')
  socket.emit('chat message', 'this is a message value')
}
