

var mouseX = 0;
var mouseY = 0;

var targetX = 0;
var targetY = 0;


function getStyle(element, property) {
  element = typeof element === 'string' ? document.getElementById(element) : element;
  return document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(element, false)[property] : document.defaultView.currentStyle[property];
}

function getTransform(element) {
  element = typeof element === 'string' ? document.getElementById(element) : element;
  var style = element.style,
    targetArray = ['transform', 'msTransform', 'webkitTransform', 'mozTransform', 'oTransform'],
    i = 0, targetTransform = ''
  for (; i < targetArray.length; i++) {
    if (targetArray[i] in style) {
      return targetTransform = targetArray[i]
    }
  }
  return targetTransform
}

function getTargetPos(element) {
  element = typeof element === 'string' ? document.getElementById(element) : element;
  var pos = { x: 0, y: 0 }
  var transform = getTransform(element)
  if (transform) {
    var transformValue = getStyle(element, 'transform')
    if (transformValue === 'none') {
      element.style[transform] = 'translate(0, 0)'
      return pos
    } else {
      var targetPos = transformValue.match(/-?\d+/g)
      return { x: parseInt(targetPos[4].trim()), y: parseInt(targetPos[5].trim()) }
    }
  } else {
    if (getStyle(element, 'position') === 'static') {
      element.style.position = 'relative'
      return pos
    } else {
      var x = parseInt(getStyle(element, 'left')) ? getStyle(element, 'left') : 0
      var y = parseInt(getStyle(element, 'top')) ? getStyle(element, 'top') : 0
      return { x, y }
    }
  }
}

function setTargetPos(element, pos) {
  element = typeof element === 'string' ? document.getElementById(element) : element;
  var transform = getTransform(element)
  if (transform) {
    element.style[transform] = `translate(${pos.x}px, ${pos.y}px)`
  } else {
    element.style.left = ops.x + 'px'
    element.style.top = ops.y + 'px'
  }
}

function start(event) {
  mouseX = event.pageX
  mouseY = event.pageY
  var currentPos = getTargetPos('target1')
  targetX = currentPos.x
  targetY = currentPos.y
  document.addEventListener('mousemove', move, false)
  document.addEventListener('mouseup', end, false)
}

function move(event) {
  var distanceX = event.pageX - mouseX
  var distanceY = event.pageY - mouseY
  setTargetPos('target1', { x: targetX + distanceX, y: targetY + distanceY })
  setTargetPos('target2', { x: targetX + distanceX, y: targetY + distanceY })
}

function end(event) {
  document.removeEventListener('mouseup', end)
  document.removeEventListener('mousemove', move)
}

function init () {
  var target = document.getElementById('target1')
  // target.addEventListener('mousedown', start)
  setInterval(() => {
    var randomX = Math.random() * 1000
    var randomY = Math.random() * 1000
    var randomX1 = Math.random() * 1000
    var randomY1 = Math.random() * 1000
    setTargetPos('target1', { x: randomX, y: randomY })
    setTargetPos('target2', { x: randomX1, y: randomY1 })
  }, Math.random() * 100);
}

init()


import Drag from './Drag.js'

// new Drag('target1')
// new Drag('target2')