import _ from 'lodash'
import 'scss/custom.scss'
import printMe from './print.js'

function component() {
  var element = document.createElement('div')
  var btn = document.createElement('button')

  console.log(element)
  element.classList.add('test')
  element.innerHTML = _.join(['Hello', 'webpack'], ' ')

  btn.innerHTML = 'Click me and check the console?'
  btn.onclick = printMe

  element.appendChild(btn)

  return element
}

document.body.appendChild(component())
