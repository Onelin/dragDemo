export default class Drag {
  constructor(selector) {
    this.selector = typeof selector === 'string' ? document.getElementById(selector) : selector;
    this.transformText = this.isSupportTransform()

    this.startX = 0;
    this.startY = 0;
    this.sourceX = 0;
    this.sourceY = 0;

    this.init()
  }

  //初始化
  init = () => {
    this.selector.addEventListener('mousedown', this.mousedown, false)
  }

  //鼠标按下事件
  mousedown = (event) => {
    this.startX = event.x
    this.startY = event.y

    const elementPostion = this.getElementPosition()
    this.sourceX = elementPostion.x
    this.sourceY = elementPostion.y

    document.addEventListener('mousemove', this.mousemove, false)
    document.addEventListener('mouseup', this.mouseup, false)
  }

  //鼠标移动事件
  mousemove = (event) => {
    const distanceX = event.pageX - this.startX
    const distanceY = event.pageY - this.startY
    this.setElementPosition({ x: this.sourceX + distanceX, y: this.sourceY + distanceY })
  }

  //鼠标抬起事件
  mouseup = () => {
    console.log('mouseup')
    document.removeEventListener('mousemove', this.mousemove)
    document.removeEventListener('mouseup', this.mouseup)
  }

  //设置元素的 position
  setElementPosition = (position) => {
    if (this.transformText) {
      console.log(position)
      this.selector.style[this.transformText] = `translate(${position.x}px ,${position.y}px)`
    } else {
      this.selector.style.left = position.x + 'px'
      this.selector.style.top = position.y + 'px'
    }
  }

  //获取元素的 position
  getElementPosition = () => {
    const position = { x: 0, y: 0 }
    if (this.transformText) {
      const styleValue = this.getElementStyle('transform')
      if (styleValue === 'none') {
        this.selector.style[this.transformText] = 'translate(0,0)'
      } else {
        const translateValue = styleValue.match(/-?\d+/g)
        if (translateValue && !!parseInt(translateValue[4])) {
          position.x = parseInt(translateValue[4].trim())
          position.y = parseInt(translateValue[5].trim())
        }
      }
    } else {
      if (this.getElementStyle('position') === 'static') {
        this.selector.style.position = 'relative'
      } else {
        const x = this.getElementStyle('left')
        const y = this.getElementStyle('top')
        position.x = x
        position.y = y
      }
    }
    return position
  }

  //获取元素的某个属性
  getElementStyle = (perproty) => {
    return document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(this.selector, false)[perproty] : document.defaultView.currentStyle[perproty];
  }

  //是否支持 transform 属性
  isSupportTransform = () => {
    const style = this.selector.style
    const transformArr = ['transform', 'msTransform', 'webkitTransform', 'mozTransform', 'oTransform' ]
    let transform = transformArr.find(ele => ele in style)
    return transform
  }
}

