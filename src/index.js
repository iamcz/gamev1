import _ from 'lodash'
import 'scss/custom.scss'
import printMe from './print.js'
import io from 'socket.io-client'
import * as Three from 'three'

var mesh
var camera
var scene
var renderer
var geometry
var material


const socket = io.connect("localhost:3001", { reconnect: true })

function component() {
  var btn = document.createElement('button')
  var element = document.createElement('div')

  element.classList.add('test')
  element.innerHTML = _.join(['Hello', 'webpack'], ' ')

  btn.innerHTML = 'Click me and check the console?'
  btn.onclick = e => { printMe(socket) }

  element.appendChild(btn)
  return element
}

function run() {
  socket.on('connect', () => {
    console.log('socket connected')
  })

  socket.on('chat message', function (msg) {
    document.body.append(msg)
    mesh.position.y += 0.1
  })

  document.body.appendChild(component())
  runThree()
}

function runThree () {
  camera = new Three.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 )
  camera.position.z = 1

  scene = new Three.Scene()

  geometry = new Three.BoxGeometry( 0.2, 0.2, 0.2 )
  material = new Three.MeshNormalMaterial()

  mesh = new Three.Mesh( geometry, material )
  scene.add( mesh )

  renderer = new Three.WebGLRenderer( { antialias: true } )
  renderer.setSize( window.innerWidth, window.innerHeight )
  document.body.appendChild( renderer.domElement )
}

function animate() {

  requestAnimationFrame( animate )

  mesh.rotation.x += 0.01
  mesh.rotation.y += 0.02

  renderer.render( scene, camera )

}

run()
animate()
