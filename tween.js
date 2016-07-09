function Tween (options) {
  'use strict'
  // options.duration
  // options.onComplete
  // options.startPos
  // options.endPos
  // options.update

  this.startTime = Date.now()

  this.update = function () {
    let now = Date.now()
    let ratio = (now - this.startTime) / options.duration

    if (ratio >= 1) {
      if (typeof options.onComplete === 'function') {
        options.onComplete()
      }
      return
    }
    
    let newPos = {
      x: options.startPos.x + ((options.targetPos.x - options.startPos.x) * ratio),
      y: options.startPos.y + ((options.targetPos.y - options.startPos.y) * ratio)
    }

    options.update(newPos)
    requestAnimationFrame(this.update.bind(this))
  }

  this.update()
}
