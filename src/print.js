import io from 'socket.io-client';

const socket = io.connect(window.location.host, { reconnect: true });

export default function printMe() {
  console.log('I get called from print.js!')
  socket.emit('chat message', 'chattery')
}
